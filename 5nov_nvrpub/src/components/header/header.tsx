import React, { FC, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Logo } from '@/components/logo'
import { Navigation, AuthNavigation } from '@/components/navigation'
import { useTheme } from '@mui/material/styles'
import { Menu, Close } from '@mui/icons-material'

const Header: FC = () => {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState(false)
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'), { noSsr: true })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Only run on client side
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Initial check
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: scrolled
          ? 'rgba(248, 246, 243, 0.95)'
          : 'rgba(248, 246, 243, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(28, 28, 28, 0.15)'
          : '1px solid rgba(28, 28, 28, 0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container sx={{ py: { xs: 1.5, md: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo href="/" />
          
          <Box sx={{ ml: 'auto', display: { xs: 'inline-flex', md: 'none' } }}>
            <IconButton
              onClick={() => setVisibleMenu(!visibleMenu)}
              sx={{ color: '#1C1C1C' }}
            >
              <Menu />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              transition: (theme) => theme.transitions.create(['top']),
              ...(matchMobileView && {
                py: 6,
                backgroundColor: 'rgba(248, 246, 243, 0.98)',
                backdropFilter: 'blur(20px)',
                zIndex: 'appBar',
                position: 'fixed',
                height: { xs: '100vh', md: 'auto' },
                top: visibleMenu ? 0 : '-120vh',
                left: 0,
              }),
            }}
          >
            <Box /> {/* Magic space */}
            <Navigation />
            <AuthNavigation />
            {visibleMenu && matchMobileView && (
              <IconButton
                sx={{
                  position: 'fixed',
                  top: 10,
                  right: 10,
                  color: '#1C1C1C',
                }}
                onClick={() => setVisibleMenu(!visibleMenu)}
              >
                <Close />
              </IconButton>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Header
