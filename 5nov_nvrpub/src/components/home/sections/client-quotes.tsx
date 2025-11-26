import React, { FC, useState, useEffect, useRef as useReactRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import StarIcon from '@mui/icons-material/Star'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { headingFontFamily } from '@/config/theme/typography'
import Slider, { Settings } from 'react-slick'

const TestimonialCard = styled(Box)({
  backgroundColor: '#F8F6F3',
  borderRadius: '8px',
  padding: '40px',
  position: 'relative',
  borderTop: '3px solid #EEC1B7',
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
})

const QuoteIcon = styled(Box)({
  position: 'absolute',
  top: '20px',
  left: '20px',
  color: '#EEC1B7',
  fontSize: '64px',
  lineHeight: 1,
  opacity: 0.3,
})

const QuoteText = styled(Typography)(({ theme }) => ({
  fontFamily: headingFontFamily,
  fontSize: '18px',
  [theme.breakpoints.up('md')]: {
    fontSize: '20px',
  },
  lineHeight: 1.8,
  color: '#1C1C1C',
  fontStyle: 'italic',
  marginLeft: '24px',
  paddingLeft: '16px',
  borderLeft: '3px solid #EEC1B7',
  marginTop: '60px',
  marginBottom: '32px',
  flex: 1,
}))

const ClientInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginTop: 'auto',
})

const ClientLogo = styled(Box)({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid rgba(28, 28, 28, 0.1)',
  overflow: 'hidden',
  flexShrink: 0,
})

const ClientDetails = styled(Box)({
  flex: 1,
})

const ClientName = styled(Typography)({
  fontFamily: headingFontFamily,
  fontSize: '16px',
  fontWeight: 600,
  color: '#1C1C1C',
  marginBottom: '4px',
})

const ClientTitle = styled(Typography)({
  fontSize: '0.875rem',
  color: '#717171',
  lineHeight: 1.5,
})

const StarRating = styled(Box)({
  display: 'flex',
  gap: '4px',
  marginTop: '8px',
})

const NavigationDots = styled(Box)({
  display: 'flex',
  gap: '8px',
  justifyContent: 'flex-end',
  marginTop: '24px',
})

const Dot = styled(Box)<{ active?: boolean }>(({ active }) => ({
  width: active ? '24px' : '8px',
  height: '8px',
  borderRadius: '4px',
  backgroundColor: active ? '#EEC1B7' : 'rgba(28, 28, 28, 0.2)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
}))

const SpeechBubbleGraphic = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const SpeechBubble = styled(motion.div)<{ color: string; size: number; top: number; left: number }>(
  ({ color, size, top, left }) => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: color,
    opacity: 0.6,
    top: `${top}%`,
    left: `${left}%`,
    filter: 'blur(1px)',
  })
)

