import React, { FC, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { headingFontFamily } from '@/config/theme/typography'

const TestimonialCard = styled(motion.div)({
  textAlign: 'center',
  padding: '60px 40px',
  maxWidth: '800px',
  margin: '0 auto',
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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

  if (loading || testimonials.length === 0) {
    return null
  }

  // Show first 3 testimonials
  const displayTestimonials = testimonials.slice(0, 3)

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
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 6, md: 4 },
            mt: { xs: 4, md: 8 },
                }}
              >
          {displayTestimonials.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <TestimonialCard>
                {item.user?.photo && (
                  <PortraitContainer>
                    <Image
                      src={item.user.photo}
                      alt={item.user.name || 'Testimonial'}
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
                  {item.content || item.title}
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
                    {item.user?.name || 'Anonymous'}
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
                    {item.user?.professional || 'Member'}
              </Typography>
            </Box>
              </TestimonialCard>
            </motion.div>
          ))}
            </Box>
      </Container>
    </Box>
  )
}

export default HomeTestimonial
export { HomeTestimonial }
