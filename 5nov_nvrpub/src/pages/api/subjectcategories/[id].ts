import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id) return res.status(400).json({ message: 'Missing id' })

  try {
    if (req.method === 'GET') {
      const [rows] = await query(`
        SELECT 
          id, 
          subject as name, 
          slug, 
          description, 
          sort_order as sortOrder, 
          is_homepage as isHomepage, 
          is_slider as isSlider,
          created_at as createdAt, 
          updated_at as updatedAt
        FROM subjects 
        WHERE id = ?
      `, [id])
      if (!(rows as any[])[0]) return res.status(404).json({ message: 'Not found' })
      return res.status(200).json((rows as any[])[0])
    }

    if (req.method === 'PUT') {
      const { name, slug, description, sortOrder, isHomepage, isSlider } = req.body || {}
      if (!name || !slug) return res.status(400).json({ message: 'Missing required fields: name and slug' })
      
      await query(`
        UPDATE subjects 
        SET 
          subject = ?, 
          slug = ?, 
          description = ?, 
          sort_order = ?, 
          is_homepage = ?, 
          is_slider = ?,
          updated_at = NOW() 
        WHERE id = ?
      `, [name, slug, description ?? '', sortOrder ?? 0, isHomepage ?? 0, isSlider ?? 0, id])
      
      return res.status(200).json({ ok: true })
    }

    if (req.method === 'DELETE') {
      await query('DELETE FROM subjects WHERE id = ?', [id])
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}