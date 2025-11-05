import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const [slides] = await query('SELECT * FROM hero_slides WHERE id = ?', [id])
      
      if (slides.length === 0) {
        return res.status(404).json({ error: 'Slide not found' })
      }

      // Parse the buttons JSON
      const slide = {
        ...slides[0],
        buttons: slides[0].buttons ? JSON.parse(slides[0].buttons) : []
      }
      
      res.status(200).json(slide)
    } catch (error) {
      console.error('Database error:', error)
      res.status(500).json({ error: 'Failed to fetch slide' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, highlightedWord, subtitle, image, buttons, displayOrder } = req.body
      
      const [result] = await query(
        'UPDATE hero_slides SET title = ?, highlightedWord = ?, subtitle = ?, image = ?, buttons = ?, displayOrder = ? WHERE id = ?',
        [title, highlightedWord, subtitle, image, JSON.stringify(buttons), displayOrder, id]
      ) as [any, any]
      
      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ error: 'Slide not found' })
      }
      
      res.status(200).json({ message: 'Slide updated successfully' })
    } catch (error) {
      console.error('Database error:', error)
      res.status(500).json({ error: 'Failed to update slide' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const [result] = await query('DELETE FROM hero_slides WHERE id = ?', [id]) as [any, any]
      
      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ error: 'Slide not found' })
      }
      
      res.status(200).json({ message: 'Slide deleted successfully' })
    } catch (error) {
      console.error('Database error:', error)
      res.status(500).json({ error: 'Failed to delete slide' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

