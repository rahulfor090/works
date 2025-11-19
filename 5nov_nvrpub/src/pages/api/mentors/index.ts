import type { NextApiRequest, NextApiResponse } from 'next'
import { readMentors } from '@/utils/mentors-store'

interface MentorStat {
  label: string
  value: number
  suffix?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const mentors = readMentors()
      .filter(mentor => mentor.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder)

    const stats: MentorStat[] = buildStats(mentors)

    return res.status(200).json({ mentors, stats })
  } catch (error: any) {
    console.error('Mentors API error:', error)
    return res.status(500).json({ message: error?.message || 'Server error' })
  }
}

const buildStats = (mentors: ReturnType<typeof readMentors>): MentorStat[] => {
  const specialtyCount = new Set(mentors.map(m => m.category)).size
  const institutionCount = new Set(mentors.map(m => m.hospital || m.companyName)).size

  return [
    { label: 'Active Mentors', value: mentors.length, suffix: '+' },
    { label: 'Specialties', value: specialtyCount, suffix: '+' },
    { label: 'Institutions', value: institutionCount, suffix: '+' },
  ]
}