import type { NextApiRequest, NextApiResponse } from 'next'
import { readMentors, writeMentors } from '@/utils/mentors-store'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'PUT') {
    try {
      const mentors = readMentors()
      const mentorIndex = mentors.findIndex(m => m.id === parseInt(id as string))

      if (mentorIndex === -1) {
        return res.status(404).json({ message: 'Mentor not found' })
      }

      mentors[mentorIndex] = {
        ...mentors[mentorIndex],
        ...req.body,
        id: mentors[mentorIndex].id,
      }

      writeMentors(mentors)
      return res.status(200).json(mentors[mentorIndex])
    } catch (error: any) {
      console.error('Mentors PUT API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const mentors = readMentors()
      const filteredMentors = mentors.filter(m => m.id !== parseInt(id as string))

      if (filteredMentors.length === mentors.length) {
        return res.status(404).json({ message: 'Mentor not found' })
      }

      writeMentors(filteredMentors)
      return res.status(200).json({ message: 'Mentor deleted successfully' })
    } catch (error: any) {
      console.error('Mentors DELETE API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
