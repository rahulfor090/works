import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

interface MenuItem {
  id: string
  label: string
  path: string
  isActive: boolean
  order: number
}

type ResponseData = MenuItem[] | MenuItem | { success: boolean } | { error: string }

const MENU_FILE = path.join(process.cwd(), 'src/data/menu-items.json')

async function readMenuItems(): Promise<MenuItem[]> {
  try {
    const data = await fs.readFile(MENU_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Return default menu items if file doesn't exist
    return [
      { id: '1', label: 'Books', path: '/contenttypes/books', isActive: true, order: 1 },
      { id: '2', label: 'Videos', path: '/contenttypes/videos', isActive: true, order: 2 },
      { id: '3', label: 'Journals', path: '/contenttypes/journals', isActive: true, order: 3 },
      { id: '4', label: 'Cases', path: '/contenttypes/cases', isActive: true, order: 4 },
      { id: '5', label: 'MCQs', path: '/contenttypes/mcqs', isActive: true, order: 5 },
      { id: '6', label: 'Reviews', path: '/contenttypes/reviews', isActive: true, order: 6 },
    ]
  }
}

async function writeMenuItems(items: MenuItem[]): Promise<void> {
  await fs.mkdir(path.dirname(MENU_FILE), { recursive: true })
  await fs.writeFile(MENU_FILE, JSON.stringify(items, null, 2))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    if (req.method === 'GET') {
      const items = await readMenuItems()
      res.status(200).json(items)
    } else if (req.method === 'POST') {
      const items = await readMenuItems()
      const newItem: MenuItem = {
        id: Date.now().toString(),
        label: req.body.label,
        path: req.body.path,
        isActive: req.body.isActive ?? true,
        order: items.length + 1,
      }
      items.push(newItem)
      await writeMenuItems(items)
      res.status(201).json(newItem)
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Menu API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
