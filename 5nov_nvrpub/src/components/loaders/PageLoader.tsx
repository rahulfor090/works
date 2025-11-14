import React, { FC, useEffect, useState } from 'react'
import { Box, CircularProgress, useTheme } from '@mui/material'
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
    opacity: 0.5;
  }
`

const PageLoader: FC<PageLoaderProps> = ({ isLoading }) => {
  const theme = useTheme()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      // Add a small delay for smooth transition
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setShowLoader(true)
    }
  }, [isLoading])

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
          gap: 3,
        }}
      >
        {/* Animated Gradient Circle */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
          }}
        >
          {/* Outer rotating ring */}
          <Box
            sx={{
              position: 'absolute',
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: '3px solid transparent',
              borderTop: `3px solid ${theme.palette.primary.main}`,
              borderRight: `3px solid ${theme.palette.primary.light}`,
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />

          {/* Inner pulsing circle */}
          <Box
            sx={{
              position: 'absolute',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
              opacity: 0.2,
              animation: `${pulse} 1.5s ease-in-out infinite`,
            }}
          />

          {/* Center dot */}
          <Box
            sx={{
              position: 'absolute',
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
            }}
          />
        </Box>

        {/* Optional loading text */}
        <Box
          sx={{
            fontSize: '0.875rem',
            color: theme.palette.text.secondary,
            fontWeight: 500,
            letterSpacing: '1px',
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
        >
          Loading...
        </Box>
      </Box>
    </Box>
  )
}

export default PageLoader
