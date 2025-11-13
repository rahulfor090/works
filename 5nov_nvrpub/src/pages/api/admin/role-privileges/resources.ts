import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch all resources
      const sql = `SELECT resource_id, resource_name, status, createdAt, updatedAt 
                   FROM resources 
                   ORDER BY resource_name ASC`;
      
      const [resources] = await query(sql);
      return res.status(200).json({ success: true, data: resources });
    } 
    else if (req.method === 'POST') {
      // Create a new resource
      const { resource_name, resource_code, status } = req.body;

      if (!resource_name || !resource_name.trim()) {
        return res.status(400).json({ 
          success: false, 
          message: 'Resource name is required' 
        });
      }

      if (!resource_code || !resource_code.trim()) {
        return res.status(400).json({ 
          success: false, 
          message: 'Resource code is required' 
        });
      }

      // Check if resource already exists
      const checkSql = `SELECT resource_id FROM resources WHERE resource_name = ?`;
      const [existing] = await query(checkSql, [resource_name.trim()]);

      if ((existing as any[]).length > 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Resource with this name already exists' 
        });
      }

      const insertSql = `
        INSERT INTO resources (resource_name, resource_code, status, createdAt, updatedAt) 
        VALUES (?, ?, ?, NOW(), NOW())
      `;

      const [result] = await query(insertSql, [
        resource_name.trim(),
        resource_code.trim(),
        status || 'Active'
      ]);

      return res.status(201).json({ 
        success: true, 
        message: 'Resource created successfully',
        data: { resource_id: (result as any).insertId }
      });
    }
    else if (req.method === 'PUT') {
      // Update a resource
      const { resource_id, resource_name, status } = req.body;

      if (!resource_id) {
        return res.status(400).json({ success: false, message: 'Resource ID is required' });
      }

      const updateSql = `
        UPDATE resources 
        SET resource_name = ?, status = ?, updatedAt = NOW()
        WHERE resource_id = ?
      `;

      await query(updateSql, [resource_name, status, resource_id]);

      return res.status(200).json({ success: true, message: 'Resource updated successfully' });
    }
    else if (req.method === 'DELETE') {
      const { resource_id } = req.body;

      if (!resource_id) {
        return res.status(400).json({ success: false, message: 'Resource ID is required' });
      }

      // Check if resource is used in any role_privileges
      const checkSql = `SELECT COUNT(*) as count FROM role_privileges WHERE resource_id = ?`;
      const [checkResult] = await query(checkSql, [resource_id]);
      
      if ((checkResult as any[])[0].count > 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Cannot delete resource. It is being used in role privileges.' 
        });
      }

      const deleteSql = `DELETE FROM resources WHERE resource_id = ?`;
      await query(deleteSql, [resource_id]);

      return res.status(200).json({ success: true, message: 'Resource deleted successfully' });
    }
    else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Resources API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Internal server error' 
    });
  }
}
