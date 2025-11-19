import fs from 'fs'
import path from 'path'

export interface MentorRecord {
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

const mentorsFile = path.join(process.cwd(), 'src/data/mentors-management.json')

const defaultMentors: MentorRecord[] = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    photo: '/images/mentors/christian-buehner-DItYlc26zVI-unsplash.jpg',
    category: 'Cardiology',
    specialty: 'Cardiology',
    description: 'Leading cardiologist with 15+ years of experience in interventional cardiology and medical education.',
    companyName: 'AIIMS Delhi',
    hospital: 'AIIMS Delhi',
    companyLogo: '/images/companies/google.png',
    displayOrder: 1,
    isActive: true
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    photo: '/images/mentors/jonas-kakaroto-KIPqvvTOC1s-unsplash.jpg',
    category: 'Pediatrics',
    specialty: 'Pediatrics',
    description: 'Renowned pediatrician specializing in neonatal care and child development with extensive teaching experience.',
    companyName: 'Safdarjung Hospital',
    hospital: 'Safdarjung Hospital',
    companyLogo: '/images/companies/microsoft.png',
    displayOrder: 2,
    isActive: true
  },
  {
    id: 3,
    name: 'Dr. Amit Patel',
    photo: '/images/mentors/noah-buscher-8A7fD6Y5VF8-unsplash.jpg',
    category: 'Orthopedics',
    specialty: 'Orthopedics',
    description: 'Expert orthopedic surgeon with specialization in joint replacement and sports medicine.',
    companyName: 'Fortis Healthcare',
    hospital: 'Fortis Healthcare',
    companyLogo: '/images/companies/airbnb.png',
    displayOrder: 3,
    isActive: true
  },
  {
    id: 4,
    name: 'Dr. Sunita Gupta',
    photo: '/images/mentors/philip-martin-5aGUyCW_PJw-unsplash.jpg',
    category: 'Gynecology',
    specialty: 'Gynecology',
    description: 'Senior gynecologist and obstetrician with expertise in high-risk pregnancies and minimally invasive surgery.',
    companyName: 'Max Healthcare',
    hospital: 'Max Healthcare',
    companyLogo: '/images/companies/grab.png',
    displayOrder: 4,
    isActive: true
  }
]

export const readMentors = (): MentorRecord[] => {
  try {
    if (fs.existsSync(mentorsFile)) {
      const data = fs.readFileSync(mentorsFile, 'utf-8')
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed)) {
        return parsed as MentorRecord[]
      }
    }
  } catch (error) {
    console.error('Error reading mentors file:', error)
  }
  return defaultMentors
}

export const writeMentors = (mentors: MentorRecord[]): void => {
  try {
    const directory = path.dirname(mentorsFile)
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }
    fs.writeFileSync(mentorsFile, JSON.stringify(mentors, null, 2))
  } catch (error) {
    console.error('Error writing mentors file:', error)
    throw error
  }
}
