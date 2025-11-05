import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const token = req.cookies['admin-token']
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }

    return res.status(200).json({ valid: true, user: decoded })
  } catch (err: any) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
