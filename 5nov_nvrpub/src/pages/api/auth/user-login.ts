import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { query } from '@/utils/db'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  try {
    const { email, password } = req.body || {}
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    // Query users table
    const result = await query(
      `SELECT id, full_name, email, password, plan 
       FROM users 
       WHERE email = ? 
       LIMIT 1`,
      [email]
    )

    // Handle nested array structure
    const users = Array.isArray(result) ? (Array.isArray(result[0]) ? result[0] : result) : []

    if (!users || users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    const user = users[0]

    // Check password (hashed with bcrypt)
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        plan: user.plan,
        isPremium: user.plan && user.plan !== 'Free'
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', `user-token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`)
    
    return res.status(200).json({ 
      success: true, 
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        plan: user.plan,
        isPremium: user.plan && user.plan !== 'Free'
      }
    })
  } catch (err: any) {
    console.error('User login error:', err)
    return res.status(500).json({ success: false, message: err?.message || 'Server error' })
  }
}
