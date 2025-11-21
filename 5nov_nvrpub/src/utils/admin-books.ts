import { RowDataPacket } from 'mysql2'

export const DEFAULT_BOOK_COVER = '/images/courses/JMEDS_Cover.jpeg'
export const DEFAULT_BOOK_AUTHOR = 'Editorial Team'
export const DEFAULT_BOOK_CATEGORY = 'General'
export const DEFAULT_ACCESS_TYPE = 'Paid'
const PUBLIC_BOOK_COVER_DIR = '/images/book_covers/'

export interface AdminBookRow extends RowDataPacket {
  id: number
  isbn: string | null
  book_title: string | null
  book_subtitle: string | null
  society: string | null
  author?: string | null
  access_type: string | null
  book_content_type: string | null
  book_cover_image: string | null
  book_overview: string | null
  rating: number | string | null
  status?: string | null
  subject_ids?: string | null
  category_id?: number | null
  category_name?: string | null
  created_date?: string | Date | null
  updated_date?: string | Date | null
}

export interface NormalizedAdminBook {
  id: number
  isbn: string | null
  title: string
  subtitle: string
  author: string
  description: string
  coverImage: string
  rating: number
  ratingCount: number
  contenttype: 'books'
  createdAt: string | null
  subjectcategoryId: number
  subjectcategoryIds: number[]
  category: string
  accessType: string
  contentType: string
  status?: string | null
}

export const normalizeNumber = (value: number | string | null | undefined) => {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return value
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

export const normalizeDate = (value?: string | Date | null) => {
  if (!value) return null
  try {
    return new Date(value).toISOString()
  } catch (error) {
    return null
  }
}

export const parseSubjectIds = (subjectIds?: string | null) => {
  if (!subjectIds) return []
  return subjectIds
    .split(',')
    .map((id) => parseInt(id.trim(), 10))
    .filter((id) => !Number.isNaN(id))
}

export const mapAdminBookRow = (book: AdminBookRow): NormalizedAdminBook => {
  const subjectcategoryIds = parseSubjectIds(book.subject_ids)

  return {
    id: book.id,
    isbn: book.isbn || null,
    title: book.book_title || book.book_subtitle || 'Untitled Book',
    subtitle: book.book_subtitle || '',
    author: book.society || book.author || DEFAULT_BOOK_AUTHOR,
    description: book.book_overview || '',
    coverImage: resolveCoverImage(book.book_cover_image),
    rating: normalizeNumber(book.rating),
    ratingCount: 0,
    contenttype: 'books',
    createdAt: normalizeDate(book.updated_date || book.created_date),
    subjectcategoryId: subjectcategoryIds[0] || 0,
    subjectcategoryIds,
    category: book.category_name || DEFAULT_BOOK_CATEGORY,
    accessType: book.access_type || DEFAULT_ACCESS_TYPE,
    contentType: book.book_content_type || 'Book',
    status: book.status || null,
  }
}

function resolveCoverImage(cover?: string | null) {
  if (!cover) return DEFAULT_BOOK_COVER
  const trimmed = cover.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('//')) {
    return trimmed
  }
  if (trimmed.startsWith('/')) {
    return trimmed
  }
  if (trimmed.toLowerCase().startsWith('images/')) {
    return `/${trimmed.replace(/^\/+/,'')}`
  }
  return `${PUBLIC_BOOK_COVER_DIR}${trimmed}`
}
