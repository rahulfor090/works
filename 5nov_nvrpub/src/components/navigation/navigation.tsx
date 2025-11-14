import React, { FC, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'

interface MenuItem {
  id: string
  label: string
  path: string
  isActive: boolean
  order: number
}

const Navigation: FC = () => {
  const router = useRouter()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/admin/menus')
        if (response.ok) {
          const data = await response.json()
          // Filter only active items and sort by order
          const activeItems = data
            .filter((item: MenuItem) => item.isActive)
            .sort((a: MenuItem, b: MenuItem) => a.order - b.order)
          setMenuItems(activeItems)
        }
      } catch (error) {
        console.error('Failed to fetch menu items:', error)
        // Fallback to default items
        setMenuItems([
          { id: '1', label: 'Books', path: '/contenttypes/books', isActive: true, order: 1 },
          { id: '2', label: 'Videos', path: '/contenttypes/videos', isActive: true, order: 2 },
          { id: '3', label: 'Journals', path: '/contenttypes/journals', isActive: true, order: 3 },
          { id: '4', label: 'Cases', path: '/contenttypes/cases', isActive: true, order: 4 },
          { id: '5', label: 'MCQs', path: '/contenttypes/mcqs', isActive: true, order: 5 },
          { id: '6', label: 'Reviews', path: '/contenttypes/reviews', isActive: true, order: 6 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {loading ? (
        <CircularProgress size={24} sx={{ my: 'auto' }} />
      ) : (
        menuItems.map(({ path: destination, label, id }) => {
          const isActive = router.asPath === destination

          return (
            <Link
              href={destination}
              key={`nav-${id}-${label}`}
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  color: isActive ? 'primary.main' : 'black',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: { xs: 0, md: 3 },
                  mb: { xs: 3, md: 0 },
                  fontSize: { xs: '1.2rem', md: 'inherit' },
                  textDecoration: 'none',

                  '& > div': { display: isActive ? 'block' : 'none' },

                  '&:hover': {
                    color: 'primary.main',
                    '& > div': {
                      display: 'block',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    transform: 'rotate(3deg)',
                    '& img': { width: 44, height: 'auto' },
                  }}
                >
                  {/* eslint-disable-next-line */}
                  <img src="/images/headline-curve.svg" alt="Headline curve" />
                </Box>
                {label}
              </Box>
            </Link>
          )
        })
      )}
    </Box>
  )
}

export default Navigation
