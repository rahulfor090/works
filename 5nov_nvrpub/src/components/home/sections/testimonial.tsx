import React, { FC, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { headingFontFamily } from '@/config/theme/typography'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const TestimonialCard = styled(motion.div)({
  textAlign: 'center',
  padding: '60px 40px',
  maxWidth: '800px',
  margin: '0 auto',
  backfaceVisibility: 'hidden',
  WebkitFontSmoothing: 'subpixel-antialiased',
  transform: 'translateZ(0)',
  willChange: 'transform',
})

const PortraitContainer = styled(Box)({
  width: '120px',
  height: '120px',
  margin: '0 auto 30px',
  borderRadius: '50%',
  overflow: 'hidden',
  border: '3px solid #EEC1B7',
  position: 'relative',
  filter: 'grayscale(100%)',
  transition: 'all 0.4s ease',
        '&:hover': { 
    filter: 'grayscale(0%)',
    transform: 'scale(1.05)',
    borderColor: '#D8B179',
        },
})

const QuoteText = styled(Typography)({
  fontFamily: headingFontFamily,
  fontSize: '28px',
  lineHeight: 1.6,
  color: '#1C1C1C',
  fontStyle: 'italic',
  marginBottom: '30px',
  position: 'relative',
  '&::before': {
    content: '"',
    fontSize: '80px',
    lineHeight: 1,
    color: '#EEC1B7',
    position: 'absolute',
    top: '-20px',
    left: '-30px',
    fontFamily: headingFontFamily,
    opacity: 0.3,
  },
  '&::after': {
    content: '"',
    fontSize: '80px',
    lineHeight: 1,
    color: '#EEC1B7',
    position: 'absolute',
    bottom: '-60px',
    right: '-30px',
    fontFamily: headingFontFamily,
    opacity: 0.3,
  },
})

const HomeTestimonial: FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const autoPlayInterval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        if (response.ok) {
          const data = await response.json()
          const transformedData = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            user: {
              id: item.id,
              name: item.userName,
              professional: item.professional,
              photo: item.photo,
            },
          }))
          setTestimonials(transformedData || [])
        } else {
          // Fallback to sample data
          setTestimonials([
            {
              id: 1,
              content: 'This platform has transformed how I access medical research. The curated collections are exceptional.',
              user: { name: 'Dr. Sarah Johnson', professional: 'Medical Researcher' },
            },
            {
              id: 2,
              content: 'A beautiful blend of knowledge and inspiration. The resources here are invaluable for my work.',
              user: { name: 'Prof. Michael Chen', professional: 'Academic Scholar' },
            },
            {
              id: 3,
              content: 'The elegant design makes learning a joy. I find myself exploring new topics every day.',
              user: { name: 'Dr. Emily Rodriguez', professional: 'Clinical Practitioner' },
            },
          ])
        }
      } catch (error) {
        console.error('Error loading testimonials:', error)
          setTestimonials([])
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const handleNext = useCallback(() => {
    setDirection('right')
    setCurrentIndex(prevIndex => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }, [testimonials.length])

  const handlePrev = useCallback(() => {
    setDirection('left')
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }, [testimonials.length])

  useEffect(() => {
    if (isAutoPlaying && !loading && testimonials.length > 0) {
      autoPlayInterval.current = setInterval(() => {
        handleNext()
      }, 5000)
    }
    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current)
      }
    }
  }, [isAutoPlaying, loading, testimonials.length, handleNext])

  if (loading || testimonials.length === 0) {
    return null
  }

  // Show only 3 testimonials at a time in the carousel
  const displayTestimonials = testimonials.slice(0, Math.min(10, testimonials.length))
  
  const slideVariants = {
    hiddenRight: {
      x: '100%',
      opacity: 0.5,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4
      }
    },
    hiddenLeft: {
      x: '-100%',
      opacity: 0.5,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4
      }
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4
      }
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? '-100%' : '100%',
      opacity: 0.5,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4
      }
    }),
  }

  return (
    <Box
      id="testimonial"
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
              Impact Stories
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
              }}
            >
              What Our Community Says
            </Typography>
          </Box>
        </motion.div>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            overflow: 'hidden',
            padding: { xs: '0 20px', md: '0 40px' },
          }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: { xs: 0, md: -40 },
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
            aria-label="previous testimonial"
          >
            <ArrowBackIosIcon />
          </IconButton>

          <Box
            sx={{
              position: 'relative',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
                animate="visible"
                exit="exit"
                style={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: '800px',
                  margin: '0 auto',
                  willChange: 'transform, opacity',
                }}
              >
                <TestimonialCard>
                  {displayTestimonials[currentIndex]?.user?.photo && (
                    <PortraitContainer>
                      <Image
                        src={displayTestimonials[currentIndex].user.photo}
                        alt={displayTestimonials[currentIndex].user.name || 'Testimonial'}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </PortraitContainer>
                  )}
                  <QuoteText
                    sx={{
                      fontSize: { xs: '20px', md: '24px' },
                      minHeight: { xs: '120px', md: '140px' },
                    }}
                  >
                    {displayTestimonials[currentIndex]?.content || displayTestimonials[currentIndex]?.title}
                  </QuoteText>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: headingFontFamily,
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#1C1C1C',
                        mb: 0.5,
                      }}
                    >
                      {displayTestimonials[currentIndex]?.user?.name || 'Anonymous'}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontSize: '0.875rem',
                        letterSpacing: '0.1em',
                        color: '#717171',
                        textTransform: 'uppercase',
                      }}
                    >
                      {displayTestimonials[currentIndex]?.user?.professional || 'Member'}
                    </Typography>
                  </Box>
                </TestimonialCard>
              </motion.div>
            </AnimatePresence>
          </Box>

          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: { xs: 0, md: -40 },
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
            aria-label="next testimonial"
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Dots indicator */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
              gap: 1,
            }}
          >
            {displayTestimonials.map((_, index) => (
              <Box
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 'right' : 'left')
                  setCurrentIndex(index)
                }}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: index === currentIndex ? '#EEC1B7' : '#E0E0E0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: index === currentIndex ? '#D8B179' : '#BDBDBD',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HomeTestimonial
export { HomeTestimonial }
