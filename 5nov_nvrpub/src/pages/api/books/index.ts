import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

const DEFAULT_BOOK_COVER = '/images/courses/JMEDS_Cover.jpeg'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ensure books table exists
    await query(`
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        isbn VARCHAR(32) UNIQUE,
        print_isbn VARCHAR(32) NULL,
        title VARCHAR(256) NOT NULL,
        author VARCHAR(256) NULL,
        coverImage VARCHAR(512) NULL,
        description TEXT NULL,
        keywords TEXT NULL,
        subjectcategoryId INT NULL,
        rating INT DEFAULT 0,
        ratingCount INT DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

  // Add missing columns for existing deployments (if not already present)
  try { await query('ALTER TABLE books ADD COLUMN IF NOT EXISTS print_isbn VARCHAR(32) NULL') } catch {}
  try { await query('ALTER TABLE books ADD COLUMN IF NOT EXISTS keywords TEXT NULL') } catch {}

    if (req.method === 'GET') {
      const [rows]: any = await query(
        'SELECT id, isbn, print_isbn, title, author, coverImage, description, keywords, subjectcategoryId, rating, ratingCount FROM books ORDER BY id DESC'
      )
      const normalized = (rows || []).map((b: any) => ({
        ...b,
        coverImage: b.coverImage || DEFAULT_BOOK_COVER,
        contenttype: 'books',
      }))
      return res.status(200).json(normalized)
    }

    if (req.method === 'POST') {
      const { isbn, print_isbn, title, author, coverImage, description, keywords, subjectcategoryId, rating, ratingCount } = req.body || {}
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'Invalid title' })
      }
      const [result]: any = await query(
        'INSERT INTO books (isbn, print_isbn, title, author, coverImage, description, keywords, subjectcategoryId, rating, ratingCount, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [isbn || null, print_isbn || null, title, author || null, coverImage || null, description || null, keywords || null, subjectcategoryId || null, rating || 0, ratingCount || 0]
      )
      const insertId = result?.insertId
      return res.status(201).json({ id: insertId })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}

