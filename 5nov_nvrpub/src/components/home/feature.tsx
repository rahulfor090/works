import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled, keyframes } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { Fade, Grow, Zoom } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import ScienceIcon from '@mui/icons-material/Science'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import BiotechIcon from '@mui/icons-material/Biotech'
import PsychologyIcon from '@mui/icons-material/Psychology'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ExploreIcon from '@mui/icons-material/Explore'

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

interface LinearProgressProps {
  order: number
}

const BorderLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'color',
})<LinearProgressProps>(({ theme, order }) => ({
  height: 8,
  borderRadius: 6,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 6,
    background: '#268bbb',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
}))

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2.5),
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-200px',
    width: '200px',
    height: '100%',
    background: 'rgba(255,255,255,0.4)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    background: 'rgba(255, 255, 255, 0.95)',
    '&::before': {
      left: '100%',
    },
  },
}))

const IconContainer = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  background: '#268bbb',
  borderRadius: '50%',
  height: 56,
  width: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  boxShadow: '0 8px 25px rgba(38, 139, 187, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '50%',
  },
  '& svg': {
    fontSize: 28,
    zIndex: 1,
  },
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    boxShadow: '0 12px 35px rgba(38, 139, 187, 0.4)',
  },
}))

// Icon mapping for different feature types
const getFeatureIcon = (name: string, index: number) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'medical': <LocalHospitalIcon />,
    'science': <ScienceIcon />,
    'biotech': <BiotechIcon />,
    'psychology': <PsychologyIcon />,
    'health': <HealthAndSafetyIcon />,
    'school': <SchoolIcon />,
  }
  
  // Try to match by name keywords
  //const lowerName = name.toLowerCase()
  //if (lowerName.includes('medical') || lowerName.includes('medicine')) return iconMap.medical
  //if (lowerName.includes('science') || lowerName.includes('chemistry')) return iconMap.science
  //if (lowerName.includes('biotech') || lowerName.includes('biology')) return iconMap.biotech
  //if (lowerName.includes('psychology') || lowerName.includes('mental')) return iconMap.psychology
  //if (lowerName.includes('health') || lowerName.includes('safety')) return iconMap.health
  
  // Default icons based on index
  const defaultIcons = [
    <LocalHospitalIcon key="hospital" />,
    <ScienceIcon key="science" />,
    <BiotechIcon key="biotech" />,
    <PsychologyIcon key="psychology" />,
    <HealthAndSafetyIcon key="health" />,
    <SchoolIcon key="school" />,
  ]
  
  return defaultIcons[index % defaultIcons.length]
}

const HomeFeature: FC = () => {
  const [features, setFeatures] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch subjectcategory data with ishomepage=1 from API
    const fetchFeatures = async () => {
      try {
        const response = await fetch('/api/subjectcategories?ishomepage=1')
        if (response.ok) {
          const data = await response.json()
          setFeatures(data || [])
        } else {
          console.error('Failed to fetch features data:', response.statusText)
          // Fallback to sample data if API fails
          const { featuresData } = await import('@/data/sampleData')
          setFeatures(featuresData || [])
        }
      } catch (error) {
        console.error('Error loading features data:', error)
        // Fallback to sample data if API fails
        try {
          const { featuresData } = await import('@/data/sampleData')
          setFeatures(featuresData || [])
        } catch (fallbackError) {
          console.error('Error loading fallback data:', fallbackError)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchFeatures()
  }, [])

  if (loading) {
    return (
      <Box sx={{ 
        py: 12, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
      }}>
        <Fade in={true}>
          <Box>
            <AutoAwesomeIcon 
              sx={{ 
                fontSize: 48, 
                color: 'primary.main', 
                mb: 2,
                animation: `${float} 2s ease-in-out infinite`,
              }} 
            />
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Loading amazing features...
            </Typography>
          </Box>
        </Fade>
      </Box>
    )
  }

  return (
    <Box 
      id="feature" 
      sx={{ 
        py: { xs: 12, md: 16 }, 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 50%, rgba(255, 107, 157, 0.03) 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Fade in={true} timeout={800}>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 3 }}>
                  <ExploreIcon 
                    sx={{ 
                      fontSize: 48, 
                      color: 'primary.main',
                      animation: `${float} 3s ease-in-out infinite`,
                    }} 
                  />
                  <Typography
                    component="h2"
                    sx={{
                      fontSize: { xs: 42, md: 56 },
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: 'primary.main',
                      animation: `${fadeInUp} 1s ease-out`,
                      position: 'relative',
                    }}
                  >
                    Explore More  By Specialities
                  </Typography>
                </Box>
                
                

                <Typography 
                  sx={{ 
                    color: 'text.secondary', 
                    fontSize: '1.1rem',
                    maxWidth: 600,
                    mx: 'auto',
                    lineHeight: 1.6,
                    animation: `${fadeInUp} 1s ease-out 0.3s both`,
                  }}
                >
                  Set the way of learning according to your wishes with some of the benefits that you get from us, 
                  so you can enjoy the lessons that we provide.
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {features.map(({ name, description, icon }, index) => (
                <Grid key={String(index)} item xs={12} sm={6} md={4} lg={3}>
                  <Zoom in={true} timeout={600 + index * 100}>
                    <Link href="/contenttypes" style={{ textDecoration: 'none' }}>
                      <FeatureCard
                        sx={{
                          animation: `${slideInLeft} 1s ease-out ${index * 0.1}s both`,
                        }}
                      >
                        <IconContainer>
                          {getFeatureIcon(name, index)}
                        </IconContainer>
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontSize: '1.1rem', 
                              mb: 1, 
                              color: 'text.primary',
                              fontWeight: 600,
                              lineHeight: 1.3,
                            }}
                          >
                            {name}
                          </Typography>
                          <Typography 
                            sx={{ 
                              lineHeight: 1.4, 
                              color: 'text.secondary',
                              fontSize: '0.9rem',
                            }} 
                            variant="body2"
                          >
                            {description}
                          </Typography>
                        </Box>
                      </FeatureCard>
                    </Link>
                  </Zoom>
                </Grid>
              ))}
            </Grid>

            
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomeFeature
export { HomeFeature }
