import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const result = await query(
        `SELECT 
          c.id,
          c.book_id,
          c.chapter_number,
          c.sequence_number,
          c.chapter_title,
          c.doi,
          c.first_page,
          c.last_page,
          c.access_type,
          c.keywords,
          c.description,
          c.status,
          c.created_date,
          c.updated_date,
          b.book_title,
          b.isbn as book_isbn
        FROM chapters c
        LEFT JOIN books b ON c.book_id = b.id
        WHERE c.id = ? AND c.status != 'Deleted'`,
        [id]
      )

      // Handle the result - it might be an array or nested array
      const chapters = Array.isArray(result) ? (Array.isArray(result[0]) ? result[0] : result) : []

      if (!chapters || chapters.length === 0) {
        return res.status(404).json({ success: false, message: 'Chapter not found' })
      }

      return res.status(200).json({ success: true, data: chapters[0] })
    } catch (error: any) {
      console.error('Error fetching chapter:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  if (req.method === 'PUT') {
    try {
      const {
        book_id,
        book_isbn,
        chapter_number,
        sequence_number,
        chapter_title,
        doi,
        first_page,
        last_page,
        access_type,
        keywords,
        description
      } = req.body

      await query(
        `UPDATE chapters SET
          book_id = ?,
          book_isbn = ?,
          chapter_number = ?,
          sequence_number = ?,
          chapter_title = ?,
          doi = ?,
          first_page = ?,
          last_page = ?,
          access_type = ?,
          keywords = ?,
          description = ?
        WHERE id = ?`,
        [
          book_id,
          book_isbn,
          chapter_number,
          sequence_number || null,
          chapter_title,
          doi || null,
          first_page || null,
          last_page || null,
          access_type || 'Paid',
          keywords || null,
          description || null,
          id
        ]
      )

      return res.status(200).json({
        success: true,
        message: 'Chapter updated successfully'
      })
    } catch (error: any) {
      console.error('Error updating chapter:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await query(
        `DELETE FROM chapters WHERE id = ?`,
        [id]
      )

      return res.status(200).json({
        success: true,
        message: 'Chapter deleted successfully'
      })
    } catch (error: any) {
      console.error('Error deleting chapter:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' })
}
