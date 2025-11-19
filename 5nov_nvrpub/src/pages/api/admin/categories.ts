import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'
import { RowDataPacket } from 'mysql2'

interface Category extends RowDataPacket {
  id: number
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }

  try {
    const [categories] = await query<Category[]>(
      'SELECT id, name FROM subjectcategory ORDER BY name ASC'
    )

    return res.status(200).json({ success: true, data: categories })
  } catch (error: any) {
    console.error('Get Categories Error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}
