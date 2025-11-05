import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const [rows] = await query('SELECT id, title, description, icon FROM specialties ORDER BY id DESC')
      return res.status(200).json(rows)
    }

    if (req.method === 'POST') {
      const { title, description, icon } = req.body || {}
      if (!title) return res.status(400).json({ message: 'Missing title' })
      const [result]: any = await query(
        'INSERT INTO specialties (title, description, icon) VALUES (?, ?, ?)',
        [title, description ?? '', icon ?? '']
      )
      return res.status(201).json({ id: result.insertId })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (err: any) {
    return res.status(500).json({ message: err?.message || 'Server error' })
  }
}


