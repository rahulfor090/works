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
  return []
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
  const { id } = req.query

  if (req.method === 'PUT') {
    try {
      const ratings = getRatings()
      const ratingIndex = ratings.findIndex(r => r.id === parseInt(id as string))

      if (ratingIndex === -1) {
        return res.status(404).json({ message: 'Rating not found' })
      }

      ratings[ratingIndex] = {
        ...ratings[ratingIndex],
        ...req.body,
        id: ratings[ratingIndex].id,
      }

      saveRatings(ratings)
      return res.status(200).json(ratings[ratingIndex])
    } catch (error: any) {
      console.error('Ratings PUT API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const ratings = getRatings()
      const filteredRatings = ratings.filter(r => r.id !== parseInt(id as string))

      if (filteredRatings.length === ratings.length) {
        return res.status(404).json({ message: 'Rating not found' })
      }

      saveRatings(filteredRatings)
      return res.status(200).json({ message: 'Rating deleted successfully' })
    } catch (error: any) {
      console.error('Ratings DELETE API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
