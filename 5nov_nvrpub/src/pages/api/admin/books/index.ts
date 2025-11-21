import type { NextApiRequest, NextApiResponse } from 'next'
import { query, getConnection } from '@/utils/db'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

interface Book extends RowDataPacket {
  id: number
  isbn: string
  book_title: string
  book_subtitle?: string
  doi?: string
  subject?: string
  society?: string
  access_type: string
  book_content_type: string
  edition?: string
  book_type?: string
  book_bisac?: string
  publishing_year?: number
  publish_status: string
  no_of_chapters: number
  no_of_pages: number
  no_of_volumes: number
  featured: boolean
  download_enable: boolean
  rating: number
  book_cover_image?: string
  book_overview?: string
  supplementary_information?: string
  status: string
  created_date: Date
  updated_date: Date
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        return await getBooks(req, res)
      case 'POST':
        return await createBook(req, res)
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).json({ message: `Method ${method} Not Allowed` })
    }
  } catch (error: any) {
    console.error('Books API Error:', error)
    return res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}

async function getBooks(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [books] = await query<Book[]>(
      `SELECT * FROM books
      WHERE status != 'Deleted'
      ORDER BY created_date DESC`
    )

    return res.status(200).json({ success: true, data: books })
  } catch (error: any) {
    console.error('Get Books Error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

async function createBook(req: NextApiRequest, res: NextApiResponse) {
  const {
    isbn,
    book_title,
    book_subtitle,
    doi,
    category_id,
    subject_ids,
    society,
    access_type,
    book_content_type,
    edition,
    book_type,
    book_bisac,
    publishing_year,
    publish_status,
    no_of_chapters,
    no_of_pages,
    no_of_volumes,
    featured,
    download_enable,
    rating,
    book_cover_image,
    book_overview,
    supplementary_information,
    status = 'Active'
  } = req.body

  if (!isbn || !book_title) {
    return res.status(400).json({ success: false, message: 'ISBN and Book Title are required' })
  }

  try {
    // Convert subject_ids array to comma-separated string
    const subjectIdsString = subject_ids && Array.isArray(subject_ids) ? subject_ids.join(',') : ''

    const [result] = await query<ResultSetHeader>(
      `INSERT INTO books (
        isbn, book_title, book_subtitle, doi, category_id, subject_ids, society, access_type, book_content_type,
        edition, book_type, book_bisac, publishing_year, publish_status,
        no_of_chapters, no_of_pages, no_of_volumes, featured, download_enable,
        rating, book_cover_image, book_overview, supplementary_information, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        isbn, book_title, book_subtitle, doi, category_id || null, subjectIdsString, society, access_type, book_content_type,
        edition, book_type, book_bisac, publishing_year, publish_status,
        no_of_chapters, no_of_pages, no_of_volumes, featured, download_enable,
        rating, book_cover_image, book_overview, supplementary_information, status || 'Active'
      ]
    )

    const bookId = (result as any).insertId

    return res.status(201).json({ success: true, message: 'Book created successfully', bookId })
  } catch (error: any) {
    console.error('Create Book Error:', error)
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'ISBN already exists' })
    }
    
    return res.status(500).json({ success: false, message: error.message })
  }
}
