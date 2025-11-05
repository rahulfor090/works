import type { NextApiRequest, NextApiResponse } from 'next'
import { data as popularCourseData } from '@/components/home/popular-course.data'
import { Course } from '@/interfaces/course'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { q: query, type } = req.query

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ message: 'Query parameter is required' })
  }

  try {
    let filteredResults = popularCourseData

    // Filter by content type if specified
    if (type && type !== 'all') {
      const contentTypeMap: { [key: string]: string } = {
        books: 'books',
        journals: 'journals',
        videos: 'videos',
        cases: 'cases',
        mcqs: 'mcqs',
        reviews: 'reviews',
      }

      const contentType = contentTypeMap[type as string]
      if (contentType) {
        filteredResults = filteredResults.filter(
          (item: Course) => item.contenttype === contentType
        )
      }
    }

    // Filter by search query (case-insensitive search in title)
    const searchQuery = query.toLowerCase().trim()
    if (searchQuery) {
      filteredResults = filteredResults.filter((item: Course) => {
        const titleMatch = item.title?.toLowerCase().includes(searchQuery)
        
        return titleMatch
      })
    }

    // Sort results by relevance (title matches first)
    filteredResults.sort((a: Course, b: Course) => {
      const aTitle = a.title?.toLowerCase() || ''
      const bTitle = b.title?.toLowerCase() || ''
      
      const aTitleMatch = aTitle.includes(searchQuery)
      const bTitleMatch = bTitle.includes(searchQuery)
      
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1
      
      return 0
    })

    // Transform Course data to Content format for compatibility
    const transformedResults = filteredResults.map((course: Course) => ({
      id: course.id,
      title: course.title,
      coverImage: course.cover || '/images/default-cover.jpg',
      description: `${course.contenttype} content`,
      author: 'Jaypee Digital',
      detailsHtml: `<p>${course.title}</p>`,
      rating: course.rating,
      displayOrder: 0,
      contentTypeId: getContentTypeId(course.contenttype),
      subjectcategoryId: getSubjectCategoryId(course.subjectcategory),
      ishomepage: 1,
      // Legacy fields for backward compatibility
      cover: course.cover,
      ratingCount: course.ratingCount,
      contenttype: course.contenttype,
      subjectcategory: course.subjectcategory,
    }))

    res.status(200).json(transformedResults)
  } catch (error) {
    console.error('Search API error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

function getContentTypeId(contenttype: string): number {
  const typeMap: { [key: string]: number } = {
    books: 1,
    journals: 2,
    videos: 3,
    cases: 4,
    mcqs: 5,
    reviews: 6,
  }
  return typeMap[contenttype] || 1
}

function getSubjectCategoryId(subjectcategory: string): number {
  const categoryMap: { [key: string]: number } = {
    medicine: 1,
    dentistry: 2,
    nursing: 3,
  }
  return categoryMap[subjectcategory] || 1
}