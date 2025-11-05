import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const [rows] = await query('SELECT id, title, content, userName, professional, photo, createdAt FROM testimonials ORDER BY createdAt DESC')
      return res.status(200).json(rows)
    }
    
    if (req.method === 'POST') {
      const { title, content, userName, professional, photo } = req.body || {}
      if (!title || !content || !userName || !professional || !photo) {
        return res.status(400).json({ message: 'Missing required fields: title, content, userName, professional, photo' })
      }
      
      const [result] = await query(
        'INSERT INTO testimonials (title, content, userName, professional, photo) VALUES (?, ?, ?, ?, ?)',
        [title, content, userName, professional, photo]
      )
      
      return res.status(201).json({ 
        id: (result as any).insertId,
        message: 'Testimonial created successfully'
      })
    }
    
    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    console.error('Testimonials API error:', e)
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}


