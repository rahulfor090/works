import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

interface StaticPage {
  id: number
  page_for: string
  page_name: string
  page_content: string
  page_status: string
  created_at?: string
  updated_at?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Invalid ID parameter' })
  }

  const pageId = parseInt(id, 10)
  if (isNaN(pageId)) {
    return res.status(400).json({ message: 'ID must be a number' })
  }

  if (req.method === 'PUT') {
    try {
      const { page_for, page_name, page_content, page_status } = req.body

      if (!page_for || !page_name) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      const [result] = await query(
        `UPDATE static_pages SET page_for = ?, page_name = ?, page_content = ?, page_status = ?, updated_at = NOW() WHERE id = ?`,
        [page_for, page_name, page_content || null, page_status || 'Active', pageId]
      )

      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ message: 'Static page not found' })
      }

      const [rows] = await query<StaticPage>(
        `SELECT id, page_for, page_name, page_content, page_status, created_at, updated_at FROM static_pages WHERE id = ?`,
        [pageId]
      )

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Static page not found' })
      }

      return res.status(200).json(rows[0])
    } catch (error: any) {
      console.error('Static Pages PUT API error:', error)
      return res.status(500).json({ message: error?.message || 'Failed to update static page' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const [result] = await query(
        `DELETE FROM static_pages WHERE id = ?`,
        [pageId]
      )

      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ message: 'Static page not found' })
      }

      return res.status(200).json({ message: 'Static page deleted successfully' })
    } catch (error: any) {
      console.error('Static Pages DELETE API error:', error)
      return res.status(500).json({ message: error?.message || 'Failed to delete static page' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
