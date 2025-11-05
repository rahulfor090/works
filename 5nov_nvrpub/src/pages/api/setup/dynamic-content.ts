import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // Create hero_slides table
    await query(`
      CREATE TABLE IF NOT EXISTS hero_slides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        highlightedWord VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255) NOT NULL,
        image VARCHAR(512) NOT NULL,
        buttons JSON NOT NULL,
        displayOrder INT NOT NULL DEFAULT 0,
        isActive BOOLEAN NOT NULL DEFAULT 1,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create hero_stats table
    await query(`
      CREATE TABLE IF NOT EXISTS hero_stats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        label VARCHAR(100) NOT NULL,
        value VARCHAR(50) NOT NULL,
        displayOrder INT NOT NULL DEFAULT 0,
        isActive BOOLEAN NOT NULL DEFAULT 1,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create features table
    await query(`
      CREATE TABLE IF NOT EXISTS features (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(100) NOT NULL DEFAULT 'LocalLibraryIcon',
        displayOrder INT NOT NULL DEFAULT 0,
        isActive BOOLEAN NOT NULL DEFAULT 1,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create mentors table
    await query(`
      CREATE TABLE IF NOT EXISTS mentors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        photo VARCHAR(512),
        category VARCHAR(255) NOT NULL,
        description TEXT,
        companyName VARCHAR(255),
        companyLogo VARCHAR(512),
        displayOrder INT NOT NULL DEFAULT 0,
        isActive BOOLEAN NOT NULL DEFAULT 1,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Check if data already exists
    const [heroSlides] = await query('SELECT COUNT(*) as count FROM hero_slides')
    const [heroStats] = await query('SELECT COUNT(*) as count FROM hero_stats')
    const [features] = await query('SELECT COUNT(*) as count FROM features')
    const [mentors] = await query('SELECT COUNT(*) as count FROM mentors')

    console.log('Database counts:', { 
      heroSlides: heroSlides[0]?.count || 0, 
      heroStats: heroStats[0]?.count || 0, 
      features: features[0]?.count || 0, 
      mentors: mentors[0]?.count || 0 
    })

    let insertedRecords = 0

    // Insert hero slides if empty
    if ((heroSlides[0]?.count || 0) === 0) {
      const heroSlidesData = [
        {
          title: 'Explore',
          highlightedWord: 'Health Science',
          subtitle: 'with Jaypee Digital',
          image: '/images/home-hero.jpg',
          buttons: JSON.stringify([
            { label: 'Medicine', variant: 'contained', scrollTo: 'popular-course' },
            { label: 'Dentistry', variant: 'contained', scrollTo: 'popular-course' },
            { label: 'Nursing', variant: 'contained', scrollTo: 'popular-course' },
            { label: 'Watch Video', variant: 'outlined', icon: true, scrollTo: 'video-section' }
          ]),
          displayOrder: 1
        },
        {
          title: 'Discover',
          highlightedWord: 'Medical Excellence',
          subtitle: 'through Digital Learning',
          image: '/images/home-hero.jpg',
          buttons: JSON.stringify([
            { label: 'Medicine', variant: 'contained', scrollTo: 'popular-course' },
            { label: 'Dentistry', variant: 'contained', scrollTo: 'popular-course' },
            { label: 'Nursing', variant: 'contained', scrollTo: 'popular-course' },
            { label: 'Watch Video', variant: 'outlined', icon: true, scrollTo: 'video-section' }
          ]),
          displayOrder: 2
        }
      ]

      for (const slide of heroSlidesData) {
        await query(
          'INSERT INTO hero_slides (title, highlightedWord, subtitle, image, buttons, displayOrder) VALUES (?, ?, ?, ?, ?, ?)',
          [slide.title, slide.highlightedWord, slide.subtitle, slide.image, slide.buttons, slide.displayOrder]
        )
        insertedRecords++
      }
    }

    // Insert hero stats if empty
    if ((heroStats[0]?.count || 0) === 0) {
      const statsData = [
        { label: 'Books', value: '4170+', displayOrder: 1 },
        { label: 'Videos', value: '12576+', displayOrder: 2 },
        { label: 'Journals', value: '4170+', displayOrder: 3 },
        { label: 'MCQs', value: '14567+', displayOrder: 4 },
        { label: 'Clinical Cases', value: '3420+', displayOrder: 5 }
      ]

      for (const stat of statsData) {
        await query(
          'INSERT INTO hero_stats (label, value, displayOrder) VALUES (?, ?, ?)',
          [stat.label, stat.value, stat.displayOrder]
        )
        insertedRecords++
      }
    }

    // Insert features if empty
    if ((features[0]?.count || 0) === 0) {
      const featuresData = [
        { title: 'Alternative Medicine', description: 'Comprehensive alternative and complementary medicine resources', icon: 'ArtTrackIcon', displayOrder: 1 },
        { title: 'Biochemistry', description: 'Advanced biochemistry and molecular biology content', icon: 'ScienceIcon', displayOrder: 2 },
        { title: 'Biotechnology', description: 'Cutting-edge biotechnology and genetic engineering', icon: 'LocalLibraryIcon', displayOrder: 3 },
        { title: 'Biophysics', description: 'Physics principles applied to biological systems', icon: 'ContactSupportIcon', displayOrder: 4 }
      ]

      for (const feature of featuresData) {
        await query(
          'INSERT INTO features (title, description, icon, displayOrder) VALUES (?, ?, ?, ?)',
          [feature.title, feature.description, feature.icon, feature.displayOrder]
        )
        insertedRecords++
      }
    }

    // Insert mentors if empty
    if ((mentors[0]?.count || 0) === 0) {
      const mentorsData = [
        {
          name: 'Dr. Sarah Johnson',
          photo: '/images/mentors/christian-buehner-DItYlc26zVI-unsplash.jpg',
          category: 'Cardiology',
          description: 'Leading expert in cardiovascular medicine with over 15 years of experience in clinical practice and research.',
          companyName: 'Mayo Clinic',
          companyLogo: '/images/companies/mayo-clinic.png',
          displayOrder: 1
        },
        {
          name: 'Dr. Michael Chen',
          photo: '/images/mentors/jonas-kakaroto-KIPqvvTOC1s-unsplash.jpg',
          category: 'Neurology',
          description: 'Renowned neurologist specializing in neurodegenerative diseases and advanced brain imaging techniques.',
          companyName: 'Johns Hopkins',
          companyLogo: '/images/companies/johns-hopkins.png',
          displayOrder: 2
        }
      ]

      for (const mentor of mentorsData) {
        await query(
          'INSERT INTO mentors (name, photo, category, description, companyName, companyLogo, displayOrder) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [mentor.name, mentor.photo, mentor.category, mentor.description, mentor.companyName, mentor.companyLogo, mentor.displayOrder]
        )
        insertedRecords++
      }
    }

    return res.status(200).json({
      message: 'Dynamic content database setup completed successfully',
      tablesCreated: 4,
      recordsInserted: insertedRecords
    })

  } catch (error: any) {
    console.error('Setup error:', error)
    return res.status(500).json({ message: error?.message || 'Server error' })
  }
}