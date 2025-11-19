import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/utils/db';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch all users with their role information
      const sql = `
        SELECT 
          u.user_id,
          u.username,
          u.first_name,
          u.last_name,
          u.email,
          u.subscription_type,
          u.status,
          u.role as role_name
        FROM admin_users u
        ORDER BY u.createdAt DESC
      `;
      
      const [users] = await query(sql);
      return res.status(200).json({ success: true, data: users });
    } 
    else if (req.method === 'POST') {
      // Create new user
      const { 
        username, 
        password, 
        first_name, 
        last_name, 
        email, 
        subscription_type,
        role_id,
        status
      } = req.body;

      // Validate required fields
      if (!username || !password || !email) {
        return res.status(400).json({ 
          success: false, 
          message: 'Username, password, and email are required' 
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const insertUserSql = `
        INSERT INTO admin_users (
          username, 
          password, 
          first_name, 
          last_name, 
          email, 
          subscription_type,
          role,
          status,
          createdAt,
          updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const [result] = await query(insertUserSql, [
        username,
        hashedPassword,
        first_name || null,
        last_name || null,
        email,
        subscription_type || null,
        role_id || null,
        status || 'Active'
      ]);

      const userId = (result as any).insertId;

      return res.status(201).json({ 
        success: true, 
        message: 'User created successfully',
        userId
      });
    }
    else if (req.method === 'PUT') {
      // Update user
      const { user_id, username, first_name, last_name, email, subscription_type, status, role_id } = req.body;

      if (!user_id) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }

      const updateSql = `
        UPDATE admin_users 
        SET username = ?, 
            first_name = ?, 
            last_name = ?, 
            email = ?, 
            subscription_type = ?,
            role = ?,
            status = ?,
            updatedAt = NOW()
        WHERE user_id = ?
      `;

      await query(updateSql, [
        username,
        first_name,
        last_name,
        email,
        subscription_type,
        role_id || null,
        status,
        user_id
      ]);

      return res.status(200).json({ success: true, message: 'User updated successfully' });
    }
    else if (req.method === 'DELETE') {
      const { user_id } = req.body;

      if (!user_id) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }

      const deleteSql = `DELETE FROM admin_users WHERE user_id = ?`;
      await query(deleteSql, [user_id]);

      return res.status(200).json({ success: true, message: 'User deleted successfully' });
    }
    else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Users API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Internal server error' 
    });
  }
}
