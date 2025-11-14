import React, { FC, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Box from '@mui/material/Box'
import Slider, { Settings } from 'react-slick'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme, styled } from '@mui/material/styles'
import IconArrowBack from '@mui/icons-material/ArrowBack'
import IconArrowForward from '@mui/icons-material/ArrowForward'
import StarIcon from '@mui/icons-material/Star'
import { MentorCardItem } from '@/components/mentor'
import { headingFontFamily } from '@/config/theme/typography'

interface SliderArrowArrow {
  onClick?: () => void
  type: 'next' | 'prev'
  className?: string
}

const SliderArrow: FC<SliderArrowArrow> = ({ onClick, type, className }) => {
  return (
    <IconButton
      sx={{
        backgroundColor: '#1C1C1C',
        color: '#F8F6F3',
        width: 48,
        height: 48,
        borderRadius: 0,
        border: '1px solid #1C1C1C',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          backgroundColor: '#EEC1B7',
          borderColor: '#EEC1B7',
          color: '#1C1C1C',
          transform: 'scale(1.1)',
        },
        bottom: '-60px !important',
        left: 'unset !important',
        right: type === 'prev' ? '80px !important' : '0 !important',
        zIndex: 10,
      }}
      disableRipple
      onClick={onClick}
      className={className}
    >
      {type === 'next' ? <IconArrowForward sx={{ fontSize: 20 }} /> : <IconArrowBack sx={{ fontSize: 20 }} />}
    </IconButton>
  )
}

const StyledDots = styled('ul')({
  '&.slick-dots': {
    position: 'absolute',
    left: 0,
    bottom: -40,
    paddingLeft: 0,
    textAlign: 'left',
    '& li': {
      marginRight: '12px',
      '& > div': {
        transition: 'all 0.3s ease',
        background: 'rgba(28, 28, 28, 0.2)',
        height: '2px',
        width: '40px',
        borderRadius: 0,
        '&:hover': {
          background: 'rgba(28, 28, 28, 0.4)',
        },
      },
      '&.slick-active > div': {
        background: '#EEC1B7',
        width: '60px',
      },
    },
  },
})

const HomeOurMentors: FC = () => {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'), { noSsr: true })
  const [mentors, setMentors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sliderReady, setSliderReady] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    import('@/data/sampleData')
      .then(({ mentorsData }) => {
        const transformedMentors = mentorsData.map((mentor: any) => ({
          ...mentor,
          contenttype: mentor.specialty || mentor.contenttype,
          company: mentor.companyLogo
            ? {
                name: mentor.hospital || 'Hospital',
                logo: mentor.companyLogo,
              }
            : undefined,
        }))
        setMentors(transformedMentors || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading mentors data:', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!loading && mentors.length > 0) {
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined' && document.readyState === 'complete') {
          setSliderReady(true)
        } else {
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

  if (loading || !sliderReady || !mentors || mentors.length === 0) {
    return null
  }

  const sliderConfig: Settings = {
    infinite: mentors.length > 1,
    autoplay: mentors.length > 1,
    autoplaySpeed: 5000,
    speed: 600,
    slidesToShow: matchMobileView ? 1 : Math.min(3, mentors.length),
    slidesToScroll: 1,
    prevArrow: mentors.length > 1 ? <SliderArrow type="prev" /> : undefined,
    nextArrow: mentors.length > 1 ? <SliderArrow type="next" /> : undefined,
    dots: mentors.length > 1,
    appendDots: (dots) => <StyledDots>{dots}</StyledDots>,
    customPaging: () => <Box sx={{ height: '2px', width: '40px', backgroundColor: 'transparent', display: 'inline-block' }} />,
  }

  return (
    <Box
      id="mentors"
      ref={ref}
      sx={{
        py: { xs: 12, md: 16 },
        backgroundColor: '#FFFFFF',
      }}
    >
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
              Our Mentors
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
              Learn from the Best
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
              Discover our most popular mentors and learn from the best in their fields.
              Join thousands of students who have already transformed their careers.
            </Typography>

            {/* Stats Section */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 4, md: 6 },
                mt: 6,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: headingFontFamily,
                    fontWeight: 700,
                    color: '#1C1C1C',
                    mb: 0.5,
                  }}
                >
                  50K+
                </Typography>
                <Typography variant="body2" sx={{ color: '#717171', fontSize: '0.875rem' }}>
                  Students Taught
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: headingFontFamily,
                      fontWeight: 700,
                      color: '#1C1C1C',
                    }}
                  >
                    4.9
                  </Typography>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 20, color: '#D8B179' }} />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ color: '#717171', fontSize: '0.875rem' }}>
                  Average Rating
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: headingFontFamily,
                    fontWeight: 700,
                    color: '#1C1C1C',
                    mb: 0.5,
                  }}
                >
                  95%
                </Typography>
                <Typography variant="body2" sx={{ color: '#717171', fontSize: '0.875rem' }}>
                  Success Rate
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>

        <Box sx={{ position: 'relative', mt: 4 }}>
          <Slider {...sliderConfig}>
            {mentors.map((item) => (
              <MentorCardItem key={String(item.id)} item={item} />
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  )
}

export default HomeOurMentors
export { HomeOurMentors }
