import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'
import { loadLocalBooks } from '@/utils/local-books'

const DEFAULT_BOOK_COVER = '/images/courses/JMEDS_Cover.jpeg'
const CREATE_TABLE_SQL = `
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
`
const COLUMN_CHECK_SQL = `
  SELECT COLUMN_NAME
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'books'
    AND COLUMN_NAME = ?
`
const REQUIRED_COLUMNS = [
  { name: 'print_isbn', definition: 'VARCHAR(32) NULL' },
  { name: 'keywords', definition: 'TEXT NULL' },
  { name: 'title', definition: 'VARCHAR(256) NOT NULL' },
  { name: 'author', definition: 'VARCHAR(256) NULL' },
  { name: 'coverImage', definition: 'VARCHAR(512) NULL' },
  { name: 'description', definition: 'TEXT NULL' },
  { name: 'subjectcategoryId', definition: 'INT NULL' },
  { name: 'rating', definition: 'INT DEFAULT 0' },
  { name: 'ratingCount', definition: 'INT DEFAULT 0' }
]
const SELECT_BOOKS_SQL = 'SELECT id, isbn, print_isbn, title, author, coverImage, description, keywords, subjectcategoryId, rating, ratingCount, createdAt FROM books ORDER BY id DESC'

const ensureColumn = async (columnName: string, definition: string) => {
  try {
    const [rows]: any = await query(COLUMN_CHECK_SQL, [columnName])
    if (!rows || rows.length === 0) {
      await query(`ALTER TABLE books ADD COLUMN ${columnName} ${definition}`)
    }
  } catch (error) {
    console.warn(`Column check failed for ${columnName}:`, error)
  }
}

const ensureBooksSchema = async () => {
  await query(CREATE_TABLE_SQL)
  for (const column of REQUIRED_COLUMNS) {
    await ensureColumn(column.name, column.definition)
  }
}

const normalizeDbRows = (rows: any[]) => {
  return (rows || []).map((book: any) => ({
    id: book.id,
    isbn: book.isbn,
    print_isbn: book.print_isbn,
    title: book.title,
    author: book.author,
    coverImage: book.coverImage || DEFAULT_BOOK_COVER,
    description: book.description,
    keywords: book.keywords,
    subjectcategoryId: book.subjectcategoryId,
    rating: book.rating,
    ratingCount: book.ratingCount,
    createdAt: book.createdAt ? new Date(book.createdAt).toISOString() : new Date().toISOString(),
    contenttype: 'books'
  }))
}

const fetchBooksFromDb = async () => {
  try {
    await ensureBooksSchema()
    const [rows]: any = await query(SELECT_BOOKS_SQL)
    return normalizeDbRows(rows)
  } catch (error) {
    console.warn('Failed to read books from database, falling back to local assets:', error)
    return []
  }
}

const mergeBooks = (primary: any[], secondary: any[]) => {
  const seen = new Set<string>()
  const merged = [] as any[]
  const pushUnique = (book: any) => {
    const key = (book.isbn || book.print_isbn || book.title || book.id)?.toString()
    if (key && seen.has(key)) return
    if (key) {
      seen.add(key)
    }
    merged.push(book)
  }

  primary.forEach(pushUnique)
  secondary.forEach(pushUnique)
  return merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const [dbBooks, localBooks] = await Promise.all([fetchBooksFromDb(), loadLocalBooks()])
    const payload = mergeBooks(dbBooks, localBooks)
    return res.status(200).json(payload)
  }

  if (req.method === 'POST') {
    const {
      isbn,
      print_isbn,
      title,
      author,
      coverImage,
      description,
      keywords,
      subjectcategoryId,
      rating,
      ratingCount
    } = req.body || {}

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'Invalid title' })
    }

    try {
      await ensureBooksSchema()
      const [result]: any = await query(
        'INSERT INTO books (isbn, print_isbn, title, author, coverImage, description, keywords, subjectcategoryId, rating, ratingCount, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [
          isbn || null,
          print_isbn || null,
          title,
          author || null,
          coverImage || null,
          description || null,
          keywords || null,
          subjectcategoryId || null,
          rating || 0,
          ratingCount || 0
        ]
      )
      return res.status(201).json({ id: result?.insertId })
    } catch (error) {
      console.error('Failed to save book:', error)
      return res.status(500).json({ message: 'Unable to save book' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}

