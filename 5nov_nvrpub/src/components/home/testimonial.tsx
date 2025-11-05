import React, { FC, useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Slider, { Settings } from 'react-slick'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import IconArrowBack from '@mui/icons-material/ArrowBack'
import IconArrowForward from '@mui/icons-material/ArrowForward'

import { TestimonialItem } from '@/components/testimonial'

interface SliderArrowArrow {
  onClick?: () => void
  type: 'next' | 'prev'
  className?: 'string'
}

const SliderArrow: FC<SliderArrowArrow> = (props) => {
  const { onClick, type, className } = props
  return (
    <IconButton
      sx={{
        position: 'absolute',
        width: 48,
        height: 48,
        backgroundColor: 'background.paper',
        color: 'primary.main',
        border: '2px solid',
        borderColor: 'primary.light',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { 
          backgroundColor: 'primary.main', 
          color: 'primary.contrastText',
          borderColor: 'primary.main',
          transform: 'scale(1.1)',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
        },
        bottom: { xs: '-40px !important', md: '50px !important' },
        left: 'unset !important',
        right: type === 'prev' ? '100px !important' : '40px !important',
        zIndex: 10,
      }}
      disableRipple
      color="inherit"
      onClick={onClick}
      className={className}
    >
      {type === 'next' ? (
        <IconArrowForward sx={{ fontSize: 24 }} />
      ) : (
        <IconArrowBack sx={{ fontSize: 24 }} />
      )}
    </IconButton>
  )
}

const StyledSlickContainer = styled('div')(() => ({
  position: 'relative',
  '& .slick-list': { 
    marginLeft: '-30px', 
    marginBottom: '60px',
  },
  '& .slick-track': {
    display: 'flex',
    alignItems: 'stretch',
  },
  '& .slick-slide': {
    height: 'auto',
    '& > div': {
      height: '100%',
    }
  }
}))

const HomeTestimonial: FC = () => {
  const sliderRef = useRef<Slider>(null)
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sliderReady, setSliderReady] = useState(false)

  useEffect(() => {
    // Fetch testimonials from API
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        if (response.ok) {
          const data = await response.json()
          // Transform database format to component format
          const transformedData = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            user: {
              id: item.id,
              name: item.userName,
              professional: item.professional,
              photo: item.photo
            }
          }))
          setTestimonials(transformedData || [])
        } else {
          // Fallback to sample data if API fails
          const { testimonialsData } = await import('@/data/sampleData')
          setTestimonials(testimonialsData || [])
        }
      } catch (error) {
        console.error('Error loading testimonials data:', error)
        // Fallback to sample data on error
        try {
          const { testimonialsData } = await import('@/data/sampleData')
          setTestimonials(testimonialsData || [])
        } catch (fallbackError) {
          console.error('Error loading fallback testimonials data:', fallbackError)
          setTestimonials([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Enhanced DOM readiness check for Turbopack compatibility
  useEffect(() => {
    if (!loading && testimonials.length > 0) {
      const initializeSlider = () => {
        // Multiple checks for Turbopack compatibility
        if (typeof window === 'undefined') return false
        
        // Check if document is ready
        if (document.readyState !== 'complete') return false
        
        // Additional check for DOM elements with proper typing
        const sliderContainer = document.querySelector('.slick-slider') as HTMLElement | null
        if (!sliderContainer) return false
        if (sliderContainer && sliderContainer.offsetHeight === 0) return false      
        return true
      }

      const timer = setTimeout(() => {
        if (initializeSlider()) {
          setSliderReady(true)
        } else {
          // Recursive check with longer intervals for Turbopack
          const checkReady = (attempts = 0) => {
            if (attempts > 20) {
              // Fallback: initialize anyway after max attempts
              setSliderReady(true)
              return
            }
            
            if (initializeSlider()) {
              setSliderReady(true)
            } else {
              setTimeout(() => checkReady(attempts + 1), 100)
            }
          }
          checkReady()
        }
      }, 200) // Increased initial delay for Turbopack
      
      return () => clearTimeout(timer)
    }
  }, [loading, testimonials])

  if (loading || !sliderReady) {
    return (
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Typography>Loading testimonials...</Typography>
      </Box>
    )
  }

  // Don't render slider if no testimonials available
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const sliderConfig: Settings = {
    infinite: testimonials.length > 1,
    autoplay: testimonials.length > 1,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: testimonials.length > 1 ? <SliderArrow type="prev" /> : undefined,
    nextArrow: testimonials.length > 1 ? <SliderArrow type="next" /> : undefined,
  }

  return (
    <Box id="testimonial" sx={{ pb: { xs: 6, md: 10 }, backgroundColor: 'background.paper' }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              
              <Typography
                component="h2"
                sx={{
                  position: 'relative',
                  fontSize: { xs: 32, md: 48 },
                  lineHeight: { xs: 1.2, md: 1.1 },
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                What our{' '}
                <Typography
                  component="span"
                  sx={{
                    position: 'relative',
                    color: 'primary.main',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    display: 'inline-block',
                  }}
                >
                  Clients
                  <Box
                    sx={{
                      position: 'absolute',
                      top: { xs: 22, md: 32 },
                      left: 0,
                      right: 0,
                      '& img': { width: '100%', height: 'auto' },
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/headline-curve.svg" alt="Headline curve" />
                  </Box>
                </Typography>
                {' '}Say
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.6,
                  maxWidth: { xs: '100%', md: '90%' },
                }}
              >
                Discover what our satisfied clients have to say about their experience working with us.
              </Typography>
            </Box>

             <StyledSlickContainer>
               <Slider ref={sliderRef} {...sliderConfig}>
                 {loading ? (
                   <Box sx={{ textAlign: 'center', py: 4 }}>
                     <Typography>Loading testimonials...</Typography>
                   </Box>
                 ) : testimonials.length > 0 ? (
                   testimonials.map((item, index) => (
                     <TestimonialItem key={String(index)} item={item} />
                   ))
                 ) : (
                   <Box sx={{ textAlign: 'center', py: 4 }}>
                     <Typography>No testimonials found.</Typography>
                   </Box>
                 )}
               </Slider>
             </StyledSlickContainer>
           </Grid>
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ width: { xs: '80%', md: '90%' } }}>
              <Image src="/images/home-testimonial.png" width={520} height={540} quality={97} alt="Testimonial img" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomeTestimonial
export { HomeTestimonial }



