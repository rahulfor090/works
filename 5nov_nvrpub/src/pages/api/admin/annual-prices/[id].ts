import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

interface AnnualPrice {
  id: number
  code: string
  title: string
  description: string
  category: string
  type: string
  journal: string
  format: string
  region: string
  currency: string
  price: number
  discountPrice?: number
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Invalid ID parameter' })
  }

  const priceId = parseInt(id, 10)
  if (isNaN(priceId)) {
    return res.status(400).json({ message: 'ID must be a number' })
  }

  if (req.method === 'PUT') {
    try {
      const { code, title, description, category, type, journal, format, region, currency, price, discountPrice, isActive } = req.body

      if (!code || !title || !category || !type || !journal || !format) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      const [result] = await query(
        `UPDATE annual_prices SET code = ?, title = ?, description = ?, category = ?, type = ?, journal = ?, format = ?, region = ?, currency = ?, price = ?, discount_price = ?, is_active = ?, updated_at = NOW() WHERE id = ?`,
        [code, title, description, category, type, journal, format, region, currency, price, discountPrice || null, isActive !== false, priceId]
      )

      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ message: 'Annual price not found' })
      }

      // Fetch the updated record
      const [rows] = await query<AnnualPrice>(
        `SELECT id, code, title, description, category, type, journal, format, region, currency, 
                price, discount_price as discountPrice, is_active as isActive, created_at as createdAt, 
                updated_at as updatedAt FROM annual_prices WHERE id = ?`,
        [priceId]
      )

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Annual price not found' })
      }

      return res.status(200).json(rows[0])
    } catch (error: any) {
      console.error('Annual Prices PUT API error:', error)
      return res.status(500).json({ message: error?.message || 'Failed to update annual price' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const [result] = await query(
        `DELETE FROM annual_prices WHERE id = ?`,
        [priceId]
      )

      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ message: 'Annual price not found' })
      }

      return res.status(200).json({ message: 'Annual price deleted successfully' })
    } catch (error: any) {
      console.error('Annual Prices DELETE API error:', error)
      return res.status(500).json({ message: error?.message || 'Failed to delete annual price' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
