import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch all roles
      const sql = `
        SELECT 
          role_id,
          role_name,
          role_code,
          status
        FROM roles
        ORDER BY createdAt DESC
      `;
      
      const [roles] = await query(sql);
      return res.status(200).json({ success: true, data: roles });
    } 
    else if (req.method === 'POST') {
      // Create new role
      const { role_name, role_code, status } = req.body;

      // Validate required fields
      if (!role_name || !role_code) {
        return res.status(400).json({ 
          success: false, 
          message: 'Role name and role code are required' 
        });
      }

      // Insert role
      const insertSql = `
        INSERT INTO roles (
          role_name, 
          role_code, 
          status,
          createdAt,
          updatedAt
        ) VALUES (?, ?, ?, NOW(), NOW())
      `;

      const [result] = await query(insertSql, [role_name, role_code, status || 'Active']);

      const roleId = (result as any).insertId;

      return res.status(201).json({ 
        success: true, 
        message: 'Role created successfully',
        roleId
      });
    }
    else if (req.method === 'PUT') {
      // Update role
      const { role_id, role_name, role_code, status } = req.body;

      if (!role_id) {
        return res.status(400).json({ success: false, message: 'Role ID is required' });
      }

      const updateSql = `
        UPDATE roles 
        SET role_name = ?, 
            role_code = ?, 
            status = ?,
            updatedAt = NOW()
        WHERE role_id = ?
      `;

      await query(updateSql, [role_name, role_code, status, role_id]);

      return res.status(200).json({ success: true, message: 'Role updated successfully' });
    }
    else if (req.method === 'DELETE') {
      const { role_id } = req.body;

      if (!role_id) {
        return res.status(400).json({ success: false, message: 'Role ID is required' });
      }

      const deleteSql = `DELETE FROM roles WHERE role_id = ?`;
      await query(deleteSql, [role_id]);

      return res.status(200).json({ success: true, message: 'Role deleted successfully' });
    }
    else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Roles API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Internal server error' 
    });
  }
}
