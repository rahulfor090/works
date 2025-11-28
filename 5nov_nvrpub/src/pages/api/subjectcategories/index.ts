import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { isHomepage } = req.query

      let queryStr = `
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
      `
      const queryParams: any[] = []

      if (isHomepage !== undefined) {
        queryStr += ` WHERE is_homepage = ?`
        queryParams.push(Number(isHomepage))
      }

      queryStr += ` ORDER BY sort_order ASC, subject ASC`

      const [rows] = await query(queryStr, queryParams)
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { name, slug, description, sortOrder, isHomepage, isSlider } = req.body || {}
      if (!name) return res.status(400).json({ message: 'Missing required fields: name' })

      const [result]: any = await query(`
        INSERT INTO subjects (subject, slug, description, sort_order, is_homepage, is_slider, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
      `, [name, slug ?? '', description ?? '', sortOrder ?? 0, isHomepage ?? 0, isSlider ?? 0])

      return res.status(201).json({ id: result.insertId })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}