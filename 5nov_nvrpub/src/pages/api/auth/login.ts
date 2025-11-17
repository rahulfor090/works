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
    const { username, password } = req.body || {}
    
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' })
    }

    // Query users table - check both username and email
    const result = await query(
      `SELECT user_id, username, password, email, role, status 
       FROM users 
       WHERE (username = ? OR email = ?) AND status = 'Active' 
       LIMIT 1`,
      [username, username]
    )

    // Handle nested array structure
    const users = Array.isArray(result) ? (Array.isArray(result[0]) ? result[0] : result) : []

    if (!users || users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const user = users[0]

    // Check password (assuming passwords are hashed with bcrypt)
    // If passwords are plain text in DB, use: if (password !== user.password)
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role || 'admin'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', `admin-token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`)
    
    return res.status(200).json({ 
      success: true, 
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
  } catch (err: any) {
    console.error('Login error:', err)
    return res.status(500).json({ success: false, message: err?.message || 'Server error' })
  }
}
