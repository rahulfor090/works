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

const CollectionCard = styled(motion.div)({
  position: 'relative',
  height: '400px',
  overflow: 'hidden',
  cursor: 'pointer',
  borderRadius: 0,
  backgroundColor: '#F8F6F3',
  border: '1px solid rgba(28, 28, 28, 0.08)',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-12px)',
    borderColor: '#EEC1B7',
    boxShadow: '0 24px 80px rgba(238, 193, 183, 0.25)',
    '& .card-image': {
      transform: 'scale(1.15)',
      opacity: 0.9,
    },
    '& .card-overlay': {
      opacity: 1,
      backgroundColor: 'rgba(28, 28, 28, 0.7)',
    },
    '& .card-content': {
      transform: 'translateY(0)',
      opacity: 1,
    },
    '& .card-number': {
      opacity: 0.3,
    },
  },
})

const CardImage = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease',
  opacity: 0.4,
  background: 'linear-gradient(135deg, #EEC1B7 0%, #D8B179 50%, #F5D9D2 100%)',
  '& img': {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    filter: 'grayscale(100%)',
    transition: 'filter 0.6s ease',
  },
})

const CardOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(28, 28, 28, 0.3)',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 0.6,
  zIndex: 1,
})

const CardContent = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '40px',
  zIndex: 2,
  transform: 'translateY(30px)',
  opacity: 0.8,
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
})

const CardNumber = styled(Typography)({
  position: 'absolute',
  top: '30px',
  right: '30px',
  fontFamily: headingFontFamily,
  fontSize: '120px',
  fontWeight: 700,
  color: '#EEC1B7',
  opacity: 0.15,
  lineHeight: 1,
  zIndex: 1,
  transition: 'opacity 0.4s ease',
})

const HomeCollections: FC = () => {
  const [collections, setCollections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('/api/contenttypes')
        if (response.ok) {
          const data = await response.json()
          // Filter for homepage collections and sort by displayOrder
          const homepageCollections = data
            .filter((item: any) => item.ishomepage && item.isActive)
            .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0))
          setCollections(homepageCollections)
        }
      } catch (error) {
        console.error('Error loading collections:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCollections()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
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

  if (collections.length === 0) {
    return null
  }

  return (
    <Box
      id="collections"
      ref={ref}
      sx={{
        py: { xs: 12, md: 16 },
        backgroundColor: '#FFFFFF',
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
              Our Collections
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
              Explore by Category
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
              Discover our carefully curated collections, each designed to inspire
              and enhance your learning journey.
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {collections.map((collection, index) => (
              <Grid key={collection.id || index} item xs={12} sm={6} md={4} lg={3}>
                <Link
                  href={`/contenttypes/${collection.slug || collection.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <CollectionCard variants={itemVariants}>
                    <CardImage className="card-image">
                      {collection.icon && collection.icon.startsWith('http') ? (
                        <Image
                          src={collection.icon}
                          alt={collection.title}
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
                    <CardNumber className="card-number">
                      {String(index + 1).padStart(2, '0')}
                    </CardNumber>
                    <CardContent className="card-content">
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontFamily: headingFontFamily,
                          fontSize: '0.875rem',
                          letterSpacing: '0.15em',
                          color: '#EEC1B7',
                          mb: 1.5,
                          textTransform: 'uppercase',
                        }}
                      >
                        Collection
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: headingFontFamily,
                          fontSize: { xs: '24px', md: '28px' },
                          fontWeight: 700,
                          color: '#F8F6F3',
                          mb: 1.5,
                          lineHeight: 1.2,
                        }}
                      >
                        {collection.title}
                      </Typography>
                      {collection.description && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(248, 246, 243, 0.85)',
                            lineHeight: 1.6,
                            fontSize: '0.95rem',
                            display: { xs: 'none', md: 'block' },
                          }}
                        >
                          {collection.description.length > 80
                            ? `${collection.description.substring(0, 80)}...`
                            : collection.description}
                        </Typography>
                      )}
                    </CardContent>
                  </CollectionCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}

export default HomeCollections
export { HomeCollections }

