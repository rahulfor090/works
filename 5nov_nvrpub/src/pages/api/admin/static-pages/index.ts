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
  if (req.method === 'GET') {
    try {
      const [rows] = await query<StaticPage>(
        `SELECT id, page_for, page_name, page_content, page_status, created_at, updated_at 
         FROM static_pages ORDER BY created_at DESC`
      )
      return res.status(200).json(rows)
    } catch (error: any) {
      console.error('Static Pages API error:', error)
      return res.status(500).json({ message: error?.message || 'Failed to fetch static pages' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { page_for, page_name, page_content, page_status } = req.body

      if (!page_for || !page_name) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      const [result] = await query(
        `INSERT INTO static_pages (page_for, page_name, page_content, page_status) 
         VALUES (?, ?, ?, ?)`,
        [page_for, page_name, page_content || null, page_status || 'Active']
      )

      const newPage: StaticPage = {
        id: (result as any).insertId,
        page_for,
        page_name,
        page_content: page_content || '',
        page_status: page_status || 'Active',
        created_at: new Date().toISOString(),
      }

      return res.status(201).json(newPage)
    } catch (error: any) {
      console.error('Static Pages POST API error:', error)
      return res.status(500).json({ message: error?.message || 'Failed to create static page' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
