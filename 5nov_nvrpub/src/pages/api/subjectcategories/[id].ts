import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id) return res.status(400).json({ message: 'Missing id' })

  try {
    if (req.method === 'GET') {
      const [rows] = await query(`
        SELECT id, name, slug, description, contentTypeId, sortOrder, createdAt, ishomepage, isslider 
        FROM subjectcategory 
        WHERE id = ?
      `, [id])
      if (!(rows as any[])[0]) return res.status(404).json({ message: 'Not found' })
      return res.status(200).json((rows as any[])[0])
    }

    if (req.method === 'PUT') {
      const { name, slug, description, contentTypeId, sortOrder, ishomepage, isslider } = req.body || {}
      await query(`
        UPDATE subjectcategory 
        SET name = ?, slug = ?, description = ?, contentTypeId = ?, sortOrder = ?, ishomepage = ?, isslider = ? 
        WHERE id = ?
      `, [name, slug, description, contentTypeId, sortOrder, ishomepage ?? 0, isslider ?? 0, id])
      return res.status(200).json({ ok: true })
    }

    if (req.method === 'DELETE') {
      await query('DELETE FROM subjectcategory WHERE id = ?', [id])
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}