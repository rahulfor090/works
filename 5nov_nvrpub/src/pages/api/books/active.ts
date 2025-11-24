import type { NextApiRequest, NextApiResponse } from 'next'

import { query } from '@/utils/db'
import { AdminBookRow, mapAdminBookRow } from '@/utils/admin-books'

const SELECT_ACTIVE_BOOKS = `
  SELECT
    b.id,
    b.isbn,
    b.book_title,
    b.book_subtitle,
    b.society,
    b.category_id,
    b.subject_ids,
    b.access_type,
    b.book_content_type,
    b.book_cover_image,
    b.book_overview,
    b.rating,
    b.status,
    b.created_date,
    b.updated_date,
    b.authors,
    sc.name AS category_name
  FROM books b
  LEFT JOIN subjectcategory sc ON b.category_id = sc.id
  WHERE b.status = 'Active'
  ORDER BY COALESCE(b.updated_date, b.created_date) DESC
`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` })
  }

  try {
    const [rows] = await query<AdminBookRow>(SELECT_ACTIVE_BOOKS)
    const data = rows.map(mapAdminBookRow)
    return res.status(200).json({ success: true, data })
  } catch (error) {
    console.error('Failed to fetch active books:', error)
    return res.status(500).json({ success: false, message: 'Unable to fetch active books' })
  }
}
