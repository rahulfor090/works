import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id) return res.status(400).json({ message: 'Missing id' })

  try {
    if (req.method === 'GET') {
      const [rows] = await query('SELECT id, title, cover, rating, ratingCount, category, subcategory FROM courses WHERE id = ?', [id])
      if (!rows || (rows as any[]).length === 0) return res.status(404).json({ message: 'Not found' })
      return res.status(200).json((rows as any[])[0])
    }

    if (req.method === 'PUT') {
      const { title, cover, rating, ratingCount, category, subcategory } = req.body || {}
      await query(
        'UPDATE courses SET title = ?, cover = ?, rating = ?, ratingCount = ?, category = ?, subcategory = ? WHERE id = ?',
        [title, cover, rating, ratingCount, category, subcategory, id]
      )
      return res.status(200).json({ ok: true })
    }

    if (req.method === 'DELETE') {
      await query('DELETE FROM courses WHERE id = ?', [id])
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (err: any) {
    return res.status(500).json({ message: err?.message || 'Server error' })
  }
}


