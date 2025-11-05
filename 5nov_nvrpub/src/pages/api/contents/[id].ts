import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const contentId = Number(id)
  if (!contentId || Number.isNaN(contentId)) return res.status(400).json({ message: 'Invalid id' })
  try {
    if (req.method === 'GET') {
      const [rows] = await query('SELECT id, title, coverImage, description, author, detailsHtml, rating, displayOrder AS `order`, contentTypeId, subjectcategoryId, ishomepage FROM contents WHERE id = ?', [contentId])
      return res.status(200).json(rows?.[0] || null)
    }

    if (req.method === 'PUT') {
      const { title, coverImage, description, author, detailsHtml, rating, order, contentTypeId, subjectcategoryId, ishomepage } = req.body || {}
      const [result]: any = await query(
        'UPDATE contents SET title = ?, coverImage = ?, description = ?, author = ?, detailsHtml = ?, rating = ?, displayOrder = ?, contentTypeId = ?, subjectcategoryId = ?, ishomepage = ? WHERE id = ?',
        [title, coverImage, description, author, detailsHtml, rating, order, contentTypeId, subjectcategoryId, ishomepage ?? 0, contentId]
      )
      return res.status(200).json({ affectedRows: result.affectedRows })
    }

    if (req.method === 'DELETE') {
      const [result]: any = await query('DELETE FROM contents WHERE id = ?', [contentId])
      return res.status(200).json({ affectedRows: result.affectedRows })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (err: any) {
    return res.status(500).json({ message: err?.message || 'Server error' })
  }
}