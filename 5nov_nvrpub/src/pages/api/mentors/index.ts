import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Mock mentors data
      const mentors = [
        {
          id: 1,
          name: 'Dr. Rajesh Kumar',
          photo: '/images/mentors/christian-buehner-DItYlc26zVI-unsplash.jpg',
          category: 'Cardiology',
          description: 'Leading cardiologist with 15+ years of experience in interventional cardiology and medical education.',
          companyName: 'AIIMS Delhi',
          companyLogo: '/images/companies/google.png',
          displayOrder: 1
        },
        {
          id: 2,
          name: 'Dr. Priya Sharma',
          photo: '/images/mentors/jonas-kakaroto-KIPqvvTOC1s-unsplash.jpg',
          category: 'Pediatrics',
          description: 'Renowned pediatrician specializing in neonatal care and child development with extensive teaching experience.',
          companyName: 'Safdarjung Hospital',
          companyLogo: '/images/companies/microsoft.png',
          displayOrder: 2
        },
        {
          id: 3,
          name: 'Dr. Amit Patel',
          photo: '/images/mentors/noah-buscher-8A7fD6Y5VF8-unsplash.jpg',
          category: 'Orthopedics',
          description: 'Expert orthopedic surgeon with specialization in joint replacement and sports medicine.',
          companyName: 'Fortis Healthcare',
          companyLogo: '/images/companies/airbnb.png',
          displayOrder: 3
        },
        {
          id: 4,
          name: 'Dr. Sunita Gupta',
          photo: '/images/mentors/philip-martin-5aGUyCW_PJw-unsplash.jpg',
          category: 'Gynecology',
          description: 'Senior gynecologist and obstetrician with expertise in high-risk pregnancies and minimally invasive surgery.',
          companyName: 'Max Healthcare',
          companyLogo: '/images/companies/grab.png',
          displayOrder: 4
        }
      ]

      return res.status(200).json(mentors)
    } catch (error: any) {
      console.error('Mentors API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, photo, category, description, companyName, companyLogo, displayOrder = 0 } = req.body

      if (!name || !category) {
        return res.status(400).json({ message: 'Name and category are required' })
      }

      // Mock response for POST requests
      return res.status(201).json({ 
        id: Math.floor(Math.random() * 1000) + 5,
        name,
        photo: photo || '/images/mentors/default.jpg',
        category,
        description: description || '',
        companyName: companyName || '',
        companyLogo: companyLogo || '',
        displayOrder
      })
    } catch (error: any) {
      console.error('Mentors POST API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}