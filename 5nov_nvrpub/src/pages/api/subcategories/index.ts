import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const [rows] = await query('SELECT id, name, slug, description, categoryId, sortOrder FROM subcategories ORDER BY sortOrder ASC, name ASC')
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { name, slug, description, categoryId, sortOrder } = req.body || {}
      if (!name || !slug || !categoryId) return res.status(400).json({ message: 'Missing required fields' })
      const [result]: any = await query(
        'INSERT INTO subcategories (name, slug, description, categoryId, sortOrder) VALUES (?, ?, ?, ?, ?)',
        [name, slug, description ?? '', categoryId, sortOrder ?? 0]
      )
      return res.status(201).json({ id: result.insertId })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}
