import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

const DEFAULT_LOGO = 'https://d45jl3w9libvn.cloudfront.net/jaypee/static/img/pub/header-jaypee.png'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ensure table exists (single-row settings)
    await query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT PRIMARY KEY,
        logoUrl VARCHAR(512) NOT NULL,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Ensure a default row exists
    const [rows]: any = await query('SELECT id, logoUrl FROM site_settings WHERE id = 1')
    if (!rows || rows.length === 0) {
      await query('INSERT INTO site_settings (id, logoUrl) VALUES (1, ?)', [DEFAULT_LOGO])
    }

    if (req.method === 'GET') {
      const [settings]: any = await query('SELECT id, logoUrl, updatedAt FROM site_settings WHERE id = 1')
      const item = settings?.[0]
      return res.status(200).json({ logoUrl: item?.logoUrl || DEFAULT_LOGO })
    }

    if (req.method === 'PUT') {
      const { logoUrl } = req.body || {}
      if (!logoUrl || typeof logoUrl !== 'string') {
        return res.status(400).json({ message: 'Invalid logoUrl' })
      }
      await query('UPDATE site_settings SET logoUrl = ?, updatedAt = NOW() WHERE id = 1', [logoUrl])
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Server error' })
  }
}

