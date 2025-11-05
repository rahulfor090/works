import React, { ReactNode } from 'react'
import ArtTrackIcon from '@mui/icons-material/ArtTrack'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import type { Content } from '@/interfaces/content'
import type { Testimonial } from '@/interfaces/testimonial'

// Hero Section Data
export const heroData = {
  slides: [
    {
      id: 1,
      title: 'Explore',
      highlightedWord: 'Health Science',
      subtitle: 'with Jaypee Digital',
      image: '/images/home-hero.jpg',
      displayOrder: 1,
      buttons: [
        { label: 'Medicine', variant: 'contained' as const, scrollTo: 'popular-content' },
    { label: 'Dentistry', variant: 'contained' as const, scrollTo: 'popular-content' },
    { label: 'Nursing', variant: 'contained' as const, scrollTo: 'popular-content' },
        { label: 'Watch Video', variant: 'outlined' as const, icon: true, scrollTo: 'video-section' }
      ]
    },
    {
      id: 2,
      title: 'Discover',
      highlightedWord: 'Medical Excellence',
      subtitle: 'through Digital Learning',
      image: '/images/home-hero.jpg',
      displayOrder: 2,
      buttons: [
        { label: 'Medicine', variant: 'contained' as const, scrollTo: 'popular-content' },
        { label: 'Dentistry', variant: 'contained' as const, scrollTo: 'popular-content' },
        { label: 'Nursing', variant: 'contained' as const, scrollTo: 'popular-content' },
        { label: 'Watch Video', variant: 'outlined' as const, icon: true, scrollTo: 'video-section' }
      ]
    }
  ],
  stats: [
    { label: 'Books', value: '25+' },
    { label: 'Medical Publications', value: '10,000+' },
    { label: 'Students Worldwide', value: '500,000+' },
    { label: 'Countries Served', value: '150+' }
  ]
}

// Features Data
interface FeatureData {
  id?: number
  title: string
  description: string
  icon?: ReactNode | string
  displayOrder?: number
}

export const featuresData: FeatureData[] = [
  {
    id: 1,
    title: 'Comprehensive Medical Library',
    description: 'Access thousands of medical books, journals, and research papers from leading publishers and institutions.',
    icon: <LocalLibraryIcon />,
    displayOrder: 1
  },
  {
    id: 2,
    title: 'Interactive Learning Tools',
    description: 'Engage with interactive case studies, simulations, and multimedia content designed for medical education.',
    icon: <ArtTrackIcon />,
    displayOrder: 2
  },
  {
    id: 3,
    title: 'Expert-Led Video Content',
    description: 'Learn from renowned medical professionals through high-quality video lectures and demonstrations.',
    icon: <AttachMoneyIcon />,
    displayOrder: 3
  },
  {
    id: 4,
    title: 'Practice MCQs & Assessments',
    description: 'Test your knowledge with thousands of multiple-choice questions and comprehensive assessments.',
    icon: <ContactSupportIcon />,
    displayOrder: 4
  },
  {
    id: 5,
    title: 'Clinical Case Studies',
    description: 'Explore real-world clinical scenarios and develop critical thinking skills through case-based learning.',
    icon: <LocalLibraryIcon />,
    displayOrder: 5
  },
  {
    id: 6,
    title: 'Mobile Platform',
    description: 'Access your medical education content anywhere, anytime with our responsive mobile platform.',
    icon: <ArtTrackIcon />,
    displayOrder: 6
  }
]

// Homepage Slides Data (NEW - matching homepage_slides table schema)
export const homepageSlidesData = [
  {
    id: 1,
    title: 'Welcome to',
    highlightedWord: 'JayPee Digital',
    subtitle: 'Your gateway to digital learning and medical excellence',
    image: '/images/slide1.jpg',
    sortOrder: 1,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Discover',
    highlightedWord: 'Innovation',
    subtitle: 'Cutting-edge courses and resources for modern learners',
    image: '/images/slide2.jpg',
    sortOrder: 2,
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: 3,
    title: 'Master',
    highlightedWord: 'Medical Science',
    subtitle: 'Comprehensive learning platform for healthcare professionals',
    image: '/images/slide3.jpg',
    sortOrder: 3,
    createdAt: '2024-01-17T10:00:00Z'
  }
]

