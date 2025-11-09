import type { NextApiRequest, NextApiResponse } from 'next'
import { search as solrSearch } from '@/utils/solr'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' })

  try {
    const q = String(req.query.q || '').trim() || '*:*'
    const type = String(req.query.type || 'all')
    const start = Number(req.query.start || 0)
    const rows = Number(req.query.rows || 25)

    const result = await solrSearch(q, { type, start, rows })
    const docs = result?.response?.docs || []

    return res.status(200).json({ q, type, start, rows, total: result?.response?.numFound || 0, items: docs })
  } catch (e: any) {
    return res.status(500).json({ message: e?.message || 'Search error' })
  }
}

