import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { navigations } from './navigation.data'

const Navigation: FC = () => {
  const router = useRouter()

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {navigations.map(({ path: destination, label }, index) => {
        const isActive = router.asPath === destination
        
        return (
          <Link href={destination} key={`nav-${index}-${label}`} passHref>
            <Box
              component="a"
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
      })}
    </Box>
  )
}

export default Navigation
