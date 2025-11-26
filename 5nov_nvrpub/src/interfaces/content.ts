export interface Content {
  id?: number
  isbn?: string
  title: string
  coverImage: string
  description: string
  author: string
  authors?: string
  detailsHtml: string
  rating: number
  displayOrder: number
  contentTypeId: number
  subjectcategoryId: number
  subject?: string
  ishomepage?: number
  createdAt?: string

  // Legacy fields for backward compatibility
  cover?: string
  ratingCount?: number
  contenttype?: string
  subjectcategory?: string
  image?: string
  price?: number
  originalPrice?: number
  students?: number
  duration?: string
  level?: string
  instructor?: string
  specialtyId?: number
  status?: string
  order?: number
  categoryId?: number
  [key: string]: any; // Add an index signature to allow arbitrary properties
}
