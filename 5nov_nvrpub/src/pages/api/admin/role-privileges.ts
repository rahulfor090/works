import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { role_id } = req.query;

      // Always fetch all active resources
      const resourcesSql = `SELECT resource_id, resource_name FROM resources WHERE status = 'Active' ORDER BY resource_name ASC`;
      const [resources] = await query(resourcesSql);

      if (role_id) {
        // Fetch privileges for a specific role
        const privilegesSql = `
          SELECT 
            rp.privilege_id,
            rp.resource_id,
            rp.can_view,
            rp.can_add,
            rp.can_edit,
            rp.can_delete
          FROM role_privileges rp
          WHERE rp.role_id = ?
        `;
        
        const [privileges] = await query(privilegesSql, [role_id]);
        
        // Create a map of privileges by resource_id
        const privilegeMap = new Map();
        (privileges as any[]).forEach((p: any) => {
          privilegeMap.set(p.resource_id, p);
        });

        // Combine resources with their privileges
        const result = (resources as any[]).map((resource: any) => {
          const privilege = privilegeMap.get(resource.resource_id);
          return {
            resource_id: resource.resource_id,
            resource_name: resource.resource_name,
            privilege_id: privilege?.privilege_id || null,
            can_view: privilege ? Boolean(privilege.can_view) : false,
            can_add: privilege ? Boolean(privilege.can_add) : false,
            can_edit: privilege ? Boolean(privilege.can_edit) : false,
            can_delete: privilege ? Boolean(privilege.can_delete) : false,
          };
        });

        return res.status(200).json({ success: true, data: result });
      } else {
        // No role selected - return all resources with no privileges set
        const result = (resources as any[]).map((resource: any) => ({
          resource_id: resource.resource_id,
          resource_name: resource.resource_name,
          privilege_id: null,
          can_view: false,
          can_add: false,
          can_edit: false,
          can_delete: false,
        }));

        return res.status(200).json({ success: true, data: result });
      }
    } 
    else if (req.method === 'POST') {
      // Create or update privileges for a role
      const { role_id, privileges } = req.body;

      if (!role_id || !privileges || !Array.isArray(privileges)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Role ID and privileges array are required' 
        });
      }

      // Delete existing privileges for this role
      await query('DELETE FROM role_privileges WHERE role_id = ?', [role_id]);

      // Insert new privileges (only for resources with at least one permission)
      for (const privilege of privileges) {
        // Only insert if at least one permission is granted
        if (privilege.can_view || privilege.can_add || privilege.can_edit || privilege.can_delete) {
          const insertSql = `
            INSERT INTO role_privileges (
              role_id,
              resource_id,
              can_view,
              can_add,
              can_edit,
              can_delete,
              createdAt,
              updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
          `;

          await query(insertSql, [
            role_id,
            privilege.resource_id,
            privilege.can_view ? 1 : 0,
            privilege.can_add ? 1 : 0,
            privilege.can_edit ? 1 : 0,
            privilege.can_delete ? 1 : 0
          ]);
        }
      }

      return res.status(201).json({ 
        success: true, 
        message: 'Role privileges saved successfully'
      });
    }
    else if (req.method === 'DELETE') {
      const { privilege_id } = req.body;

      if (!privilege_id) {
        return res.status(400).json({ success: false, message: 'Privilege ID is required' });
      }

      const deleteSql = `DELETE FROM role_privileges WHERE privilege_id = ?`;
      await query(deleteSql, [privilege_id]);

      return res.status(200).json({ success: true, message: 'Privilege deleted successfully' });
    }
    else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Role Privileges API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Internal server error' 
    });
  }
}
