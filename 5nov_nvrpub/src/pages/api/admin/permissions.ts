import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  try {
    // Get token from cookie or authorization header
    const token = req.cookies['admin-token'] || req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any
    const userRole = decoded.role

    if (!userRole) {
      return res.status(403).json({ success: false, message: 'No role assigned' })
    }

    // Get role_id from roles table
    const rolesResult = await query(
      `SELECT role_id FROM roles WHERE role_code = ? OR role_name = ? LIMIT 1`,
      [userRole, userRole]
    )
    
    const roles = Array.isArray(rolesResult) ? (Array.isArray(rolesResult[0]) ? rolesResult[0] : rolesResult) : []
    
    if (!roles || roles.length === 0) {
      return res.status(403).json({ success: false, message: 'Role not found' })
    }

    const roleId = roles[0].role_id

    // Get permissions for this role
    const permissionsResult = await query(
      `SELECT 
        r.resource_name,
        r.resource_code,
        rp.can_view,
        rp.can_add,
        rp.can_edit,
        rp.can_delete
      FROM role_privileges rp
      JOIN resources r ON rp.resource_id = r.resource_id
      WHERE rp.role_id = ? AND r.status = 'Active'`,
      [roleId]
    )

    const permissions = Array.isArray(permissionsResult) ? 
      (Array.isArray(permissionsResult[0]) ? permissionsResult[0] : permissionsResult) : []

    // Format permissions into a more usable structure
    const formattedPermissions: Record<string, any> = {}
    
    permissions.forEach((perm: any) => {
      formattedPermissions[perm.resource_code || perm.resource_name] = {
        view: !!perm.can_view,
        add: !!perm.can_add,
        edit: !!perm.can_edit,
        delete: !!perm.can_delete
      }
    })

    return res.status(200).json({
      success: true,
      permissions: formattedPermissions
    })
  } catch (err: any) {
    console.error('Permissions error:', err)
    return res.status(500).json({ success: false, message: err?.message || 'Server error' })
  }
}
