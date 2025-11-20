import React, { FC, useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CircularProgress from '@mui/material/CircularProgress'
import {
  ContentTypeNavItem,
  defaultContentTypeNav,
  fetchContentTypeNav,
} from '@/utils/contenttype-nav'

const Navigation: FC = () => {
  const router = useRouter()
  const [menuItems, setMenuItems] = useState<ContentTypeNavItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMenuItems = useCallback(
    async (signal?: AbortSignal, showSpinner = false) => {
      try {
        if (showSpinner) setLoading(true)
        const homepageItems = await fetchContentTypeNav(signal)
        console.log('Navigation menu items:', homepageItems)
        setMenuItems(homepageItems)
      } catch (error: any) {
        if (error?.name === 'AbortError') return
        console.error('Failed to fetch menu items:', error)
        setMenuItems(defaultContentTypeNav)
      } finally {
        if (!signal?.aborted) setLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchMenuItems(controller.signal, true)
    return () => controller.abort()
  }, [fetchMenuItems])

  useEffect(() => {
    const handleRouteChange = () => fetchMenuItems(undefined, false)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchMenuItems(undefined, false)
      }
    }
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'contenttype-update') {
        console.log('Detected contenttype update from admin, refreshing navigation...')
        fetchMenuItems(undefined, false)
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    window.addEventListener('focus', handleRouteChange)
    window.addEventListener('storage', handleStorageChange)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      window.removeEventListener('focus', handleRouteChange)
      window.removeEventListener('storage', handleStorageChange)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [fetchMenuItems, router.events])

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
