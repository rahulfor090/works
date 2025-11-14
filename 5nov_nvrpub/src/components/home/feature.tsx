import React, { FC, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import SchoolIcon from '@mui/icons-material/School'
import ScienceIcon from '@mui/icons-material/Science'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import BiotechIcon from '@mui/icons-material/Biotech'
import PsychologyIcon from '@mui/icons-material/Psychology'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import { headingFontFamily } from '@/config/theme/typography'

const FeatureCard = styled(motion.div)({
  padding: '32px 24px',
  borderRadius: 0,
  display: 'flex',
  alignItems: 'flex-start',
  textDecoration: 'none',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28, 28, 28, 0.08)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: '#EEC1B7',
    boxShadow: '0 20px 60px rgba(238, 193, 183, 0.2)',
    '& .icon-container': {
      backgroundColor: '#EEC1B7',
      transform: 'scale(1.1)',
    },
  },
})

const IconContainer = styled(Box)({
  marginRight: '20px',
  backgroundColor: '#F8F6F3',
  borderRadius: '50%',
  height: '64px',
  width: '64px',
  minWidth: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#1C1C1C',
  border: '1px solid rgba(28, 28, 28, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '& svg': {
    fontSize: 28,
  },
})

const getFeatureIcon = (name: string, index: number) => {
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch('/api/subjectcategories?ishomepage=1')
        if (response.ok) {
          const data = await response.json()
          setFeatures(data || [])
        } else {
          const { featuresData } = await import('@/data/sampleData')
          setFeatures(featuresData || [])
        }
      } catch (error) {
        console.error('Error loading features data:', error)
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
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  return (
    <Box
      id="feature"
      ref={ref}
      sx={{
        py: { xs: 12, md: 16 },
        backgroundColor: '#F8F6F3',
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: headingFontFamily,
                fontSize: { xs: '0.875rem', md: '1rem' },
                letterSpacing: '0.2em',
                color: '#717171',
                mb: 2,
                textTransform: 'uppercase',
              }}
            >
              Explore by Specialities
            </Typography>
            <Typography
              component="h2"
              variant="h2"
              sx={{
                fontFamily: headingFontFamily,
                fontSize: { xs: '36px', md: '56px' },
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: '#1C1C1C',
                mb: 3,
              }}
            >
              Discover Your Path
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                color: '#717171',
                lineHeight: 1.7,
              }}
            >
              Set the way of learning according to your wishes with some of the benefits that you get from us,
              so you can enjoy the lessons that we provide.
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {features.map(({ name, description }, index) => (
              <Grid key={String(index)} item xs={12} sm={6} md={4} lg={3}>
                <Link href="/contenttypes" style={{ textDecoration: 'none' }}>
                  <FeatureCard variants={itemVariants}>
                    <IconContainer className="icon-container">
                      {getFeatureIcon(name, index)}
                    </IconContainer>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: headingFontFamily,
                          fontSize: '1.25rem',
                          mb: 1.5,
                          color: '#1C1C1C',
                          fontWeight: 600,
                          lineHeight: 1.3,
                        }}
                      >
                        {name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.6,
                          color: '#717171',
                          fontSize: '0.95rem',
                        }}
                      >
                        {description}
                      </Typography>
                    </Box>
                  </FeatureCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}

export default HomeFeature
export { HomeFeature }
