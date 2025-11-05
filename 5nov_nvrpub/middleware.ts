import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

function unauthorized(req: NextRequest) {
  return NextResponse.redirect(new URL('/admin/login', req.url))
}

export function middleware(req: NextRequest) {
  const { nextUrl, method } = req
  const pathname = nextUrl.pathname

  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login'
  const isCoursesApi = pathname.startsWith('/api/courses')
  const isSpecialtiesApi = pathname.startsWith('/api/specialties')
  const isCategoriesApi = pathname.startsWith('/api/categories')
  const isSubcategoriesApi = pathname.startsWith('/api/subcategories')
  const isContenttypesApi = pathname.startsWith('/api/contenttypes')
  const isSubjectcategoriesApi = pathname.startsWith('/api/subjectcategories')
  const isSettingsApi = pathname.startsWith('/api/settings')
  const isProtectedApi = isCoursesApi || isSpecialtiesApi || isCategoriesApi || isSubcategoriesApi || isContenttypesApi || isSubjectcategoriesApi || isSettingsApi

  // Allow public GET API access; protect mutations and admin pages
  if (!(isAdminPage || isProtectedApi)) return NextResponse.next()
  if (isProtectedApi && method === 'GET') return NextResponse.next()

  // Check for admin token
  const token = req.cookies.get('admin-token')?.value
  
  if (!token) {
    return unauthorized(req)
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    
    if (decoded.role !== 'admin') {
      return unauthorized(req)
    }

    return NextResponse.next()
  } catch {
    return unauthorized(req)
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/courses/:path*', '/api/specialties/:path*', '/api/categories/:path*', '/api/subcategories/:path*', '/api/contenttypes/:path*', '/api/subjectcategories/:path*', '/api/settings/:path*'],
}


