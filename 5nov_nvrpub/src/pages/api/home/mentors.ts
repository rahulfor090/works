import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch active mentors for home page, ordered by displayOrder
      const [rows] = await query(`
        SELECT id, name, photo_url, speciality, hospital, company_logo_url, description, rating
        FROM mentors 
        WHERE active = 1 
        ORDER BY \`order\` ASC
        LIMIT 4
      `)
      return res.status(200).json(rows)
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    console.error('Home mentors API error:', e)
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}
