import type { NextApiRequest, NextApiResponse } from 'next'
import { MentorRecord, readMentors, writeMentors } from '@/utils/mentors-store'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const mentors = readMentors()
      return res.status(200).json(mentors)
    } catch (error: any) {
      console.error('Mentors API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  if (req.method === 'POST') {
    try {
      const mentors = readMentors()
      const newMentor: MentorRecord = {
        id: Math.max(...mentors.map(m => m.id), 0) + 1,
        ...req.body,
      }
      mentors.push(newMentor)
      writeMentors(mentors)
      return res.status(201).json(newMentor)
    } catch (error: any) {
      console.error('Mentors POST API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
