import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const [rows] = await query(`
        SELECT id, title, slug, description, icon, displayOrder, ishomepage, isActive, createdAt, updatedAt 
        FROM contenttype 
        ORDER BY displayOrder ASC, title ASC
      `)
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { title, slug, description, icon, displayOrder, ishomepage, isActive } = req.body || {}
      if (!title) return res.status(400).json({ message: 'Missing title' })
      
      // Generate slug from title if not provided
      const finalSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      
      const [result]: any = await query(
        `INSERT INTO contenttype (title, slug, description, icon, displayOrder, ishomepage, isActive, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          title, 
          finalSlug,
          description ?? '', 
          icon ?? 'LocalLibraryIcon', 
          displayOrder ?? 0, 
          ishomepage ? 1 : 0, 
          isActive ? 1 : 0
        ]
      )
      return res.status(201).json({ id: result.insertId })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}