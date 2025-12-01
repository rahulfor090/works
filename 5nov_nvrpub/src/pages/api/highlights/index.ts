import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { user_email, isbn, chapter_slug } = req.query

      if (!user_email || !isbn || !chapter_slug) {
        return res.status(400).json({ message: 'Missing required parameters' })
      }

      const [rows] = await query(
        'SELECT * FROM highlights WHERE user_email = ? AND isbn = ? AND chapter_slug = ? ORDER BY created_at DESC',
        [user_email, isbn, chapter_slug]
      )
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { user_email, isbn, chapter_slug, selected_text, note, color } = req.body

      if (!user_email || !isbn || !chapter_slug || !selected_text) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      const [result] = await query(
        'INSERT INTO highlights (user_email, isbn, chapter_slug, selected_text, note, color) VALUES (?, ?, ?, ?, ?, ?)',
        [user_email, isbn, chapter_slug, selected_text, note || '', color || 'yellow']
      )

      return res.status(201).json({
        id: (result as any).insertId,
        message: 'Highlight created successfully'
      })
    }

    if (req.method === 'DELETE') {
      const { id, user_email } = req.body

      if (!id || !user_email) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      const [result] = await query(
        'DELETE FROM highlights WHERE id = ? AND user_email = ?',
        [id, user_email]
      )

      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ message: 'Highlight not found or unauthorized' })
      }

      return res.status(200).json({ message: 'Highlight deleted successfully' })
    }

    if (req.method === 'PUT') {
      const { id, user_email, note } = req.body

      if (!id || !user_email) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      const [result] = await query(
        'UPDATE highlights SET note = ? WHERE id = ? AND user_email = ?',
        [note || '', id, user_email]
      )

      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ message: 'Highlight not found or unauthorized' })
      }

      return res.status(200).json({ message: 'Highlight updated successfully' })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    console.error('Highlights API error:', e)
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}
