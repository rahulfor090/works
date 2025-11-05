export interface Content {
  id?: number
  title: string
  coverImage: string
  description: string
  author: string
  detailsHtml: string
  rating: number
  displayOrder: number
  contentTypeId: number
  subjectcategoryId: number
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
}