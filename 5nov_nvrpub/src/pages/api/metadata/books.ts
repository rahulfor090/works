import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS book_metadata (
        id INT AUTO_INCREMENT PRIMARY KEY,
        isbn VARCHAR(64) NULL,
        print_isbn VARCHAR(64) NULL,
        title VARCHAR(512) NOT NULL,
        author VARCHAR(256) NULL,
        coverImage VARCHAR(1024) NULL,
        description TEXT NULL,
        keywords TEXT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_isbn (isbn),
        KEY idx_print_isbn (print_isbn)
      )
    `)

    if (req.method === 'GET') {
      const [rows]: any = await query('SELECT id, isbn, print_isbn, title, author, coverImage, description, keywords FROM book_metadata ORDER BY id DESC')
      return res.status(200).json({ items: rows || [] })
    }

    if (req.method === 'POST') {
      const { isbn, print_isbn, title, author, coverImage, description, keywords } = req.body || {}
      if (!title) return res.status(400).json({ message: 'title is required' })
      const [existing]: any = await query('SELECT id FROM book_metadata WHERE isbn = ? LIMIT 1', [isbn || null])
      if (existing && existing.length > 0) {
        const id = existing[0].id
        await query('UPDATE book_metadata SET print_isbn = ?, title = ?, author = ?, coverImage = ?, description = ?, keywords = ? WHERE id = ?', [print_isbn || null, title, author || null, coverImage || null, description || null, keywords || null, id])
        return res.status(200).json({ message: 'updated', id })
      } else {
        const [result]: any = await query('INSERT INTO book_metadata (isbn, print_isbn, title, author, coverImage, description, keywords, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())', [isbn || null, print_isbn || null, title, author || null, coverImage || null, description || null, keywords || null])
        return res.status(201).json({ message: 'created', id: result.insertId })
      }
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}

