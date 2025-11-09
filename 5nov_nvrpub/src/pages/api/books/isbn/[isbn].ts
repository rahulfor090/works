import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

const DEFAULT_BOOK_COVER = '/images/courses/JMEDS_Cover.jpeg'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { isbn } = req.query
  const isbnStr = String(isbn || '').trim()
  if (!isbnStr) {
    return res.status(400).json({ message: 'Invalid isbn' })
  }

  try {
    // Ensure tables exist
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

    // Add missing columns for existing deployments
    try { await query('ALTER TABLE books ADD COLUMN print_isbn VARCHAR(32) NULL') } catch {}
    try { await query('ALTER TABLE books ADD COLUMN keywords TEXT NULL') } catch {}

    await query(`
      CREATE TABLE IF NOT EXISTS chapters (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bookId INT NOT NULL,
        title VARCHAR(256) NOT NULL,
        number INT NULL,
        slug VARCHAR(256) NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (bookId)
      )
    `)

    if (req.method === 'GET') {
      const [books]: any = await query(
        'SELECT id, isbn, print_isbn, title, author, coverImage, description, keywords, subjectcategoryId, rating, ratingCount FROM books WHERE isbn = ?',
        [isbnStr]
      )
      const book = books?.[0]
      if (!book) {
        return res.status(404).json({ message: 'Not found' })
      }

      book.coverImage = book.coverImage || DEFAULT_BOOK_COVER

      const [chapters]: any = await query(
        'SELECT id, bookId, title, number, slug FROM chapters WHERE bookId = ? ORDER BY COALESCE(number, 0) ASC, id ASC',
        [book.id]
      )

      return res.status(200).json({ book: { ...book, contenttype: 'books' }, chapters: chapters || [] })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}
