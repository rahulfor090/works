import React from 'react'
import { Box, CircularProgress, Skeleton } from '@mui/material'

interface ComponentLoaderProps {
  type?: 'spinner' | 'skeleton' | 'minimal'
  height?: string | number
}

export const ComponentLoader: React.FC<ComponentLoaderProps> = ({ 
  type = 'minimal', 
  height = '200px' 
}) => {
  if (type === 'spinner') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: height,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (type === 'skeleton') {
    return (
      <Box sx={{ width: '100%', p: 2 }}>
        <Skeleton variant="rectangular" height={height} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
      </Box>
    )
  }

  // Minimal - just reserve space
  return <Box sx={{ minHeight: height }} />
}

export default ComponentLoader
