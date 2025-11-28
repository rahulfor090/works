import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id) return res.status(400).json({ message: 'Missing id' })

  try {
    if (req.method === 'GET') {
      const [rows] = await query(`SELECT id, title, url, logo, location, page_location, isPublished, createdAt, updatedAt FROM citations WHERE id = ?`, [id])
      if (!(rows as any[])[0]) return res.status(404).json({ message: 'Not found' })
      return res.status(200).json((rows as any[])[0])
    }

    if (req.method === 'PUT') {
      const { title, url, logo, location, page_location, isPublished } = req.body || {}
      if (!title || !url) return res.status(400).json({ message: 'Missing title or url' })

      const loc = location ?? 'header'
      const pageLoc = page_location ?? 'home'

      // Check if another ad already exists in this location and page combination (excluding current ad)
      if (isPublished) {
        const [existing] = await query(
          `SELECT id FROM citations WHERE location = ? AND page_location = ? AND isPublished = 1 AND id != ?`,
          [loc, pageLoc, id]
        )

        if ((existing as any[]).length > 0) {
          return res.status(409).json({ 
            message: `An active ad already exists in ${loc} position on ${pageLoc} page(s). Please deactivate or delete the existing ad first.` 
          })
        }
      }

      await query(
        `UPDATE citations SET title = ?, url = ?, logo = ?, location = ?, page_location = ?, isPublished = ?, updatedAt = NOW() WHERE id = ?`,
        [title, url, logo ?? '', loc, pageLoc, isPublished ? 1 : 0, id]
      )
      return res.status(200).json({ ok: true })
    }

    if (req.method === 'DELETE') {
      await query('DELETE FROM citations WHERE id = ?', [id])
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}
