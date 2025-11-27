import React, { FC, useState, useEffect, useRef as useReactRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { headingFontFamily } from '@/config/theme/typography'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Slider, { Settings } from 'react-slick'

const TestimonialSection = styled(Box)({
  py: { xs: 12, md: 16 },
  backgroundColor: '#FFFFFF',
  position: 'relative',
  overflow: 'hidden',
})

const SlideWrapper = styled(Box)({
  padding: '20px',
  height: '100%',
})

const TestimonialCard = styled(Box)({
  textAlign: 'center',
  padding: '40px 30px',
  backgroundColor: '#F8F6F3',
  borderRadius: '20px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  border: '1px solid rgba(0,0,0,0.05)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
})

const PortraitContainer = styled(Box)({
  width: '100px',
  height: '100px',
  margin: '0 auto 24px',
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
  fontSize: '18px',
  lineHeight: 1.6,
  color: '#1C1C1C',
  fontStyle: 'italic',
  marginBottom: '24px',
  flex: 1,
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

const StyledArrow = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: '#1C1C1C',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  width: '48px',
  height: '48px',
  '&:hover': {
    backgroundColor: '#EEC1B7',
    color: '#FFFFFF',
    borderColor: '#EEC1B7',
    transform: 'translateY(-50%) scale(1.1)',
  },
})

const PrevArrow = styled(StyledArrow)({
  left: '-20px',
  '@media (max-width: 600px)': {
    left: '-10px',
  },
})

const NextArrow = styled(StyledArrow)({
  right: '-20px',
  '@media (max-width: 600px)': {
    right: '-10px',
  },
})

const HomeTestimonial: FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sliderReady, setSliderReady] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const sliderRef = useReactRef<Slider>(null)

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
              user: { name: 'Dr. Sarah Johnson', professional: 'Medical Researcher', photo: '/images/avatars/1.jpg' },
            },
            {
              id: 2,
              content: 'A beautiful blend of knowledge and inspiration. The resources here are invaluable for my work.',
              user: { name: 'Prof. Michael Chen', professional: 'Academic Scholar', photo: '/images/avatars/2.jpg' },
            },
            {
              id: 3,
              content: 'The elegant design makes learning a joy. I find myself exploring new topics every day.',
              user: { name: 'Dr. Emily Rodriguez', professional: 'Clinical Practitioner', photo: '/images/avatars/3.jpg' },
            },
            {
              id: 4,
              content: 'An indispensable tool for modern medical education. Highly recommended for students and pros alike.',
              user: { name: 'Dr. James Wilson', professional: 'Cardiologist', photo: '/images/avatars/4.jpg' },
            },
            {
              id: 5,
              content: 'The depth of content available here is unmatched. It has become my go-to reference.',
              user: { name: 'Dr. Lisa Chang', professional: 'Neurologist', photo: '/images/avatars/5.jpg' },
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

    // Initialize slider
    const timer = setTimeout(() => {
      setSliderReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const PrevArrowComponent = (props: any) => (
    <PrevArrow onClick={props.onClick} aria-label="Previous slide">
      <ChevronLeft />
    </PrevArrow>
  )

  const NextArrowComponent = (props: any) => (
    <NextArrow onClick={props.onClick} aria-label="Next slide">
      <ChevronRight />
    </NextArrow>
  )

  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: <PrevArrowComponent />,
    nextArrow: <NextArrowComponent />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  }

  if (loading) {
    return null
  }

  return (
    <TestimonialSection id="testimonial" ref={ref}>
      <Container maxWidth="lg">
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

        {sliderReady && testimonials.length > 0 && (
          <Box sx={{ px: { xs: 2, md: 4 } }}>
            <Slider ref={sliderRef} {...sliderSettings}>
              {testimonials.map((item) => (
                <SlideWrapper key={item.id}>
                  <TestimonialCard>
                    {item.user?.photo ? (
                      <PortraitContainer>
                        <Image
                          src={item.user.photo}
                          alt={item.user.name || 'Testimonial'}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </PortraitContainer>
                    ) : (
                      <PortraitContainer sx={{ bgcolor: '#eee' }} />
                    )}
                    <QuoteText>
                      &quot;{item.content || item.title}&quot;
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
                </SlideWrapper>
              ))}
            </Slider>
          </Box>
        )}
      </Container>
    </TestimonialSection>
  )
}

export default HomeTestimonial
export { HomeTestimonial }
