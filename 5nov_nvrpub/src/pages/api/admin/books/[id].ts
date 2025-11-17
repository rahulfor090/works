import type { NextApiRequest, NextApiResponse } from 'next'
import { query, getConnection } from '@/utils/db'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query: urlQuery } = req
  const { id } = urlQuery

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ success: false, message: 'Invalid book ID' })
  }

  try {
    switch (method) {
      case 'GET':
        return await getBook(id, res)
      case 'PUT':
        return await updateBook(id, req, res)
      case 'DELETE':
        return await deleteBook(id, res)
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        return res.status(405).json({ message: `Method ${method} Not Allowed` })
    }
  } catch (error: any) {
    console.error('Book API Error:', error)
    return res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}

async function getBook(id: string, res: NextApiResponse) {
  try {
    const [books] = await query<RowDataPacket[]>(
      'SELECT * FROM books WHERE id = ? AND status != "Deleted"',
      [id]
    )

    if (books.length === 0) {
      return res.status(404).json({ success: false, message: 'Book not found' })
    }

    return res.status(200).json({ success: true, data: books[0] })
  } catch (error: any) {
    console.error('Get Book Error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

async function updateBook(id: string, req: NextApiRequest, res: NextApiResponse) {
  const {
    isbn,
    book_title,
    book_subtitle,
    doi,
    subject,
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
    supplementary_information
  } = req.body

  try {
    const [result] = await query<ResultSetHeader>(
      `UPDATE books SET
        isbn = ?, book_title = ?, book_subtitle = ?, doi = ?, subject = ?, society = ?,
        access_type = ?, book_content_type = ?, edition = ?, book_type = ?, book_bisac = ?,
        publishing_year = ?, publish_status = ?, no_of_chapters = ?,
        no_of_pages = ?, no_of_volumes = ?, featured = ?, download_enable = ?,
        rating = ?, book_cover_image = ?, book_overview = ?,
        supplementary_information = ?
      WHERE id = ? AND status != "Deleted"`,
      [
        isbn, book_title, book_subtitle, doi, subject, society, access_type, book_content_type,
        edition, book_type, book_bisac, publishing_year, publish_status,
        no_of_chapters, no_of_pages, no_of_volumes, featured, download_enable,
        rating, book_cover_image, book_overview, supplementary_information, id
      ]
    )

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Book not found' })
    }

    return res.status(200).json({ success: true, message: 'Book updated successfully' })
  } catch (error: any) {
    console.error('Update Book Error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

async function deleteBook(id: string, res: NextApiResponse) {
  try {
    // First delete all chapters associated with this book
    await query<ResultSetHeader>(
      'DELETE FROM chapters WHERE book_id = ?',
      [id]
    )

    // Then delete the book
    const [result] = await query<ResultSetHeader>(
      'DELETE FROM books WHERE id = ?',
      [id]
    )

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Book not found' })
    }

    return res.status(200).json({ success: true, message: 'Book deleted successfully' })
  } catch (error: any) {
    console.error('Delete Book Error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}
