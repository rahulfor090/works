
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id) return res.status(400).json({ message: 'Missing id' })

  if (req.method === 'PUT') {
    try {
      const { name, speciality, hospital, photo_url, company_logo_url, description, order, active, rating } = req.body
      const [result] = await query(
        'UPDATE mentors SET name=?, speciality=?, hospital=?, photo_url=?, company_logo_url=?, description=?, `order`=?, active=?, rating=?, updated_at=NOW() WHERE id=?',
        [name, speciality, hospital, photo_url || '', company_logo_url || '', description || '', order || 1, active ? 1 : 0, rating || 0, id]
      )
      return res.status(200).json({ success: true })
    } catch (error: any) {
      console.error('Mentors PUT API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM mentors WHERE id=?', [id])
      return res.status(200).json({ message: 'Mentor deleted successfully' })
    } catch (error: any) {
      console.error('Mentors DELETE API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
