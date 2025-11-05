import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const [rows] = await query(
        'CREATE TABLE IF NOT EXISTS contents (\n' +
        '  id INT AUTO_INCREMENT PRIMARY KEY,\n' +
        '  title VARCHAR(255) NOT NULL,\n' +
        '  coverImage VARCHAR(512) NOT NULL,\n' +
        '  description TEXT NOT NULL,\n' +
        '  author VARCHAR(128) NOT NULL,\n' +
        '  detailsHtml TEXT NOT NULL,\n' +
        '  rating FLOAT NOT NULL DEFAULT 0,\n' +
        '  displayOrder INT NOT NULL DEFAULT 0,\n' +
        '  contentTypeId INT NOT NULL,\n' +
        '  subjectcategoryId INT NOT NULL,\n' +
        '  ishomepage INT DEFAULT 0,\n' +
        '  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n' +
        ')'
      )
      const [contents] = await query(
        'SELECT id, title, coverImage, description, author, detailsHtml, rating, displayOrder AS `order`, contentTypeId, subjectcategoryId, ishomepage FROM contents ORDER BY displayOrder ASC, id DESC'
      )
      return res.status(200).json(contents)
    }

    if (req.method === 'POST') {
      const { title, coverImage, description, author, detailsHtml, rating, order, contentTypeId, subjectcategoryId, ishomepage } = req.body || {}
      if (!title || !coverImage || !contentTypeId || !subjectcategoryId) {
        return res.status(400).json({ message: 'Missing required fields' })
      }
      const [result]: any = await query(
        'INSERT INTO contents (title, coverImage, description, author, detailsHtml, rating, displayOrder, contentTypeId, subjectcategoryId, ishomepage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, coverImage, description ?? '', author ?? 'Admin', detailsHtml ?? '', rating ?? 0, order ?? 0, contentTypeId, subjectcategoryId, ishomepage ?? 0]
      )
      return res.status(201).json({ id: result.insertId })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (err: any) {
    return res.status(500).json({ message: err?.message || 'Server error' })
  }
}