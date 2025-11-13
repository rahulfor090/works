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
  if (req.method === 'GET') {
    try {
      const [rows] = await query<AnnualPrice>(
        `SELECT id, code, title, description, category, type, journal, format, region, currency, 
                price, discount_price as discountPrice, is_active as isActive, created_at as createdAt, 
                updated_at as updatedAt FROM annual_prices ORDER BY created_at DESC`
      )
      return res.status(200).json(rows)
    } catch (error: any) {
      console.error('Annual Prices API error:', error)
      return res.status(500).json({ message: error?.message || 'Failed to fetch annual prices' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { code, title, description, category, type, journal, format, region, currency, price, discountPrice, isActive } = req.body

      if (!code || !title || !category || !type || !journal || !format) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      const [result] = await query(
        `INSERT INTO annual_prices (code, title, description, category, type, journal, format, region, currency, price, discount_price, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [code, title, description, category, type, journal, format, region, currency, price, discountPrice || null, isActive !== false]
      )

      const newPrice: AnnualPrice = {
        id: (result as any).insertId,
        code,
        title,
        description,
        category,
        type,
        journal,
        format,
        region,
        currency,
        price,
        discountPrice: discountPrice || 0,
        isActive: isActive !== false,
        createdAt: new Date().toISOString(),
      }

      return res.status(201).json(newPrice)
    } catch (error: any) {
      console.error('Annual Prices POST API error:', error)
      return res.status(500).json({ message: error?.message || 'Failed to create annual price' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
