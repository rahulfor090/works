import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
        WHERE c.status != 'Deleted'
        ORDER BY c.created_date DESC`
      )
      
      // Handle the result - it might be an array or nested array
      const chapters = Array.isArray(result) ? (Array.isArray(result[0]) ? result[0] : result) : []
      
      return res.status(200).json({ success: true, data: chapters })
    } catch (error: any) {
      console.error('Error fetching chapters:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  if (req.method === 'POST') {
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

      // Validation
      if (!book_id || !chapter_number || !chapter_title) {
        return res.status(400).json({
          success: false,
          message: 'Book, Chapter Number, and Chapter Title are required'
        })
      }

      const result = await query(
        `INSERT INTO chapters (
          book_id, book_isbn, chapter_number, sequence_number, chapter_title, doi,
          first_page, last_page, access_type, keywords, description, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')`,
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
          description || null
        ]
      )

      return res.status(201).json({
        success: true,
        message: 'Chapter created successfully',
        data: { id: (result as any).insertId }
      })
    } catch (error: any) {
      console.error('Error creating chapter:', error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' })
}
