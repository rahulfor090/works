import React, { FC, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Slider, { Settings } from 'react-slick'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme, styled, keyframes } from '@mui/material/styles'
import IconArrowBack from '@mui/icons-material/ArrowBack'
import IconArrowForward from '@mui/icons-material/ArrowForward'
import { Fade, Grow, CircularProgress } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import MentorCardItem from '../mentor/mentor-card-item'

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
        background: '#268bbb',
        color: 'white',
        width: 56,
        height: 56,
        boxShadow: '0 8px 25px rgba(38, 139, 187, 0.3)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': { 
          background: '#1b6e93',
          transform: 'scale(1.1)',
          boxShadow: '0 12px 35px rgba(38, 139, 187, 0.4)',
        },
        bottom: '-40px !important',
        left: 'unset !important',
        right: type === 'prev' ? '80px !important' : '0 !important',
        zIndex: 10,
      }}
      disableRipple
      color="inherit"
      onClick={onClick}
      className={className}
    >
      {type === 'next' ? <IconArrowForward sx={{ fontSize: 24 }} /> : <IconArrowBack sx={{ fontSize: 24 }} />}
    </IconButton>
  )
}

const StyledDots = styled('ul')(({ theme }) => ({
  '&.slick-dots': {
    position: 'absolute',
    left: 0,
    bottom: -30,
    paddingLeft: theme.spacing(1),
    textAlign: 'left',
  '& li': {
    marginRight: theme.spacing(2),
    '& > div': {
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(38, 139, 187, 0.3)',
      '&:hover': {
        background: 'rgba(38, 139, 187, 0.6)',
        transform: 'scale(1.2)',
      },
    },
    '&.slick-active > div': {
      background: '#268bbb',
      transform: 'scale(1.3)',
      boxShadow: '0 4px 15px rgba(38, 139, 187, 0.4)',
    },
  },
  },
}))

const HomeOurMentors: FC = () => {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'))
  const [mentors, setMentors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sliderReady, setSliderReady] = useState(false)

  useEffect(() => {
    // Fetch mentors from API
    const fetchMentors = async () => {
      try {
        const response = await fetch('/api/admin/mentors')
        if (response.ok) {
          const data = await response.json()
          const transformedMentors = data
            .filter((mentor: any) => mentor.isActive)
            .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
            .map((mentor: any) => ({
              ...mentor,
              contenttype: mentor.specialty || mentor.category,
              company: mentor.companyLogo ? {
                name: mentor.hospital || mentor.companyName || 'Hospital',
                logo: mentor.companyLogo,
              } : undefined,
            }))
          setMentors(transformedMentors || [])
        }
      } catch (error) {
        console.error('Error loading mentors data:', error)
        // Fallback to sample data
        import('../../data/sampleData').then(({ mentorsData }) => {
          const transformedMentors = mentorsData.map((mentor: any) => ({
            ...mentor,
            contenttype: mentor.specialty || mentor.contenttype,
            company: mentor.companyLogo ? {
              name: mentor.hospital || 'Hospital',
              logo: mentor.companyLogo
            } : undefined
          }))
          setMentors(transformedMentors || [])
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMentors()
  }, [])

  // Add a delay to ensure DOM is ready for slider
  useEffect(() => {
    if (!loading && mentors.length > 0) {
      const timer = setTimeout(() => {
        // Additional check to ensure DOM elements are available
        if (typeof window !== 'undefined' && document.readyState === 'complete') {
          setSliderReady(true)
        } else {
          // Wait for DOM to be ready
          const checkReady = () => {
            if (document.readyState === 'complete') {
              setSliderReady(true)
            } else {
              setTimeout(checkReady, 50)
            }
          }
          checkReady()
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [loading, mentors])

  if (loading || !sliderReady) {
    return (
      <Box 
        sx={{ 
          py: 12, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(236, 243, 243, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
        }}
      >
        <Fade in={true}>
          <Box>
            <CircularProgress 
              size={60} 
              sx={{ 
                color: 'primary.main',
                mb: 3,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }} 
            />
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
              Loading our amazing mentors...
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Preparing the best learning experience for you
            </Typography>
          </Box>
        </Fade>
      </Box>
    )
  }

  // Don't render slider if no mentors available
  if (!mentors || mentors.length === 0) {
    return null
  }

  const sliderConfig: Settings = {
    infinite: mentors.length > 1,
    autoplay: mentors.length > 1,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: matchMobileView ? 1 : Math.min(3, mentors.length),
    slidesToScroll: 1,
    prevArrow: mentors.length > 1 ? <SliderArrow type="prev" /> : undefined,
    nextArrow: mentors.length > 1 ? <SliderArrow type="next" /> : undefined,
    dots: mentors.length > 1,
    appendDots: (dots) => <StyledDots>{dots}</StyledDots>,
    customPaging: () => (
      <Box 
        sx={{ 
          height: 10, 
          width: 40, 
          backgroundColor: 'divider', 
          display: 'inline-block', 
          borderRadius: 6,
          cursor: 'pointer',
        }} 
      />
    ),
  }

  return (
    <Box
      id="mentors"
      sx={{
        pt: { xs: 12, md: 16 },
        pb: { xs: 12, md: 16 },
        background: 'rgba(248, 249, 250, 0.8)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'rgba(38, 139, 187, 0.05)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 3 }}>
              <VisibilityIcon 
                sx={{ 
                  fontSize: 48, 
                  color: 'primary.main',
                  animation: `${float} 3s ease-in-out infinite`,
                }} 
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 48, md: 64 },
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b9d 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: `${fadeInUp} 1s ease-out`,
                  position: 'relative',
                }}
              >
                Most Viewed
              </Typography>
              <TrendingUpIcon 
                sx={{ 
                  fontSize: 48, 
                  color: 'secondary.main',
                  animation: `${pulse} 2s ease-in-out infinite`,
                }} 
              />
            </Box>
            
            <Typography 
              sx={{ 
                color: 'text.secondary', 
                fontSize: '1.2rem',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                animation: `${fadeInUp} 1s ease-out 0.3s both`,
              }}
            >
              Discover our most popular mentors and learn from the best in their fields. 
              Join thousands of students who have already transformed their careers.
            </Typography>

            {/* Stats Section */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 4, 
                mt: 4,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'primary.main',
                    animation: `${slideInLeft} 1s ease-out 0.5s both`,
                  }}
                >
                  50K+
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    animation: `${slideInLeft} 1s ease-out 0.6s both`,
                  }}
                >
                  Students Taught
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'secondary.main',
                    animation: `${fadeInUp} 1s ease-out 0.7s both`,
                  }}
                >
                  4.9
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      sx={{ 
                        fontSize: 16, 
                        color: '#FFD700',
                        animation: `${pulse} 2s ease-in-out infinite ${i * 0.1}s`,
                      }} 
                    />
                  ))}
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    animation: `${fadeInUp} 1s ease-out 0.8s both`,
                  }}
                >
                  Average Rating
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'success.main',
                    animation: `${slideInLeft} 1s ease-out 0.9s both`,
                  }}
                >
                  95%
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    animation: `${slideInLeft} 1s ease-out 1s both`,
                  }}
                >
                  Success Rate
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>

        <Grow in={true} timeout={1000}>
          <Box sx={{ position: 'relative' }}>
            <Slider {...sliderConfig}>
              {mentors.map((item) => (
                <MentorCardItem key={String(item.id)} item={item} />
              ))}
            </Slider>
          </Box>
        </Grow>
      </Container>
    </Box>
  )
}

export default HomeOurMentors
export { HomeOurMentors }
