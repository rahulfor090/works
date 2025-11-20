
import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [rows] = await query(
            "SELECT id, name, speciality, hospital, photo_url, company_logo_url, description, `order`, active, rating, updated_at, created_at FROM mentors ORDER BY `order` ASC"
      )
      return res.status(200).json(rows)
    } catch (error: any) {
      console.error('Mentors API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, speciality, hospital, photo_url, company_logo_url, description, order, active, rating } = req.body
      if (!name || !speciality || !hospital) {
        return res.status(400).json({ message: 'Missing required fields' })
      }
      const [result] = await query(
        'INSERT INTO mentors (name, speciality, hospital, photo_url, company_logo_url, description, `order`, active, rating, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
        [name, speciality, hospital, photo_url || '', company_logo_url || '', description || '', order || 1, active ? 1 : 0, rating || 0]
      );
      const insertId = (result as any).insertId;
      console.log('Mentors POST result:', result);
      if (!result || typeof insertId === 'undefined') {
        return res.status(500).json({ message: 'DB insert failed', result });
      }
      return res.status(201).json({ id: insertId });
    } catch (error: any) {
      console.error('Mentors POST API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
