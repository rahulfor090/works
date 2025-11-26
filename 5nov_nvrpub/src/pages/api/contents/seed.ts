import type { NextApiRequest, NextApiResponse } from 'next'
import { query } from '@/utils/db'
import { data as popular } from '@/components/home/data/popular-course.data'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })
  try {
    // Ensure contents table exists
    await query(
      'CREATE TABLE IF NOT EXISTS contents (\n' +
      '  id INT AUTO_INCREMENT PRIMARY KEY,\n' +
      '  title VARCHAR(255) NOT NULL,\n' +
      '  coverImage VARCHAR(512) NOT NULL,\n' +
      '  description TEXT NOT NULL,\n' +
      '  author VARCHAR(128) NOT NULL,\n' +
      '  detailsHtml TEXT NOT NULL,\n' +
      '  rating FLOAT NOT NULL DEFAULT 0,\n' +
      '  displayOrder INT NOT NULL DEFAULT 0,\n' +
      '  contentTypeId INT NOT NULL,\n' +
      '  categoryId INT NOT NULL,\n' +
      '  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n' +
      ')'
    )

    // Load category slugs to ids
    const [categories]: any[] = await query('SELECT id, slug FROM categories')

    let inserted = 0
    const failures: Array<{ id: number | string; error: string }> = []

    for (let i = 0; i < popular.length; i++) {
      const c = popular[i]
      const category = categories.find((cat: any) => String(cat.slug).toLowerCase() === String(c.contenttype).toLowerCase())
      if (!category) {
        failures.push({ id: c.id, error: `Category slug not found: ${c.contenttype}` })
        continue
      }

      // Find a matching subcategory by name under the selected category
      const [subs]: any[] = await query('SELECT id, name FROM subcategories WHERE categoryId = ? ORDER BY sortOrder ASC, id ASC', [category.id])
      let subId: number | null = null
      const match = subs.find((s: any) => String(s.name).toLowerCase() === String(c.subjectcategory).toLowerCase())
      if (match) {
        subId = match.id
      } else {
        // Prefer "Medicine" if present, otherwise pick the first
        const medicine = subs.find((s: any) => String(s.name).toLowerCase() === 'medicine')
        subId = (medicine ? medicine.id : (subs[0]?.id ?? null))
      }

      if (!subId) {
        failures.push({ id: c.id, error: `No subcategory found for category ${c.contenttype}` })
        continue
      }

      const description = `Dummy description for ${c.title}. This is placeholder content.`
      const author = 'Admin'
      const detailsHtml = `<p>${c.title} details go here. This is dummy text.</p><ul><li>Overview</li><li>Highlights</li></ul>`
      const rating = c.rating ?? 0
      const displayOrder = i + 1

      try {
        await query(
          'INSERT INTO contents (title, coverImage, description, author, detailsHtml, rating, displayOrder, contentTypeId, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [c.title, c.cover, description, author, detailsHtml, rating, displayOrder, category.id, subId]
        )
        inserted++
      } catch (e: any) {
        failures.push({ id: c.id, error: e?.message || 'Insert failed' })
      }
    }

    return res.status(200).json({ inserted, failures })
  } catch (err: any) {
    return res.status(500).json({ message: err?.message || 'Server error' })
  }
}