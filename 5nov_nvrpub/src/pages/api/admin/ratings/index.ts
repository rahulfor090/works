import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const ratingsFile = path.join(process.cwd(), 'src/data/mentor-ratings.json')

interface MentorRating {
  id: number | string
  mentorId: number
  mentorName: string
  rating: number
  reviewCount: number
  filledStars: number
  isActive: boolean
}

const getRatings = (): MentorRating[] => {
  try {
    if (fs.existsSync(ratingsFile)) {
      const data = fs.readFileSync(ratingsFile, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading ratings:', error)
  }

  // Return default ratings if file doesn't exist
  return [
    {
      id: 1,
      mentorId: 1,
      mentorName: 'Dr. Rajesh Kumar',
      rating: 4.8,
      reviewCount: 145,
      filledStars: 5,
      isActive: true,
    },
    {
      id: 2,
      mentorId: 2,
      mentorName: 'Dr. Priya Sharma',
      rating: 4.9,
      reviewCount: 180,
      filledStars: 5,
      isActive: true,
    },
    {
      id: 3,
      mentorId: 3,
      mentorName: 'Dr. Amit Patel',
      rating: 4.7,
      reviewCount: 120,
      filledStars: 5,
      isActive: true,
    },
    {
      id: 4,
      mentorId: 4,
      mentorName: 'Dr. Sunita Gupta',
      rating: 4.8,
      reviewCount: 165,
      filledStars: 5,
      isActive: true,
    },
  ]
}

const saveRatings = (ratings: MentorRating[]): void => {
  try {
    fs.writeFileSync(ratingsFile, JSON.stringify(ratings, null, 2))
  } catch (error) {
    console.error('Error saving ratings:', error)
    throw error
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const ratings = getRatings()
      return res.status(200).json(ratings)
    } catch (error: any) {
      console.error('Ratings API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  if (req.method === 'POST') {
    try {
      const ratings = getRatings()
      const newRating: MentorRating = {
        id: Math.max(...ratings.map(r => (typeof r.id === 'number' ? r.id : 0)), 0) + 1,
        ...req.body,
      }
      ratings.push(newRating)
      saveRatings(ratings)
      return res.status(201).json(newRating)
    } catch (error: any) {
      console.error('Ratings POST API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
