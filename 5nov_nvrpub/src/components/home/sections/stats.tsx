import React, { FC } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { headingFontFamily } from '@/config/theme/typography'

const StatCard = styled(motion.div)({
  textAlign: 'center',
  padding: '40px 20px',
})

const StatNumber = styled(Typography)(({ theme }) => ({
  fontFamily: headingFontFamily,
  fontSize: '48px',
  [theme.breakpoints.up('md')]: {
    fontSize: '64px',
  },
  fontWeight: 700,
  color: '#1C1C1C',
  lineHeight: 1,
  marginBottom: '12px',
  background: 'linear-gradient(135deg, #EEC1B7 0%, #D8B179 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}))

const StatLabel = styled(Typography)({
  fontSize: '1rem',
  letterSpacing: '0.1em',
  color: '#717171',
  textTransform: 'uppercase',
  fontWeight: 500,
})

const HomeStats: FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '10K+', label: 'Resources' },
    { number: '500+', label: 'Institutions' },
    { number: '95%', label: 'Satisfaction Rate' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(28, 28, 28, 0.08)',
        borderBottom: '1px solid rgba(28, 28, 28, 0.08)',
      }}
    >
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {stats.map((stat, index) => (
              <Grid key={index} item xs={6} md={3}>
                <StatCard variants={itemVariants}>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}

export default HomeStats
export { HomeStats }

