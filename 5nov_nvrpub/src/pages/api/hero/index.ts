import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch hero slides from database
      const [slides] = await query(`
        SELECT id, title, highlightedWord, subtitle, image, buttons, displayOrder 
        FROM hero_slides 
        WHERE isActive = 1 
        ORDER BY displayOrder ASC
      `)

      // Parse buttons JSON for each slide
        const parsedSlides = slides.map((slide: any) => ({
          ...slide,
          buttons: slide.buttons ? JSON.parse(slide.buttons) : []
        }))

        // Create contenttypes table if it doesn't exist and provide fallback stats
        try {
          await query(`
            CREATE TABLE IF NOT EXISTS contenttypes (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(128) NOT NULL,
              slug VARCHAR(128) NOT NULL UNIQUE,
              description VARCHAR(512) NOT NULL DEFAULT '',
              sortOrder INT NOT NULL DEFAULT 0,
              createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `)

          // Insert default content types if table is empty
          const [existingTypes] = await query('SELECT COUNT(*) as count FROM contenttypes')
          if ((existingTypes[0]?.count || 0) === 0) {
            await query(`
              INSERT INTO contenttypes (id, name, slug, description, sortOrder) VALUES
              (1, 'Books', 'books', 'Comprehensive textbooks and reference materials', 1),
              (2, 'Videos', 'videos', 'Interactive video lectures and tutorials', 2),
              (3, 'Journals', 'journals', 'Latest research articles and academic publications', 3)
            `)
          }

          // Calculate dynamic stats from contenttypes and related content
          const [contentStats] = await query(`
             SELECT ct.title AS label ,COUNT(c.id) AS count FROM contents c INNER JOIN contenttype AS ct ON c.contentTypeId = ct.id WHERE ct.ishomepage=1   
 GROUP BY c.contentTypeId
          `)


          // Combine content type stats with additional stats
          const allStats = [...(contentStats as any[])]

          // Format stats with proper labels and values
          const stats = allStats.map((stat, index) => ({
            id: index + 1,
            label: stat.label,
            value: `${stat.count}+`,
            displayOrder: index + 1
          }))

          return res.status(200).json({
            slides: parsedSlides,
            stats: stats
          })

        } catch (dbError) {
          console.error('Database error, using fallback stats:', dbError)
          
          // Fallback stats if database operations fail
          const fallbackStats = [
            { id: 1, label: 'Booksss', value: '4170+', displayOrder: 1 },
            { id: 2, label: 'Videos', value: '12576+', displayOrder: 2 },
            { id: 3, label: 'Journals', value: '4170+', displayOrder: 3 },
            { id: 4, label: 'MCQs', value: '14567+', displayOrder: 4 },
            { id: 5, label: 'Clinical Cases', value: '3420+', displayOrder: 5 }
          ]

          return res.status(200).json({
            slides: parsedSlides,
            stats: fallbackStats
          })
        }
    } catch (error: any) {
      console.error('Hero API error:', error)
      return res.status(500).json({ message: error?.message || 'Server error' })
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}