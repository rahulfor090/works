import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // Fetch published ads with location='header' and page_location='home'
    const [rows]: any = await query(
      `SELECT id, title, url, logo, location, page_location 
       FROM citations 
       WHERE isPublished = 1 
       AND location = 'header' 
       AND page_location = 'home'
       ORDER BY id DESC 
       LIMIT 1`
    )

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'No active ad found' })
    }

    const ad = rows[0]
    return res.status(200).json({
      id: ad.id,
      title: ad.title,
      url: ad.url,
      image: ad.logo,
      isActive: true
    })
  } catch (error: any) {
    console.error('Error fetching active header ad:', error)
    return res.status(500).json({ message: error?.message || 'Server error' })
  }
}