// Testimonials Data (UPDATED - matching testimonials table schema)
export const testimonialsData = [
  {
    id: 1,
    title: 'Excellent Learning Platform',
    content: 'Jaypee Digital has transformed my medical education journey. The comprehensive resources and interactive content make learning engaging and effective.',
    userName: 'Dr. Sarah Johnson',
    professional: 'Medical Student',
    photo: '/images/avatars/1.jpg',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Outstanding Medical Resources',
    content: 'The quality of medical content and the user-friendly interface make this platform indispensable for medical professionals and students alike.',
    userName: 'Dr. Michael Chen',
    professional: 'Resident Doctor',
    photo: '/images/avatars/2.jpg',
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: 3,
    title: 'Comprehensive Study Material',
    content: 'From textbooks to clinical cases, Jaypee Digital provides everything needed for medical education in one convenient platform.',
    userName: 'Dr. Emily Rodriguez',
    professional: 'Medical Educator',
    photo: '/images/avatars/3.jpg',
    createdAt: '2024-01-17T10:00:00Z'
  },
  {
    id: 4,
    title: 'Innovative Teaching Methods',
    content: 'The interactive simulations and case studies have revolutionized how I approach medical education and patient care.',
    userName: 'Dr. James Wilson',
    professional: 'Clinical Professor',
    photo: '/images/avatars/4.jpg',
    createdAt: '2024-01-18T10:00:00Z'
  },
  {
    id: 5,
    title: 'Global Medical Community',
    content: 'Connecting with medical professionals worldwide through this platform has enriched my understanding of global healthcare practices.',
    userName: 'Dr. Maria Santos',
    professional: 'International Health Specialist',
    photo: '/images/avatars/5.jpg',
    createdAt: '2024-01-19T10:00:00Z'
  }
]

// Contents Data (UPDATED - matching contents table schema)
export const contentsData = [
  {
    id: 1,
    title: 'Introduction to Medicine',
    coverImage: '/images/course1.jpg',
    description: 'A comprehensive introduction to medical fundamentals covering anatomy, physiology, and basic medical principles.',
    author: 'Dr. Sarah Johnson',
    detailsHtml: '<p>This comprehensive course covers the fundamental principles of medicine...</p>',
    rating: 4.8,
    displayOrder: 1,
    contentTypeId: 1,
    subjectcategoryId: 1,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Advanced Surgical Techniques',
    coverImage: '/images/course2.jpg',
    description: 'Master advanced surgical procedures and techniques with expert guidance and hands-on practice.',
    author: 'Dr. Michael Chen',
    detailsHtml: '<p>Learn advanced surgical techniques from experienced surgeons...</p>',
    rating: 4.9,
    displayOrder: 2,
    contentTypeId: 2,
    subjectcategoryId: 3,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 3,
    title: 'Pediatric Care Essentials',
    coverImage: '/images/course3.jpg',
    description: 'Essential knowledge for pediatric healthcare covering child development and common conditions.',
    author: 'Dr. Emily Rodriguez',
    detailsHtml: '<p>Comprehensive pediatric care training for healthcare professionals...</p>',
    rating: 4.7,
    displayOrder: 3,
    contentTypeId: 3,
    subjectcategoryId: 5,
    createdAt: '2024-01-05T10:00:00Z'
  },
  {
    id: 4,
    title: 'Cardiology Fundamentals',
    coverImage: '/images/course4.jpg',
    description: 'Understanding heart conditions and treatments with detailed case studies and practical applications.',
    author: 'Dr. Robert Kim',
    detailsHtml: '<p>Master the fundamentals of cardiology with expert instruction...</p>',
    rating: 4.8,
    displayOrder: 4,
    contentTypeId: 4,
    subjectcategoryId: 1,
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 5,
    title: 'Dental Practice Management',
    coverImage: '/images/course5.jpg',
    description: 'Comprehensive dental care and practice management for modern dental professionals.',
    author: 'Dr. Lisa Wang',
    detailsHtml: '<p>Learn effective dental practice management strategies...</p>',
    rating: 4.6,
    displayOrder: 5,
    contentTypeId: 5,
    subjectcategoryId: 1,
    createdAt: '2023-12-28T10:00:00Z'
  }
]

// Mentors Data
export const mentorsData = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    specialty: 'Cardiology',
    experience: '15 years',
    photo: '/images/avatars/1.jpg',
    companyLogo: '/images/avatars/1.jpg',
    hospital: 'AIIMS Delhi',
    achievements: ['Published 50+ research papers', 'International speaker', 'Award-winning cardiologist']
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    specialty: 'Pediatrics',
    experience: '12 years',
    photo: '/images/avatars/2.jpg',
    companyLogo: '/images/avatars/2.jpg',
    hospital: 'Safdarjung Hospital',
    achievements: ['Child health advocate', 'Research in pediatric care', 'Medical education expert']
  },
  {
    id: 3,
    name: 'Dr. Amit Patel',
    specialty: 'Orthopedics',
    experience: '18 years',
    photo: '/images/avatars/3.jpg',
    companyLogo: '/images/avatars/3.jpg',
    hospital: 'Fortis Healthcare',
    achievements: ['Joint replacement specialist', 'Sports medicine expert', 'Minimally invasive surgery pioneer']
  },
  {
    id: 4,
    name: 'Dr. Sunita Verma',
    specialty: 'Gynecology',
    experience: '20 years',
    photo: '/images/avatars/4.jpg',
    companyLogo: '/images/avatars/4.jpg',
    hospital: 'Max Healthcare',
    achievements: ['Women\'s health advocate', 'Laparoscopic surgery expert', 'Medical researcher']
  }
]

