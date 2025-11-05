import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { ishomepage } = req.query
      
      let queryStr = `
        SELECT id, name, slug, description, contentTypeId, sortOrder, createdAt, ishomepage, isslider 
        FROM subjectcategory 
      `
      const queryParams: any[] = []
      
      if (ishomepage !== undefined) {
        queryStr += ` WHERE ishomepage = ?`
        queryParams.push(Number(ishomepage))
      }
      
      queryStr += ` ORDER BY sortOrder ASC, name ASC`
      
      const [rows] = await query(queryStr, queryParams)
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { name, slug, description, contentTypeId, sortOrder, ishomepage, isslider } = req.body || {}
      if (!name || !slug || !contentTypeId) return res.status(400).json({ message: 'Missing required fields' })
      const [result]: any = await query(`
        INSERT INTO subjectcategory (name, slug, description, contentTypeId, sortOrder, createdAt, ishomepage, isslider) 
        VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)
      `, [name, slug, description ?? '', contentTypeId, sortOrder ?? 0, ishomepage ?? 0, isslider ?? 0])
      return res.status(201).json({ id: result.insertId })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}