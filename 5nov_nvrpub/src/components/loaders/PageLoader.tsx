import React, { FC, useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { keyframes } from '@mui/material/styles'

interface PageLoaderProps {
  isLoading: boolean
}

const fadeOut = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
`

const sweep = keyframes`
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(150%);
  }
`

const PageLoader: FC<PageLoaderProps> = ({ isLoading }) => {
  const theme = useTheme()
  const [showLoader, setShowLoader] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 120)
      return () => clearTimeout(timer)
    } else {
      setShowLoader(true)
    }
  }, [isLoading])

  useEffect(() => {
    let raf: number
    if (showLoader && !isVisible) {
      raf = requestAnimationFrame(() => setIsVisible(true))
    }
    if (!showLoader && isVisible) {
      raf = requestAnimationFrame(() => setIsVisible(false))
    }
    return () => cancelAnimationFrame(raf)
  }, [showLoader, isVisible])

  if (!isVisible && !showLoader) {
    return null
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        zIndex: 9999,
        animation: !showLoader ? `${fadeOut} 0.3s ease-in-out forwards` : 'none',
        pointerEvents: showLoader ? 'auto' : 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: '2px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '70%',
              height: '70%',
              borderRadius: '50%',
              border: '3px solid transparent',
              borderTopColor: theme.palette.text.primary,
              animation: `${pulse} 1s ease-in-out infinite`,
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: theme.palette.text.primary,
            }}
          >
            NRV Publication
          </Box>
          <Box
            sx={{
              fontSize: '0.85rem',
              color: theme.palette.text.secondary,
              letterSpacing: '0.1em',
            }}
          >
            Preparing your experience
          </Box>
        </Box>

        <Box
          sx={{
            width: 140,
            height: 4,
            borderRadius: 999,
            background: 'rgba(0,0,0,0.08)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(90deg, transparent, ${theme.palette.text.primary}, transparent)`,
              animation: `${sweep} 1.2s ease-in-out infinite`,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default PageLoader
