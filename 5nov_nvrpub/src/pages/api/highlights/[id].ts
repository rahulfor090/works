import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  try {
    if (req.method === 'DELETE') {
      await query('DELETE FROM highlights WHERE id = ?', [id])
      return res.status(200).json({ message: 'Highlight deleted successfully' })
    }

    if (req.method === 'PUT') {
        const { note, color } = req.body
        await query('UPDATE highlights SET note = ?, color = ? WHERE id = ?', [note, color, id])
        return res.status(200).json({ message: 'Highlight updated successfully' })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    console.error('Highlight API error:', e)
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}
