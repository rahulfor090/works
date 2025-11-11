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

type ResponseData = MenuItem | { success: boolean } | { error: string }

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
    const { id } = req.query
    const menuId = Array.isArray(id) ? id[0] : id

    if (req.method === 'PUT') {
      const items = await readMenuItems()
      const index = items.findIndex((item) => item.id === menuId)

      if (index === -1) {
        return res.status(404).json({ error: 'Menu item not found' })
      }

      items[index] = {
        ...items[index],
        label: req.body.label ?? items[index].label,
        path: req.body.path ?? items[index].path,
        isActive: req.body.isActive !== undefined ? req.body.isActive : items[index].isActive,
      }

      await writeMenuItems(items)
      res.status(200).json(items[index])
    } else if (req.method === 'DELETE') {
      const items = await readMenuItems()
      const filteredItems = items.filter((item) => item.id !== menuId)

      if (filteredItems.length === items.length) {
        return res.status(404).json({ error: 'Menu item not found' })
      }

      await writeMenuItems(filteredItems)
      res.status(200).json({ success: true })
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Menu item API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
