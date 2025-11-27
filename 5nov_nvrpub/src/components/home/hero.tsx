import React, { FC } from 'react'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import { PlayArrow } from '@mui/icons-material'
import { Link as ScrollLink } from 'react-scroll'
import { headingFontFamily } from '@/config/theme/typography'
import HomeContentSlider from '@/components/home/sections/content-slider'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import ArticleIcon from '@mui/icons-material/Article'
import StarIcon from '@mui/icons-material/Star'

const StatsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  alignItems: 'stretch',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',
}))

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(2.25),
  borderRadius: 20,
  position: 'relative',
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 60%)`,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 16px 48px -8px rgba(0,0,0,0.08)',
  maxWidth: 1080,
  margin: '0 auto',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -40,
    left: -40,
    width: 160,
    height: 160,
    background: `radial-gradient(circle at center, ${theme.palette.primary.light}33 0%, transparent 70%)`,
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -50,
    right: -50,
    width: 200,
    height: 200,
    background: `radial-gradient(circle at center, ${theme.palette.secondary ? theme.palette.secondary.light : theme.palette.primary.main}22 0%, transparent 70%)`,
    pointerEvents: 'none',
  },
}))

const StatCard = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: `${theme.spacing(1.5)} ${theme.spacing(2.25)}`,
  background: 'linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 100%)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  borderRadius: 16,
  minWidth: 160,
  minHeight: 72,
  position: 'relative',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 6px 18px -4px rgba(0,0,0,0.10)',
  transition: 'transform .45s cubic-bezier(.4,0,.2,1), box-shadow .45s cubic-bezier(.4,0,.2,1)',
  willChange: 'transform',
  cursor: 'default',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 14px 38px -10px rgba(0,0,0,0.20)',
  },
  '&:focus-within': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  '&:not(:last-of-type)': {
    marginRight: theme.spacing(1.25),
  },
}))

const StatCount = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.35rem',
  letterSpacing: '.5px',
  lineHeight: 1,
  display: 'block',
  background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  color: 'transparent',
}))

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '.70rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.12em',
  color: theme.palette.text.secondary,
}))

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: '560px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, #FFF9F0 0%, #FAF9F6 100%)',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(6),
}))

const HeroContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(6),
}))

const RightStack = styled(Box)({
  position: 'relative',
  width: '100%',
  maxWidth: 360,
  height: 420,
})

const CardBox = styled(Box)(() => ({
  borderRadius: 12,
  position: 'absolute',
  right: 0,
  boxShadow: '0 40px 100px rgba(0,0,0,0.08)',
}))

const HomeHero: FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.12 } },
  }

  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

  return (
    <HeroContainer>
      <HeroContent maxWidth="lg">
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'inline-block', mb: 2 }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 2, py: '6px', borderRadius: 999, background: 'rgba(21, 101, 192, 0.08)', color: '#1565C0', fontWeight: 600, fontSize: '0.875rem' }}>
                  Trusted by 50,000+ Medical Professionals
                </Box>
              </Box>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography component="h1" sx={{ fontFamily: headingFontFamily, fontSize: { xs: 36, md: 64 }, fontWeight: 800, lineHeight: 1.02, color: 'text.primary', mb: 3 }}>
                Empowering{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>Medical Minds</Box>
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography sx={{ color: '#6b7280', mb: 3, maxWidth: 640, lineHeight: 1.8 }}>
                Jaypee products are being distributed globally by renowned distributors in the USA, Central and South America, UK, Canada, Europe, Africa, Middle East, South East Asia, North Asia.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
              <Chip label="Medicine" sx={{ borderRadius: 2, px: 2, py: '6px', backgroundColor: '#FFFFFF' }} />
              <Chip label="Dentistry" sx={{ borderRadius: 2, px: 2, py: '6px', backgroundColor: '#FFFFFF' }} />
              <Chip label="Nursing" sx={{ borderRadius: 2, px: 2, py: '6px', backgroundColor: '#FFFFFF' }} />
            </motion.div>

            {/* Stats row showing content counts */}
            <motion.div variants={itemVariants}>
              <StatsContainer>
                <StatsRow>
                  <StatCard
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    role="figure"
                    aria-label="Books count"
                  >
                    <MenuBookIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                    <Box>
                      <StatCount>8+</StatCount>
                      <StatLabel>Books</StatLabel>
                    </Box>
                  </StatCard>
                  <StatCard
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    role="figure"
                    aria-label="Videos count"
                  >
                    <PlayCircleOutlineIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                    <Box>
                      <StatCount>3+</StatCount>
                      <StatLabel>Videos</StatLabel>
                    </Box>
                  </StatCard>
                  <StatCard
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    role="figure"
                    aria-label="Journals count"
                  >
                    <ArticleIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                    <Box>
                      <StatCount>5+</StatCount>
                      <StatLabel>Journals</StatLabel>
                    </Box>
                  </StatCard>
                  <StatCard
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    role="figure"
                    aria-label="Other resources count"
                  >
                    <StarIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                    <Box>
                      <StatCount>1+</StatCount>
                      <StatLabel>Other</StatLabel>
                    </Box>
                  </StatCard>
                </StatsRow>
              </StatsContainer>
            </motion.div>

            <motion.div variants={itemVariants} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <ScrollLink to="popular-course" spy smooth offset={-70} duration={500}>
                <Button
                  startIcon={<PlayArrow />}
                  aria-label="Explore resources"
                  sx={(theme) => ({
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: 700,
                    px: 4,
                    py: '10px',
                    borderRadius: 2,
                    boxShadow: `0 12px 40px ${theme.palette.primary.main}20`,
                  })}
                >
                  Explore Resources
                </Button>
              </ScrollLink>

              <Button
                variant="outlined"
                startIcon={<PlayArrow />}
                aria-label="Watch video"
                sx={{ textTransform: 'none', borderColor: 'text.primary', color: 'text.primary' }}
              >
                Watch Video
              </Button>
            </motion.div>
          </motion.div>
        </Box>

        <Box sx={{ width: { xs: 0, md: 380 }, display: { xs: 'none', md: 'block' } }}>
          <RightStack>
            <CardBox sx={{ width: 260, height: 360, top: 40, transform: 'rotate(-10deg)', background: 'linear-gradient(180deg,#6C5CE7,#4C69D7)' }} />
            <CardBox sx={{ width: 280, height: 380, top: 12, right: 16, transform: 'rotate(-4deg)', background: 'linear-gradient(180deg,#FF6FB0,#FF9EBA)' }} />
            <CardBox sx={{ width: 300, height: 400, top: 0, right: 32, background: 'linear-gradient(180deg,#00C6FF,#0072FF)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', p: 3 }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem', mb: 1 }}>Medical Innovation</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)' }}>Monthly Edition</Typography>
            </CardBox>
          </RightStack>
        </Box>
      </HeroContent>

      {/* Enhanced top slider integrated into the hero area */}
      <Box sx={{ width: '100%' }}>
        <HomeContentSlider />
      </Box>
    </HeroContainer>
  )
}

export default HomeHero
export { HomeHero }