// Content Types Data (UPDATED - matching contenttype table schema)
export const contenttypesData = [
  { 
    id: 1, 
    title: 'Medicine', 
    description: 'General medical contents and educational resources', 
    icon: 'LocalLibraryIcon', 
    displayOrder: 1, 
    ishomepage: 1, 
    isActive: 1,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  { 
    id: 2, 
    title: 'Surgery', 
    description: 'Surgical procedures and techniques', 
    icon: 'LocalHospitalIcon', 
    displayOrder: 2, 
    ishomepage: 1, 
    isActive: 1,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  { 
    id: 3, 
    title: 'Pediatrics', 
    description: 'Child healthcare and medicine', 
    icon: 'ChildCareIcon', 
    displayOrder: 3, 
    ishomepage: 1, 
    isActive: 1,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  { 
    id: 4, 
    title: 'Cardiology', 
    description: 'Heart and cardiovascular system', 
    icon: 'FavoriteIcon', 
    displayOrder: 4, 
    ishomepage: 1, 
    isActive: 1,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  { 
    id: 5, 
    title: 'Dentistry', 
    description: 'Dental care and oral health', 
    icon: 'LocalHospitalIcon', 
    displayOrder: 5, 
    ishomepage: 0, 
    isActive: 1,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  }
]

// Categories Data (kept for backward compatibility)
export const categoriesData = [
  { id: 1, name: 'Medicine', slug: 'medicine', description: 'General medical contents and content', sortOrder: 1, icon: '', status: 'active' },
  { id: 2, name: 'Surgery', slug: 'surgery', description: 'Surgical procedures and techniques', sortOrder: 2, icon: '', status: 'active' },
  { id: 3, name: 'Pediatrics', slug: 'pediatrics', description: 'Child healthcare and medicine', sortOrder: 3, icon: '', status: 'active' },
  { id: 4, name: 'Cardiology', slug: 'cardiology', description: 'Heart and cardiovascular system', sortOrder: 4, icon: '', status: 'active' },
  { id: 5, name: 'Dentistry', slug: 'dentistry', description: 'Dental care and oral health', sortOrder: 5, icon: '', status: 'active' }
]

// Subject Categories Data (UPDATED - matching subjectcategory table schema)
export const subjectcategoriesData = [
  { 
    id: 1, 
    name: 'Internal Medicine', 
    slug: 'internal-medicine', 
    description: 'Internal medical specialties and general medicine', 
    contentTypeId: 1, 
    sortOrder: 1,
    createdAt: '2024-01-01T10:00:00Z'
  },
  { 
    id: 2, 
    name: 'Emergency Medicine', 
    slug: 'emergency-medicine', 
    description: 'Emergency care protocols and trauma management', 
    contentTypeId: 1, 
    sortOrder: 2,
    createdAt: '2024-01-01T10:00:00Z'
  },
  { 
    id: 3, 
    name: 'General Surgery', 
    slug: 'general-surgery', 
    description: 'General surgical procedures and techniques', 
    contentTypeId: 2, 
    sortOrder: 1,
    createdAt: '2024-01-01T10:00:00Z'
  },
  { 
    id: 4, 
    name: 'Cardiac Surgery', 
    slug: 'cardiac-surgery', 
    description: 'Heart surgery procedures and cardiovascular interventions', 
    contentTypeId: 2, 
    sortOrder: 2,
    createdAt: '2024-01-01T10:00:00Z'
  },
  { 
    id: 5, 
    name: 'Neonatal Care', 
    slug: 'neonatal-care', 
    description: 'Newborn medical care and pediatric specialties', 
    contentTypeId: 3, 
    sortOrder: 1,
    createdAt: '2024-01-01T10:00:00Z'
  }
]

// Subcategories Data (kept for backward compatibility)
export const subcategoriesData = [
  { id: 1, name: 'Internal Medicine', slug: 'internal-medicine', categoryId: 1, description: 'Internal medical specialties', sortOrder: 1 },
  { id: 2, name: 'Emergency Medicine', slug: 'emergency-medicine', categoryId: 1, description: 'Emergency care protocols', sortOrder: 2 },
  { id: 3, name: 'General Surgery', slug: 'general-surgery', categoryId: 2, description: 'General surgical procedures', sortOrder: 1 },
  { id: 4, name: 'Cardiac Surgery', slug: 'cardiac-surgery', categoryId: 2, description: 'Heart surgery procedures', sortOrder: 2 },
  { id: 5, name: 'Neonatal Care', slug: 'neonatal-care', categoryId: 3, description: 'Newborn medical care', sortOrder: 1 }
]

// Specialties Data (for admin panel)
export const specialtiesData = [
  { id: 1, name: 'Cardiology', slug: 'cardiology', description: 'Heart and cardiovascular system', sortOrder: 1, icon: '', status: 'active' },
  { id: 2, name: 'Neurology', slug: 'neurology', description: 'Nervous system and brain', sortOrder: 2, icon: '', status: 'active' },
  { id: 3, name: 'Orthopedics', slug: 'orthopedics', description: 'Bones and musculoskeletal system', sortOrder: 3, icon: '', status: 'active' },
  { id: 4, name: 'Dermatology', slug: 'dermatology', description: 'Skin and related conditions', sortOrder: 4, icon: '', status: 'active' },
  { id: 5, name: 'Psychiatry', slug: 'psychiatry', description: 'Mental health and disorders', sortOrder: 5, icon: '', status: 'active' }
]