import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Mock courses data
      const courses = [
        {
          id: 1,
          title: 'Advanced Cardiology',
          cover: '/images/courses/cardiology.jpg',
          rating: 4.8,
          ratingCount: 245,
          category: 'Medicine',
          subcategory: 'Cardiology'
        },
        {
          id: 2,
          title: 'Pediatric Care Essentials',
          cover: '/images/courses/pediatrics.jpg',
          rating: 4.9,
          ratingCount: 189,
          category: 'Medicine',
          subcategory: 'Pediatrics'
        },
        {
          id: 3,
          title: 'Orthopedic Surgery Techniques',
          cover: '/images/courses/orthopedics.jpg',
          rating: 4.7,
          ratingCount: 156,
          category: 'Surgery',
          subcategory: 'Orthopedics'
        },
        {
          id: 4,
          title: 'Emergency Medicine Protocols',
          cover: '/images/courses/emergency.jpg',
          rating: 4.6,
          ratingCount: 298,
          category: 'Medicine',
          subcategory: 'Emergency Medicine'
        },
        {
          id: 5,
          title: 'Dental Implant Procedures',
          cover: '/images/courses/dental.jpg',
          rating: 4.8,
          ratingCount: 134,
          category: 'Dentistry',
          subcategory: 'Oral Surgery'
        },
        {
          id: 6,
          title: 'Nursing Fundamentals',
          cover: '/images/courses/nursing.jpg',
          rating: 4.9,
          ratingCount: 412,
          category: 'Nursing',
          subcategory: 'General Nursing'
        }
      ]
      
      return res.status(200).json(courses)
    }

    if (req.method === 'POST') {
      const { title, cover, rating, ratingCount, category, subcategory } = req.body || {}
      if (!title || !cover || !category || !subcategory) return res.status(400).json({ message: 'Missing required fields' })
      
      // Mock response for POST requests
      return res.status(201).json({ 
        id: Math.floor(Math.random() * 1000) + 7,
        title,
        cover,
        rating: rating ?? 0,
        ratingCount: ratingCount ?? 0,
        category,
        subcategory
      })
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (err: any) {
    return res.status(500).json({ message: err?.message || 'Server error' })
  }
}


