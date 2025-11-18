import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  try {
    const { full_name, email, password, plan } = req.body || {}
    
    if (!full_name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Full name, email, and password are required' 
      })
    }

    // Check if user already exists
    const existingUser = await query(
      `SELECT id FROM users WHERE email = ? LIMIT 1`,
      [email]
    )

    const users = Array.isArray(existingUser) ? (Array.isArray(existingUser[0]) ? existingUser[0] : existingUser) : []

    if (users && users.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert new user
    const result = await query(
      `INSERT INTO users (full_name, email, password, plan, created_at, updated_at) 
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [full_name, email, hashedPassword, plan || 'Free']
    )

    const insertResult = Array.isArray(result) ? result[0] : result
    const userId = (insertResult as any).insertId

    return res.status(201).json({ 
      success: true, 
      message: 'Account created successfully',
      userId,
      user: {
        id: userId,
        full_name,
        email,
        plan: plan || 'Free'
      }
    })

  } catch (error: any) {
    console.error('Signup error:', error)
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Internal server error' 
    })
  }
}
