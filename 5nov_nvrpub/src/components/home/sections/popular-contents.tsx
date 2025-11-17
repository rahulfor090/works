import React, { FC, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { headingFontFamily } from '@/config/theme/typography'

const FeaturedCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  height: '500px',
  overflow: 'hidden',
  cursor: 'pointer',
  borderRadius: 0,
  backgroundColor: '#F8F6F3',
  border: '1px solid rgba(28, 28, 28, 0.1)',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: '#EEC1B7',
    boxShadow: '0 20px 60px rgba(238, 193, 183, 0.2)',
    '& .card-image': {
      transform: 'scale(1.1)',
    },
    '& .card-overlay': {
      opacity: 0.95,
      backgroundColor: 'rgba(28, 28, 28, 0.85)',
    },
    '& .card-content': {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
}))

const CardImage = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'linear-gradient(135deg, #EEC1B7 0%, #D8B179 50%, #F5D9D2 100%)',
  '& img': {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
})

const CardOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(28, 28, 28, 0.4)',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 1,
})

const CardContent = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '40px',
  zIndex: 2,
  transform: 'translateY(20px)',
  opacity: 0.9,
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
})

const HomePopularContent: FC = () => {
  const [contentTypes, setContentTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const fetchContentTypes = async () => {
      try {
        const response = await fetch('/api/contenttypes')
        if (response.ok) {
          const data = await response.json()
          // Filter for homepage content types and take first 3
          const homepageTypes = data.filter((item: any) => item.ishomepage).slice(0, 3)
          setContentTypes(homepageTypes)
        }
      } catch (error) {
        console.error('Error loading content types:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchContentTypes()
  }, [])

  const featuredItems = contentTypes.length >= 3 
    ? contentTypes 
    : [
        { id: 1, title: 'Medical Research', description: 'Comprehensive medical research and studies', slug: 'medical-research' },
        { id: 2, title: 'Journals', description: 'Academic journals and publications', slug: 'journals' },
        { id: 3, title: 'Case Studies', description: 'In-depth clinical case studies', slug: 'case-studies' },
      ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  if (loading) {
    return null
  }

  return (
    <Box
      id="popular-course"
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
              Featured Collections
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
              Explore Our Library
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
              Discover curated collections of medical research, journals, and case studies
              designed to inspire and educate.
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {featuredItems.map((item, index) => (
              <Grid key={item.id || index} item xs={12} md={4}>
                <Link href={`/contenttypes/${item.slug || item.id}`} style={{ textDecoration: 'none' }}>
                  <FeaturedCard variants={itemVariants}>
                    <CardImage className="card-image">
                      {item.coverImage && item.coverImage.startsWith('http') ? (
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
                        />
                      ) : item.icon && item.icon.startsWith('http') ? (
                        <Image
                          src={item.icon}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
                        />
                      ) : (
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(135deg, 
                              ${index % 3 === 0 ? '#EEC1B7' : index % 3 === 1 ? '#D8B179' : '#F5D9D2'} 0%, 
                              ${index % 3 === 0 ? '#D8A89A' : index % 3 === 1 ? '#C09A5A' : '#EEC1B7'} 100%)`,
                          }}
                        />
                      )}
                    </CardImage>
                    <CardOverlay className="card-overlay" />
                    <CardContent className="card-content">
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontFamily: headingFontFamily,
                          fontSize: '0.875rem',
                          letterSpacing: '0.15em',
                          color: '#EEC1B7',
                          mb: 1,
                          textTransform: 'uppercase',
                        }}
                      >
                        Collection
                      </Typography>
                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: headingFontFamily,
                          fontSize: { xs: '28px', md: '36px' },
                          fontWeight: 700,
                          color: '#F8F6F3',
                          mb: 2,
                          lineHeight: 1.2,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(248, 246, 243, 0.9)',
                          lineHeight: 1.6,
                          fontSize: '1rem',
                        }}
                      >
                        {item.description || 'Explore our curated collection of resources'}
                      </Typography>
                    </CardContent>
                  </FeaturedCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}

export default HomePopularContent
export { HomePopularContent }
