import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const { username, password } = req.body || {}
    
    // Check credentials
    const validUsername = process.env.ADMIN_USER || 'admin'
    const validPassword = process.env.ADMIN_PASSWORD || 'admin@2025'
    
    if (username !== validUsername || password !== validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Create JWT token
    const token = jwt.sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', `admin-token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`)
    
    return res.status(200).json({ success: true })
  } catch (err: any) {
    return res.status(500).json({ message: err?.message || 'Server error' })
  }
}
