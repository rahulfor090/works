import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create table if not exists (safe for first-run)
    await query(`
      CREATE TABLE IF NOT EXISTS citations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        url VARCHAR(1024) NOT NULL,
        logo VARCHAR(512) DEFAULT NULL,
        isPublished TINYINT(1) DEFAULT 1,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    if (req.method === 'GET') {
      const [rows] = await query(`SELECT id, title, url, logo, isPublished, createdAt, updatedAt FROM citations ORDER BY id DESC`)
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { title, url, logo, isPublished } = req.body || {}
      if (!title || !url) return res.status(400).json({ message: 'Missing title or url' })

      const [result]: any = await query(
        `INSERT INTO citations (title, url, logo, isPublished, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())`,
        [title, url, logo ?? '', isPublished ? 1 : 0]
      )
      return res.status(201).json({ id: result.insertId })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}
