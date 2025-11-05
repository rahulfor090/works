import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id) return res.status(400).json({ message: 'Missing id' })

  try {
    if (req.method === 'GET') {
      const [rows] = await query('SELECT id, title, content, userName, professional, photo FROM testimonials WHERE id = ?', [id])
      if (!(rows as any[])[0]) return res.status(404).json({ message: 'Not found' })
      return res.status(200).json((rows as any[])[0])
    }

    if (req.method === 'PUT') {
      const { title, content, userName, professional, photo } = req.body || {}
      await query('UPDATE testimonials SET title = ?, content = ?, userName = ?, professional = ?, photo = ? WHERE id = ?', [title, content, userName, professional, photo, id])
      return res.status(200).json({ ok: true })
    }

    if (req.method === 'DELETE') {
      await query('DELETE FROM testimonials WHERE id = ?', [id])
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}


