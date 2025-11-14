import React, { FC, useState, useEffect, useRef as useReactRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import { ChevronLeft, ChevronRight, Star } from '@mui/icons-material'
import Slider, { Settings } from 'react-slick'
import { headingFontFamily } from '@/config/theme/typography'

const SliderContainer = styled(Box)({
  py: { xs: 12, md: 16 },
  backgroundColor: '#FFFFFF',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: -200,
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(135, 206, 235, 0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(135, 206, 235, 0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
})

const SlideCard = styled(motion.div)({
  padding: '20px',
  position: 'relative',
  '& > div': {
    height: '100%',
  },
})

const ContentCardWrapper = styled(Box)({
  position: 'relative',
  height: '480px',
  borderRadius: '14px',
  overflow: 'hidden',
  backgroundColor: '#F8F6F3',
  border: '1px solid rgba(135, 206, 235, 0.15)',
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-12px)',
    borderColor: '#87CEEB',
    boxShadow: '0 24px 64px rgba(135, 206, 235, 0.28)',
    '& .image-container': {
      transform: 'scale(1.1)',
    },
    '& .card-overlay': {
      opacity: 1,
    },
    '& .card-footer': {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
})

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '280px',
  overflow: 'hidden',
  backgroundColor: 'linear-gradient(135deg, #87CEEB 0%, #5AA7D6 100%)',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
})

const CardOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(28, 28, 28, 0.4)',
  opacity: 0,
  transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
})

const CardContent = styled(Box)({
  flex: 1,
  padding: '24px 20px',
  display: 'flex',
  flexDirection: 'column',
})

const CardTitle = styled(Typography)({
  fontFamily: headingFontFamily,
  fontSize: '16px',
  fontWeight: 600,
  color: '#1C1C1C',
  marginBottom: '8px',
  lineHeight: 1.4,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

const CardMeta = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '12px',
  flexWrap: 'wrap',
})

const TypeBadge = styled(Chip)({
  height: '24px',
  fontSize: '0.7rem',
  fontWeight: 600,
  backgroundColor: 'rgba(135, 206, 235, 0.15)',
  color: '#5AA7D6',
  border: '1px solid rgba(135, 206, 235, 0.3)',
  '& .MuiChip-label': {
    padding: '0 8px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
})

const Rating = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

const CardDescription = styled(Typography)({
  fontSize: '0.875rem',
  color: '#717171',
  lineHeight: 1.6,
  marginBottom: '12px',
  flex: 1,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

const CardFooter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: '12px',
  borderTop: '1px solid rgba(28, 28, 28, 0.08)',
  transform: 'translateY(8px)',
  opacity: 0.8,
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
})

const Author = styled(Typography)({
  fontSize: '0.8rem',
  color: '#717171',
  fontStyle: 'italic',
})

const StyledArrow = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  backgroundColor: 'rgba(28, 28, 28, 0.7)',
  color: '#FFFFFF',
  border: '1px solid rgba(135, 206, 235, 0.3)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  width: '48px',
  height: '48px',
  '&:hover': {
    backgroundColor: '#87CEEB',
    color: '#1C1C1C',
    borderColor: '#87CEEB',
    transform: 'translateY(-50%) scale(1.1)',
  },
})

const PrevArrow = styled(StyledArrow)({
  left: '20px',
})

const NextArrow = styled(StyledArrow)({
  right: '20px',
})

interface ContentItem {
  id?: number | string
  title: string
  description?: string
  author?: string
  type: 'book' | 'video' | 'journal'
  image?: string
  rating?: number
  ratingCount?: number
}

