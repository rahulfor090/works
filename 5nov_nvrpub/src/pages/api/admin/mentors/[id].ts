import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const mentorsFile = path.join(process.cwd(), 'src/data/mentors-management.json')

interface Mentor {
  id: number
  name: string
  photo: string
  category: string
  specialty: string
  description: string
  companyName: string
  hospital: string
  companyLogo: string
  displayOrder: number
  isActive: boolean
}

const getMentors = (): Mentor[] => {
  try {
    if (fs.existsSync(mentorsFile)) {
      const data = fs.readFileSync(mentorsFile, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading mentors:', error)
  }
  return []
}

const saveMentors = (mentors: Mentor[]): void => {
  try {
    fs.writeFileSync(mentorsFile, JSON.stringify(mentors, null, 2))
  } catch (error) {
    console.error('Error saving mentors:', error)
    throw error
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'PUT') {
    try {
      const mentors = getMentors()
      const mentorIndex = mentors.findIndex(m => m.id === parseInt(id as string))

      if (mentorIndex === -1) {
        return res.status(404).json({ message: 'Mentor not found' })
      }

      mentors[mentorIndex] = {
        ...mentors[mentorIndex],
        ...req.body,
        id: mentors[mentorIndex].id,
      }

      saveMentors(mentors)
      return res.status(200).json(mentors[mentorIndex])
    } catch (error: any) {
      console.error('Mentors PUT API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const mentors = getMentors()
      const filteredMentors = mentors.filter(m => m.id !== parseInt(id as string))

      if (filteredMentors.length === mentors.length) {
        return res.status(404).json({ message: 'Mentor not found' })
      }

      saveMentors(filteredMentors)
      return res.status(200).json({ message: 'Mentor deleted successfully' })
    } catch (error: any) {
      console.error('Mentors DELETE API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
