import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const conn = await getConnection()
    const [rows] = await conn.query('SELECT 1 AS ok')
    conn.release()
    return res.status(200).json({ status: 'ok', result: rows?.[0] || null })
  } catch (e: any) {
    return res.status(500).json({ status: 'error', message: e?.message || 'Unknown error' })
  }
}

