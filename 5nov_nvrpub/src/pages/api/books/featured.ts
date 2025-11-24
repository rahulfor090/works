import type { NextApiRequest, NextApiResponse } from 'next'

import { query } from '@/utils/db'
import { AdminBookRow, mapAdminBookRow, NormalizedAdminBook } from '@/utils/admin-books'

const MAX_LIMIT = 24
const DEFAULT_LIMIT = 12

const SELECT_FEATURED_BOOKS = `
  SELECT
    b.id,
    b.isbn,
    b.book_title,
    b.book_subtitle,
    b.society,
    b.category_id,
    b.access_type,
    b.book_content_type,
    b.book_cover_image,
    b.book_overview,
    b.rating,
    b.created_date,
    b.updated_date,
    b.subject_ids,
    b.status,
    sc.name AS category_name
  FROM books b
  LEFT JOIN subjectcategory sc ON b.category_id = sc.id
  WHERE b.featured = 1
    AND (b.status IS NULL OR b.status NOT IN ('Deleted', 'deleted'))
  ORDER BY COALESCE(b.updated_date, b.created_date) DESC
  LIMIT ?
`

const parseLimit = (value?: string | string[]) => {
  if (!value) return DEFAULT_LIMIT
  const parsed = Array.isArray(value) ? parseInt(value[0], 10) : parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed <= 0) return DEFAULT_LIMIT
  return Math.min(parsed, MAX_LIMIT)
}

const adaptForHighlights = (book: NormalizedAdminBook) => ({
  id: book.id,
  isbn: book.isbn,
  title: book.title,
  subtitle: book.subtitle,
  author: book.author,
  category: book.category,
  image: book.coverImage,
  overview: book.description,
  rating: book.rating,
  reviews: book.ratingCount,
  accessType: book.accessType,
  contentType: book.contentType,
  createdAt: book.createdAt,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` })
  }

  const limit = parseLimit(req.query.limit)

  try {
    const [rows] = await query<AdminBookRow>(SELECT_FEATURED_BOOKS, [limit])
    const data = rows.map(mapAdminBookRow).map(adaptForHighlights)
    return res.status(200).json({ success: true, data })
  } catch (error) {
    console.error('Failed to fetch featured books:', error)
    return res.status(500).json({ success: false, message: 'Unable to fetch featured books' })
  }
}
