import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link as ScrollLink } from 'react-scroll'
import { StyledButton } from '@/components/styled-button'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Slider, { Settings } from 'react-slick'
import { useTheme, styled, keyframes } from '@mui/material/styles'
import { IconButton, useMediaQuery, Fade, Grow } from '@mui/material'
import IconArrowBack from '@mui/icons-material/ArrowBack'
import IconArrowForward from '@mui/icons-material/ArrowForward'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import QuizIcon from '@mui/icons-material/Quiz'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import SchoolIcon from '@mui/icons-material/School'
import ArticleIcon from '@mui/icons-material/Article'
import { AdvancedSearchSlider } from '@/components/search'

interface Exp {
  label: string
  value: string
}

interface ExpItemProps {
  item: Exp
}

interface HeroSlide {
  id: number
  title: string
  highlightedWord: string
  subtitle: string
  image: string
  buttons: Array<{
    label: string
    variant: 'contained' | 'outlined'
    icon?: boolean
    scrollTo: string
  }>
}

interface SliderArrowProps {
  onClick?: () => void
  type: 'next' | 'prev'
  className?: string
}

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
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
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
    transform: translateY(-10px);
  }
`

const SliderArrow: FC<SliderArrowProps> = ({ onClick, type, className }) => {
  const theme = useTheme()
  
  return (
    <IconButton
      onClick={onClick}
      className={className}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        backgroundColor: 'background.paper',
        color: 'primary.main',
        width: 56,
        height: 56,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid',
        borderColor: 'divider',
        ...(type === 'prev' ? { left: 24 } : { right: 24 }),
        '&:hover': {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          transform: 'translateY(-50%) scale(1.1)',
          boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)',
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {type === 'prev' ? <IconArrowBack /> : <IconArrowForward />}
    </IconButton>
  )
}

const StyledDots = styled('ul')(({ theme }) => ({
  '&.slick-dots': {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex !important',
    gap: theme.spacing(1.5),
    '& li': {
      margin: 0,
      width: 'auto',
      height: 'auto',
      '& > div': {
        transition: 'all 0.3s ease',
      },
      '&.slick-active > div': {
        backgroundColor: theme.palette.primary.main,
        width: 50,
          boxShadow: '0 4px 16px rgba(38, 139, 187, 0.4)',
      },
      '&:hover > div': {
        backgroundColor: theme.palette.primary.light,
        transform: 'scale(1.2)',
      },
    },
  },
}))

const ExpItem: FC<ExpItemProps> = ({ item }) => {
  const theme = useTheme()
  
  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'years of experience':
        return <RocketLaunchIcon sx={{ fontSize: 32, color: 'primary.main' }} />
      case 'happy clients':
        return <TrendingUpIcon sx={{ fontSize: 32, color: 'primary.main' }} />
      case 'projects completed':
        return <MenuBookIcon sx={{ fontSize: 32, color: 'primary.main' }} />
      case 'awards won':
        return <PlayCircleOutlineIcon sx={{ fontSize: 32, color: 'primary.main' }} />
      case 'courses':
        return <SchoolIcon sx={{ fontSize: 32, color: 'primary.main' }} />
      case 'students':
        return <QuizIcon sx={{ fontSize: 32, color: 'primary.main' }} />
      case 'success rate':
        return <LocalHospitalIcon sx={{ fontSize: 32, color: 'primary.main' }} />
      case 'articles':
        return <ArticleIcon sx={{ fontSize: 32, color: 'primary.main' }} />
      default:
        return <RocketLaunchIcon sx={{ fontSize: 32, color: 'primary.main' }} />
    }
  }

  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 3,
        borderRadius: 3,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          background: 'rgba(255, 255, 255, 0.15)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        {getIcon(item.label)}
      </Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: 'white',
          mb: 1,
          fontSize: { xs: '2rem', md: '2.5rem' },
        }}
      >
        {item.value}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: { xs: '1.1rem', md: '1.2rem' },
          fontWeight: 500,
        }}
      >
        {item.label}
      </Typography>
    </Box>
  )
}

const HomeHero: FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [exps, setExps] = useState<Exp[]>([])

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // Fetch slides from the same API as admin panel
        const slidesResponse = await fetch('/api/slides')
        if (slidesResponse.ok) {
          const slidesData = await slidesResponse.json()
          
          // Filter only active slides and format image paths
          const activeSlides = slidesData
            .filter((slide: any) => slide.isActive)
            .map((slide: any) => ({
              ...slide,
              // Format image path: add /images/sliders/ prefix if it's just a filename
              image: slide.image.startsWith('/') || slide.image.startsWith('http')
                ? slide.image
                : `/images/sliders/${slide.image}`
            }))
          
          setHeroSlides(activeSlides)
        }

        // Fetch stats from hero API
        const statsResponse = await fetch('/api/hero')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setExps(statsData.stats || [])
        }
      } catch (error) {
        console.error('Error fetching hero data:', error)
        // Fallback to empty arrays if API fails
        setHeroSlides([])
        setExps([])
      }
    }

    fetchHeroData()
  }, [])

  // Don't render slider if no slides available
  if (!heroSlides || heroSlides.length === 0) {
    return (
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Typography>No hero content available</Typography>
      </Box>
    )
  }

  // Collect all unique buttons from all slides
  const allButtons = heroSlides.reduce((acc, slide) => {
    slide.buttons?.forEach(button => {
      // Check if button with same label and scrollTo already exists
      const exists = acc.some(existingButton => 
        existingButton.label === button.label && existingButton.scrollTo === button.scrollTo
      )
      if (!exists) {
        acc.push(button)
      }
    })
    return acc
  }, [] as Array<{
    label: string
    variant: 'contained' | 'outlined'
    icon?: boolean
    scrollTo: string
  }>)

  const sliderConfig: Settings = {
    infinite: heroSlides.length > 1,
    autoplay: heroSlides.length > 1,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: heroSlides.length > 1 ? <SliderArrow type="prev" /> : undefined,
    nextArrow: heroSlides.length > 1 ? <SliderArrow type="next" /> : undefined,
    dots: heroSlides.length > 1,
    dotsClass: 'slick-dots',
    customPaging: () => (
      <Box
        sx={{
          height: 8,
          width: 30,
          cursor: 'pointer',
          backgroundColor: 'divider',
          borderRadius: 2,
          transition: 'all .5s ease',
        }}
      />
    ),
  }

  return (
    <Box 
      id="hero" 
      sx={{ 
        backgroundColor: 'background.paper', 
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }
      }}
    >
      <StyledDots />
      {heroSlides.length === 1 ? (
        // Render single slide without slider
        <Fade in timeout={1000}>
          <Box sx={{ pt: 4, pb: { xs: 8, md: 10 } }}>
            <Container maxWidth="lg">
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={12} md={7}>
                  <Box sx={{ pr: { xs: 0, md: 4 } }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        component="h2"
                        sx={{
                          position: 'relative',
                          fontSize: { xs: 40, md: 72 },
                          letterSpacing: 1.5,
                          fontWeight: 'bold',
                          lineHeight: 1.3,
                          animation: `${slideInLeft} 0.8s ease-out`,
                        }}
                      >
                        {heroSlides[0].title}{' '}
                        <Typography
                          component="mark"
                          sx={{
                            position: 'relative',
                            color: 'primary.main',
                            fontSize: 'inherit',
                            fontWeight: 'inherit',
                            backgroundColor: 'unset',
                          }}
                        >
                          {heroSlides[0].highlightedWord.split(' ')[0]}{' '}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: { xs: 24, md: 44 },
                              left: '50%',
                              transform: 'translateX(-50%) rotate(3deg)',
                              '& img': { width: { xs: 146, md: 280 }, height: 'auto' },
                            }}
                          >
                            <img src="/images/headline-curve.svg" alt="Headline curve" />
                          </Box>
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            fontSize: 'inherit',
                            fontWeight: 'inherit',
                            position: 'relative',
                            '& svg': {
                              position: 'absolute',
                              top: -16,
                              right: -21,
                              width: { xs: 22, md: 30 },
                              height: 'auto',
                            },
                          }}
                        >
                          {heroSlides[0].highlightedWord.split(' ')[1]}
                          <svg version="1.1" viewBox="0 0 3183 3072">
                            <g id="Layer_x0020_1">
                              <path
                                fill="#268bbb"
                                d="M2600 224c0,0 0,0 0,0 236,198 259,562 52,809 -254,303 -1849,2089 -2221,1776 -301,-190 917,-1964 1363-2496 207,-247 570,-287 806-89z"
                              />
                              <path
                                fill="#268bbb"
                                d="M3166 2190c0,0 0,0 0,0 64,210 -58,443 -270,516 -260,90 -1848,585 -1948,252 -104,-230 1262,-860 1718-1018 212,-73 437,39 500,250z"
                              />
                              <path
                                fill="#268bbb"
                                d="M566 3c0,0 0,0 0,0 -219,-26 -427,134 -462,356 -44,271 -255,1921 90,1962 245,62 628,-1392 704,-1869 36,-221 -114,-424 -332,-449z"
                              />
                            </g>
                          </svg>
                        </Typography>
                      </Typography>
                      
                      {/* Subtitle on separate line */}
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          fontSize: { xs: '1rem', md: '1.25rem' },
                          animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
                          mt: 2,
                          display: 'block',
                        }}
                      >
                        {heroSlides[0].subtitle}
                      </Typography>
                    </Box>

                    
                    {/* Advanced Search Slider */}
                    <Box 
                      sx={{ 
                        animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
                      }}
                    >
                      <AdvancedSearchSlider />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Box 
                    sx={{ 
                      '& img': { 
                        width: '100%', 
                        height: 'auto',
                        borderRadius: 3,
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                      },
                      animation: `${slideInRight} 0.8s ease-out 0.3s both`,
                      '&:hover img': {
                        transform: 'scale(1.02)',
                        transition: 'transform 0.3s ease',
                      }
                    }}
                  >
                    <Image src={heroSlides[0].image} width={650} height={678} quality={97} alt="Hero img" />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Fade>
      ) : (
        // Render multiple slides with slider
        <Slider {...sliderConfig}>
          {heroSlides.map((slide) => (
            <Box key={slide.id} sx={{ pt: 2, pb: { xs: 4, md: 6 } }}>
              <Container maxWidth="lg">
                <Grid container spacing={0} alignItems="center">
                  <Grid item xs={12} md={7}>
                    <Box sx={{ pr: { xs: 0, md: 4 } }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          component="h2"
                          sx={{
                            position: 'relative',
                            fontSize: { xs: 40, md: 60 },
                            letterSpacing: 1.5,
                            fontWeight: 'bold',
                            lineHeight: 1.3,
                          }}
                        >
                          {slide.title}{' '}
                          <Typography
                            component="mark"
                            sx={{
                              position: 'relative',
                              color: 'primary.main',
                              fontSize: 'inherit',
                              fontWeight: 'inherit',
                              backgroundColor: 'unset',
                            }}
                          >
                            {slide.highlightedWord.split(' ')[0]}{' '}
                            <Box
                              sx={{
                                position: 'absolute',
                                top: { xs: 24, md: 44 },
                                left: '50%',
                                transform: 'translateX(-50%) rotate(3deg)',
                                '& img': { width: { xs: 146, md: 280 }, height: 'auto' },
                              }}
                            >
                              <img src="/images/headline-curve.svg" alt="Headline curve" />
                            </Box>
                          </Typography>
                          <Typography
                            component="span"
                            sx={{
                              fontSize: 'inherit',
                              fontWeight: 'inherit',
                              position: 'relative',
                              '& svg': {
                                position: 'absolute',
                                top: -16,
                                right: -21,
                                width: { xs: 22, md: 30 },
                                height: 'auto',
                              },
                            }}
                          >
                            {slide.highlightedWord.split(' ')[1]}
                            <svg version="1.1" viewBox="0 0 3183 3072">
                              <g id="Layer_x0020_1">
                                <path
                                  fill="#268bbb"
                                  d="M2600 224c0,0 0,0 0,0 236,198 259,562 52,809 -254,303 -1849,2089 -2221,1776 -301,-190 917,-1964 1363,-2496 207,-247 570,-287 806-89z"
                                />
                                <path
                                  fill="#268bbb"
                                  d="M3166 2190c0,0 0,0 0,0 64,210 -58,443 -270,516 -260,90 -1848,585 -1948,252 -104,-230 1262,-860 1718-1018 212,-73 437,39 500,250z"
                                />
                                <path
                                  fill="#268bbb"
                                  d="M566 3c0,0 0,0 0,0 -219,-26 -427,134 -462,356 -44,271 -255,1921 90,1962 245,62 628,-1392 704,-1869 36,-221 -114,-424 -332,-449z"
                                />
                              </g>
                            </svg>
                          </Typography>
                        </Typography>
                        
                        {/* Subtitle on separate line */}
                        <Typography
                          sx={{
                            color: 'text.secondary',
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            mt: 2,
                            display: 'block',
                          }}
                        >
                          {slide.subtitle}
                        </Typography>
                      </Box>

                      
                      {/* Advanced Search Slider */}
                      <Box sx={{ mt: 2 }}>
                        <AdvancedSearchSlider />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box sx={{ '& img': { width: '100%', height: 'auto' } }}>
                      <Image src={slide.image} width={650} height={678} quality={97} alt="Hero img" />
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          ))}
        </Slider>
      )}

      {/* Enhanced Stats section */}
      {exps && exps.length > 0 && (
        <Box 
          sx={{ 
            background: '#268bbb',
            py: { xs: 6, md: 8 },
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.1)',
              pointerEvents: 'none',
            }
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {exps.map((item, index) => (
                <Grid key={index} item xs={6} md={3}>
                  <Grow in timeout={1000 + index * 200}>
                    <div>
                      <ExpItem item={item} />
                    </div>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  )
}

export default HomeHero
export { HomeHero }