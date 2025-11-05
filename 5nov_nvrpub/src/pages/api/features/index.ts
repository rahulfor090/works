import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Mock features data
      const features = [
        {
          id: 1,
          title: 'Comprehensive Library',
          description: 'Access thousands of medical books, journals, and research papers from leading publishers and institutions.',
          icon: 'library_books',
          displayOrder: 1
        },
        {
          id: 2,
          title: 'Interactive Learning Tools',
          description: 'Engage with interactive case studies, simulations, and multimedia content designed for medical education.',
          icon: 'psychology',
          displayOrder: 2
        },
        {
          id: 3,
          title: 'Expert-Led Video Content',
          description: 'Learn from renowned medical professionals through high-quality video lectures and demonstrations.',
          icon: 'video_library',
          displayOrder: 3
        },
        {
          id: 4,
          title: 'Practice MCQs & Assessments',
          description: 'Test your knowledge with thousands of multiple-choice questions and comprehensive assessments.',
          icon: 'quiz',
          displayOrder: 4
        },
        {
          id: 5,
          title: 'Clinical Case Studies',
          description: 'Explore real-world clinical scenarios and develop critical thinking skills through case-based learning.',
          icon: 'medical_services',
          displayOrder: 5
        },
        {
          id: 6,
          title: 'Mobile Learning Platform',
          description: 'Study anywhere, anytime with our mobile-optimized platform and offline content access.',
          icon: 'phone_android',
          displayOrder: 6
        }
      ]

      return res.status(200).json(features)
    } catch (error: any) {
      console.error('Features API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, description, icon, displayOrder = 0 } = req.body

      if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' })
      }

      // Mock response for POST requests
      return res.status(201).json({ 
        id: Math.floor(Math.random() * 1000) + 7,
        title,
        description,
        icon: icon || 'star',
        displayOrder
      })
    } catch (error: any) {
      console.error('Features POST API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}