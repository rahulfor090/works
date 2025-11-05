import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id) return res.status(400).json({ message: 'Missing id' })

  try {
    if (req.method === 'GET') {
      const [rows] = await query(`
        SELECT id, title, slug, description, icon, displayOrder, ishomepage, isActive, createdAt, updatedAt 
        FROM contenttype 
        WHERE id = ?
      `, [id])
      if (!(rows as any[])[0]) return res.status(404).json({ message: 'Not found' })
      return res.status(200).json((rows as any[])[0])
    }

    if (req.method === 'PUT') {
      const { title, slug, description, icon, displayOrder, ishomepage, isActive } = req.body || {}
      
      // Generate slug from title if not provided
      const finalSlug = slug || (title ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : undefined)
      
      await query(`
        UPDATE contenttype 
        SET title = ?, slug = ?, description = ?, icon = ?, displayOrder = ?, ishomepage = ?, isActive = ?, updatedAt = NOW() 
        WHERE id = ?
      `, [
        title, 
        finalSlug,
        description, 
        icon, 
        displayOrder, 
        ishomepage ? 1 : 0, 
        isActive ? 1 : 0, 
        id
      ])
      return res.status(200).json({ ok: true })
    }

    if (req.method === 'DELETE') {
      await query('DELETE FROM contenttype WHERE id = ?', [id])
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}