import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'
import { RowDataPacket } from 'mysql2'

interface Subject extends RowDataPacket {
  id: number
  subject: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }

  try {
    const [subjects] = await query<Subject[]>(
      'SELECT id, subject FROM subjects ORDER BY subject ASC'
    )

    return res.status(200).json({ success: true, data: subjects })
  } catch (error: any) {
    console.error('Get Subjects Error:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}