const HomeClientQuotes: FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderReady, setSliderReady] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const sliderRef = useReactRef<Slider>(null)

  useEffect(() => {
    // Set fallback testimonials immediately so content is always visible
    const fallbackTestimonials = [
      {
        id: 1,
        content:
          'It is a very complete and up-to-date platform that could be applied to all levels of Medicine — from undergraduate to postgraduate and continuing medical education.',
        user: {
          name: 'Dra. Blanca Alicia Chong Martínez',
          professional:
            'Jefe de Educación Médica Continua / Head of Basic Science and Continuous Medical Education, Facultad Mexicana de Medicina (ULSA), Mexico',
          photo: '/images/testimonial-1761307085040.jpg',
        },
        rating: 5,
      },
      {
        id: 2,
        content:
          'Many thanks to JaypeeDigital platform, which has been an indispensable easy-to-use source for our academic staff with its comprehensive and up-to-date coverage of medical and allied subjects.',
        user: {
          name: 'Ozlem YALCINKAYA',
          professional: 'Library Director, Bezmialem Vakif University, Turkey',
          photo: '/images/testimonial-1761307085040.jpg',
        },
        rating: 5,
      },
      {
        id: 3,
        content:
          'JaypeeDigital site offers to our students a huge number of medical publications such as textbooks, atlases and reference works — a real asset for our teaching programmes.',
        user: {
          name: 'Dr Jesus Tapia Jurado',
          professional:
            'Chief – Surgery Department, Faculty of Medicine, Universidad Nacional Autónoma de México (UNAM), Mexico DF, Mexico',
          photo: '/images/testimonial-1761307251123.jpg',
        },
        rating: 5,
      },
      {
        id: 4,
        content:
          'With its user-friendly interface, JaypeeDigital provides extensive coverage in medicine, dentistry and allied health disciplines — enabling us to support students and faculty with a reliable digital resource.',
        user: {
          name: 'Wan Suhaimi Ariffin, MLS (Syracuse), BLS (UITM)',
          professional:
            'Head, The National University of Malaysia (UKM) Medical Centre Library, Kuala Lumpur, Malaysia',
          photo: '/images/testimonial-1761307265953.jpg',
        },
        rating: 5,
      },
    ]

    // Set fallback first so content shows immediately
    setTestimonials(fallbackTestimonials)
    setLoading(false)

    // Then try to fetch from API
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0) {
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
              rating: 5, // Default 5 stars
            }))
            setTestimonials(transformedData)
          }
        }
      } catch (error) {
        console.error('Error loading testimonials:', error)
        // Keep fallback testimonials if API fails
      }
    }
    fetchTestimonials()

    // Ensure slider initializes after DOM is ready
    const timer = setTimeout(() => {
      setSliderReady(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const sliderSettings: Settings = {
    dots: false,
    infinite: testimonials.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: testimonials.length > 1,
    autoplaySpeed: 5000,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    arrows: false,
    lazyLoad: 'ondemand' as const,
  }

  const bubbles = [
    { color: 'rgba(238, 193, 183, 0.4)', size: 120, top: 10, left: 20 },
    { color: 'rgba(216, 177, 121, 0.4)', size: 100, top: 30, left: 60 },
    { color: 'rgba(238, 193, 183, 0.3)', size: 140, top: 50, left: 15 },
    { color: 'rgba(216, 177, 121, 0.3)', size: 90, top: 70, left: 55 },
    { color: 'rgba(238, 193, 183, 0.35)', size: 110, top: 20, left: 75 },
  ]

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: '#FFFFFF',
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
              component="h2"
              variant="h2"
              sx={{
                fontFamily: headingFontFamily,
                fontSize: { xs: '32px', md: '48px' },
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: '#1C1C1C',
                mb: 2,
                '& .highlight': {
                  color: '#EEC1B7',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '4px',
                    left: 0,
                    right: 0,
                    height: '8px',
                    backgroundColor: '#D8B179',
                    opacity: 0.4,
                    borderRadius: '2px',
                  },
                },
              }}
            >
              What our <span className="highlight">Clients</span> Say
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1rem',
                color: '#717171',
                lineHeight: 1.7,
                maxWidth: '600px',
              }}
            >
              Discover what our satisfied clients have to say about their experience working with us.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid item xs={12} md={7}>
            <TestimonialCard>
              <QuoteIcon>
                <FormatQuoteIcon sx={{ fontSize: 64, color: '#EEC1B7' }} />
              </QuoteIcon>

              {sliderReady && testimonials.length > 0 ? (
                <Slider ref={sliderRef} {...sliderSettings}>
                  {testimonials.map((item, index) => (
                    <Box key={item.id || index}>
                      <QuoteText>{item.content || item.title}</QuoteText>
                      <ClientInfo>
                        {item.user?.logo && (
                          <ClientLogo>
                            <Image
                              src={item.user.logo}
                              alt={item.user.name || 'Client'}
                              width={60}
                              height={60}
                              style={{ objectFit: 'contain', padding: '8px' }}
                            />
                          </ClientLogo>
                        )}
                        {item.user?.photo && !item.user?.logo && (
                          <ClientLogo>
                            <Image
                              src={item.user.photo}
                              alt={item.user.name || 'Client'}
                              width={60}
                              height={60}
                              style={{ objectFit: 'cover' }}
                            />
                          </ClientLogo>
                        )}
                        <ClientDetails>
                          <ClientName>{item.user?.name || 'Anonymous'}</ClientName>
                          <ClientTitle>{item.user?.professional || 'Client'}</ClientTitle>
                          <StarRating>
                            {[...Array(item.rating || 5)].map((_, i) => (
                              <StarIcon key={i} sx={{ fontSize: 18, color: '#D8B179' }} />
                            ))}
                          </StarRating>
                        </ClientDetails>
                      </ClientInfo>
                    </Box>
                  ))}
                </Slider>
              ) : (
                testimonials.length > 0 && (
                  <Box>
                    <QuoteText>{testimonials[0].content || testimonials[0].title}</QuoteText>
                    <ClientInfo>
                      {testimonials[0].user?.photo && (
                        <ClientLogo>
                          <Image
                            src={testimonials[0].user.photo}
                            alt={testimonials[0].user.name || 'Client'}
                            width={60}
                            height={60}
                            style={{ objectFit: 'cover' }}
                          />
                        </ClientLogo>
                      )}
                      <ClientDetails>
                        <ClientName>{testimonials[0].user?.name || 'Anonymous'}</ClientName>
                        <ClientTitle>{testimonials[0].user?.professional || 'Client'}</ClientTitle>
                        <StarRating>
                          {[...Array(testimonials[0].rating || 5)].map((_, i) => (
                            <StarIcon key={i} sx={{ fontSize: 18, color: '#D8B179' }} />
                          ))}
                        </StarRating>
                      </ClientDetails>
                    </ClientInfo>
                  </Box>
                )
              )}

              {testimonials.length > 1 && (
                <NavigationDots>
                  {testimonials.map((_, index) => (
                    <Dot
                      key={index}
                      active={index === currentSlide}
                      onClick={() => {
                        sliderRef.current?.slickGoTo(index)
                        setCurrentSlide(index)
                      }}
                    />
                  ))}
                </NavigationDots>
              )}
            </TestimonialCard>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <SpeechBubbleGraphic>
              {bubbles.map((bubble, index) => (
                <SpeechBubble
                  key={index}
                  color={bubble.color}
                  size={bubble.size}
                  top={bubble.top}
                  left={bubble.left}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 0.6 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                />
              ))}
              <Typography
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  fontFamily: headingFontFamily,
                  fontSize: '64px',
                  fontWeight: 700,
                  color: '#EEC1B7',
                  opacity: 0.3,
                  transform: 'rotate(-5deg)',
                  letterSpacing: '0.1em',
                }}
              >
                TESTIMONIALS
              </Typography>
            </SpeechBubbleGraphic>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomeClientQuotes
export { HomeClientQuotes }
