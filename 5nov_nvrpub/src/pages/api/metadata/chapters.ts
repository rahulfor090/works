import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS chapter_metadata (
        id INT AUTO_INCREMENT PRIMARY KEY,
        book_isbn VARCHAR(64) NULL,
        book_print_isbn VARCHAR(64) NULL,
        book_title VARCHAR(512) NULL,
        title VARCHAR(512) NOT NULL,
        number INT NULL,
        slug VARCHAR(1024) NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        KEY idx_book_isbn (book_isbn),
        KEY idx_book_print_isbn (book_print_isbn)
      )
    `)

    if (req.method === 'GET') {
      const [rows]: any = await query('SELECT id, book_isbn, book_print_isbn, book_title, title, number, slug FROM chapter_metadata ORDER BY id DESC')
      return res.status(200).json({ items: rows || [] })
    }

    if (req.method === 'POST') {
      const body = req.body
      const items = Array.isArray(body) ? body : [body]
      const values: any[] = []
      for (const it of items) {
        const { book_isbn, book_print_isbn, book_title, title, number, slug } = it || {}
        if (!title) continue
        values.push([book_isbn || null, book_print_isbn || null, book_title || null, title, number ?? null, slug || null])
      }
      if (values.length === 0) return res.status(400).json({ message: 'No valid items' })
      const placeholders = values.map(() => '(?, ?, ?, ?, ?, ?)').join(', ')
      await query(`INSERT INTO chapter_metadata (book_isbn, book_print_isbn, book_title, title, number, slug, createdAt) VALUES ${placeholders}`, values.flat())
      return res.status(201).json({ message: 'created', count: values.length })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}

