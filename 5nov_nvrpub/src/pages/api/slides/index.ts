import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log('Attempting to fetch slides from database...')
      const [slides] = await query('SELECT * FROM hero_slides ORDER BY id ASC') as [any[], any]
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
      const { title, highlightedWord, subtitle, image, buttons, displayOrder } = req.body
      
      const [result] = await query(
        'INSERT INTO hero_slides (title, highlightedWord, subtitle, image, buttons, displayOrder) VALUES (?, ?, ?, ?, ?, ?)',
        [title, highlightedWord, subtitle, image, JSON.stringify(buttons), displayOrder]
      ) as [any, any]
      
      res.status(201).json({ 
        message: 'Slide created successfully', 
        id: result.insertId 
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