const HomeContentSlider: FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([])
  const [sliderReady, setSliderReady] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const sliderRef = useReactRef<Slider>(null)

  // Sample content data
  const sampleContents: ContentItem[] = [
    {
      id: 1,
      title: 'Clinical Surgery & Operative Techniques',
      description: 'Comprehensive guide covering surgical principles and advanced techniques.',
      author: 'Dr. Michael Smith',
      type: 'book',
      image: '/images/jaypee-DSJUOG-1761321552656.jpg',
      rating: 4.8,
      ratingCount: 156,
    },
    {
      id: 2,
      title: 'Advanced Cardiac Imaging Masterclass',
      description: 'Expert-led video series on state-of-the-art cardiac imaging modalities.',
      author: 'Prof. Sarah Johnson',
      type: 'video',
      image: '/images/jaypee-DSJUOG-1761321552656.jpg',
      rating: 4.9,
      ratingCount: 234,
    },
    {
      id: 3,
      title: 'International Journal of Medical Research 2024',
      description: 'Latest peer-reviewed articles and clinical research findings.',
      author: 'Research Team',
      type: 'journal',
      image: '/images/jaypee-DSJUOG-1761321552656.jpg',
      rating: 4.7,
      ratingCount: 89,
    },
    {
      id: 4,
      title: 'Pediatric Dentistry Essentials',
      description: 'Complete reference for pediatric oral health and treatment protocols.',
      author: 'Dr. Emily Wang',
      type: 'book',
      image: '/images/jaypee-DSJUOG-1761321552656.jpg',
      rating: 4.6,
      ratingCount: 124,
    },
    {
      id: 5,
      title: 'Pathophysiology Video Lectures',
      description: 'Comprehensive video explanations of disease mechanisms and pathways.',
      author: 'Dr. James Brown',
      type: 'video',
      image: '/images/jaypee-DSJUOG-1761321552656.jpg',
      rating: 4.8,
      ratingCount: 312,
    },
    {
      id: 6,
      title: 'Molecular Biology Advances Journal',
      description: 'Current trends and breakthroughs in molecular biology research.',
      author: 'Editorial Board',
      type: 'journal',
      image: '/images/jaypee-DSJUOG-1761321552656.jpg',
      rating: 4.9,
      ratingCount: 167,
    },
    {
      id: 7,
      title: 'Orthopedic Surgery Practical Guide',
      description: 'Step-by-step surgical techniques and clinical management strategies.',
      author: 'Dr. Robert Martinez',
      type: 'book',
      image: '/images/jaypee-DSJUOG-1761321552656.jpg',
      rating: 4.7,
      ratingCount: 198,
    },
    {
      id: 8,
      title: 'Neurology Clinical Cases Video Series',
      description: 'Real-world case studies with diagnostic and management insights.',
      author: 'Prof. Lisa Anderson',
      type: 'video',
      image: '/images/jaypee-DSJUOG-1761321552656.jpg',
      rating: 4.8,
      ratingCount: 276,
    },
  ]

  useEffect(() => {
    // Set sample data
    setContents(sampleContents)

    // Try to fetch actual content from API
    const fetchContents = async () => {
      try {
        const response = await fetch('/api/contents?limit=8')
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0) {
            const mappedContents: ContentItem[] = data.map((item: any) => ({
              id: item.id,
              title: item.title,
              description: item.description,
              author: item.author || item.createdBy,
              type: item.contentTypeId === 1 ? 'book' : item.contentTypeId === 2 ? 'video' : 'journal',
              image: item.image || '/images/jaypee-DSJUOG-1761321552656.jpg',
              rating: item.rating || 4.5,
              ratingCount: item.ratingCount || 0,
            }))
            setContents(mappedContents)
          }
        }
      } catch (error) {
        console.error('Error loading content:', error)
        // Keep sample data
      }
    }

    fetchContents()

    // Initialize slider
    const timer = setTimeout(() => {
      setSliderReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'book':
        return '#87CEEB'
      case 'video':
        return '#5AA7D6'
      case 'journal':
        return '#3498DB'
      default:
        return '#87CEEB'
    }
  }

  const sliderSettings: Settings = {
    dots: true,
    infinite: contents.length > 1,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: contents.length > 1,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  const PrevArrowComponent = (props: any) => (
    <PrevArrow onClick={props.onClick} size="large" aria-label="Previous slide" title="Previous">
      <ChevronLeft />
    </PrevArrow>
  )

  const NextArrowComponent = (props: any) => (
    <NextArrow onClick={props.onClick} size="large" aria-label="Next slide" title="Next">
      <ChevronRight />
    </NextArrow>
  )

  // Custom paging to provide larger accessible hit targets for dots
  const customPaging = (): JSX.Element => (
    <Box sx={{ width: 36, height: 8, borderRadius: 4, backgroundColor: 'divider' }} aria-hidden />
  )

  return (
    <SliderContainer ref={ref} component="section">
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
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
              Featured Content
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: headingFontFamily,
                fontSize: { xs: '32px', md: '52px' },
                fontWeight: 700,
                color: '#1C1C1C',
                mb: 4,
                letterSpacing: '-0.02em',
              }}
            >
              Explore Books, Videos & Journals
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: '#717171',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              Discover our curated collection of medical resources across multiple formats and specialties.
            </Typography>
          </Box>
        </motion.div>

        {sliderReady && contents.length > 0 ? (
          <Box sx={{ position: 'relative' }}>
            <Slider
              ref={sliderRef}
              {...sliderSettings}
              prevArrow={<PrevArrowComponent />}
              nextArrow={<NextArrowComponent />}
              customPaging={customPaging}
              accessibility
            >
              {contents.map((content, index) => (
                <SlideCard key={content.id || index} role="group" aria-roledescription="slide" tabIndex={0}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ContentCardWrapper>
                      <ImageContainer className="image-container">
                        {content.image && (
                          <Image
                            src={content.image}
                            alt={content.title}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        )}
                        <CardOverlay className="card-overlay" />
                      </ImageContainer>

                      <CardContent>
                        <CardMeta>
                          <TypeBadge
                            label={content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                            size="small"
                            variant="outlined"
                          />
                          <Rating>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                sx={{
                                  fontSize: '14px',
                                  color: i < Math.round(content.rating || 0) ? '#87CEEB' : '#ddd',
                                }}
                              />
                            ))}
                          </Rating>
                        </CardMeta>

                        <CardTitle>{content.title}</CardTitle>
                        <CardDescription>{content.description}</CardDescription>

                        <CardFooter className="card-footer">
                          <Author>{content.author}</Author>
                        </CardFooter>
                      </CardContent>
                    </ContentCardWrapper>
                  </motion.div>
                </SlideCard>
              ))}
            </Slider>
          </Box>
        ) : null}
      </Container>
    </SliderContainer>
  )
}

export default HomeContentSlider
export { HomeContentSlider }
