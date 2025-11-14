import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log('Attempting to fetch slides from database...')
      const result = await query('SELECT * FROM hero_slides ORDER BY displayOrder ASC, id ASC') as any[]
      
      // Extract only the data rows (first element if it's a nested array)
      const slides = Array.isArray(result[0]) ? result[0] : result
      
      console.log('Slides fetched successfully:', slides)
      
      // Parse the buttons JSON for each slide
      const slidesWithParsedButtons = slides.map((slide: any) => ({
        ...slide,
        buttons: slide.buttons ? JSON.parse(slide.buttons) : []
      }))
      
      res.status(200).json(slidesWithParsedButtons)
    } catch (error) {
      console.error('Database error:', error)
      res.status(500).json({ error: 'Failed to fetch slides', details: (error as Error).message })
    }
  } else if (req.method === 'POST') {
    try {
      const { title, highlightedWord, subtitle, image, buttons, displayOrder, isActive } = req.body
      
      const result = await query(
        'INSERT INTO hero_slides (title, highlightedWord, subtitle, image, buttons, displayOrder, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, highlightedWord, subtitle, image, JSON.stringify(buttons), displayOrder, isActive !== false ? 1 : 0]
      ) as any
      
      // Extract insertId properly from the result
      const insertId = (Array.isArray(result) && result[0]?.insertId) 
        ? result[0].insertId 
        : result.insertId
      
      res.status(201).json({ 
        message: 'Slide created successfully', 
        id: insertId 
      })
    } catch (error) {
      console.error('Database error:', error)
      res.status(500).json({ error: 'Failed to create slide', details: (error as Error).message })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}