import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Permissions {
  [resource: string]: {
    view: boolean
    add: boolean
    edit: boolean
    delete: boolean
  }
}

export const useAuth = () => {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      // Only run on client side
      if (typeof window === 'undefined') return

      // Check if token exists in localStorage
      const token = localStorage.getItem('adminToken')
      
      if (!token) {
        // Redirect to login if no token
        router.replace('/admin/login')
        return
      }
    }

    // Only run auth check if we're not already on the login page and router is ready
    if (router.isReady && router.pathname !== '/admin/login') {
      checkAuth()
    }
  }, [router.isReady, router.pathname])
}

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<Permissions>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        console.log('Fetching permissions with token:', token ? 'Token exists' : 'No token')
        
        const response = await fetch('/api/admin/permissions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        
        console.log('Permissions API response:', data)
        
        if (data.success) {
          console.log('Setting permissions:', data.permissions)
          setPermissions(data.permissions)
        } else {
          console.error('Permissions API failed:', data.message)
        }
      } catch (error) {
        console.error('Failed to fetch permissions:', error)
      } finally {
        setLoading(false)
      }
    }

    if (typeof window !== 'undefined') {
      fetchPermissions()
    }
  }, [])

  return { permissions, loading }
}

export const hasPermission = (permissions: Permissions, resource: string, action: 'view' | 'add' | 'edit' | 'delete'): boolean => {
  // Try exact match, uppercase, lowercase
  const resourcePerms = permissions[resource] || 
                        permissions[resource.toUpperCase()] || 
                        permissions[resource.toLowerCase()]
  
  const hasAccess = resourcePerms ? resourcePerms[action] : false
  
  // Debug logging
  if (resource === 'Chapter' || resource.includes('chapter') || resource.includes('CHAPTER')) {
    console.log(`Permission check: ${resource}.${action} = ${hasAccess}`, resourcePerms)
  }
  
  return hasAccess
}

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem('adminToken')
  return !!token
}

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken')
    // Clear cookie by calling logout API
    fetch('/api/auth/logout', { method: 'POST' })
  }
}
