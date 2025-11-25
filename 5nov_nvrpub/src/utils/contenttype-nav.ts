export interface ContentTypeNavItem {
  id: string
  label: string
  path: string
  order: number
}

type RawContentType = {
  id?: number
  title?: string
  slug?: string
  displayOrder?: number
  ishomepage?: boolean | number
  isActive?: boolean | number
}

export const defaultContentTypeNav: ContentTypeNavItem[] = [
  { id: 'books', label: 'Books', path: '/contenttypes/books', order: 1 },
  { id: 'journals', label: 'Journals', path: '/contenttypes/journals', order: 2 },
  { id: 'mcqs', label: 'MCQs', path: '/contenttypes/mcqs', order: 3 },
  { id: 'reviews', label: 'Reviews', path: '/contenttypes/reviews', order: 4 },
]

const slugify = (value?: string): string =>
  (value || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

const generateId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `contenttype-${Math.random().toString(36).slice(2, 10)}`
}

const asBoolean = (value?: boolean | number): boolean => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value === 1
  return false
}

const buildNavItems = (data: RawContentType[]): ContentTypeNavItem[] => {
  const dbItems = data
    .filter(item => asBoolean(item?.ishomepage) && asBoolean(item?.isActive))
    .sort((a, b) => (a?.displayOrder ?? 0) - (b?.displayOrder ?? 0))
    .map(item => ({
      id: `contenttype-${item?.id ?? generateId()}`,
      label: item?.title?.trim() || 'Untitled',
      path: `/contenttypes/${item?.slug || slugify(item?.title) || ''}`,
      order: item?.displayOrder ?? 0,
    }))

  // Ensure MCQs and Reviews are always present
  const staticItems = [
    { id: 'mcqs', label: 'MCQs', path: '/contenttypes/mcqs', order: 98 },
    { id: 'reviews', label: 'Reviews', path: '/contenttypes/reviews', order: 99 },
  ]

  const finalItems = [...dbItems]
  
  staticItems.forEach(staticItem => {
    if (!finalItems.some(item => item.path === staticItem.path)) {
      finalItems.push(staticItem)
    }
  })
  
  return finalItems.sort((a, b) => a.order - b.order)
}

export const fetchContentTypeNav = async (signal?: AbortSignal): Promise<ContentTypeNavItem[]> => {
  const timestamp = Date.now()
  const response = await fetch(`/api/contenttypes?_=${timestamp}`, {
    signal,
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to load content types: ${response.status}`)
  }

  const data = (await response.json()) as RawContentType[]
  const navItems = Array.isArray(data) ? buildNavItems(data) : []
  return navItems.length ? navItems : defaultContentTypeNav
}
