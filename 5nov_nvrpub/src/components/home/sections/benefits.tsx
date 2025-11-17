import React, { FC } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SchoolIcon from '@mui/icons-material/School'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import { headingFontFamily } from '@/config/theme/typography'

const BenefitCard = styled(motion.div)({
  padding: '40px 32px',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(28, 28, 28, 0.08)',
  borderRadius: 0,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: '#EEC1B7',
    boxShadow: '0 20px 60px rgba(238, 193, 183, 0.15)',
    '& .icon-wrapper': {
      backgroundColor: '#EEC1B7',
      transform: 'scale(1.1)',
    },
  },
})

const IconWrapper = styled(Box)({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: '#F8F6F3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '24px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(28, 28, 28, 0.08)',
  '& svg': {
    fontSize: 32,
    color: '#1C1C1C',
  },
})

const HomeBenefits: FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const benefits = [
    {
      icon: <AccessTimeIcon />,
      title: '24/7 Access',
      description: 'Access your learning materials anytime, anywhere with our cloud-based platform.',
    },
    {
      icon: <SchoolIcon />,
      title: 'Expert Content',
      description: 'Curated by medical professionals and educators with years of experience.',
    },
    {
      icon: <VerifiedUserIcon />,
      title: 'Verified Resources',
      description: 'All content is peer-reviewed and verified by industry experts.',
    },
    {
      icon: <SupportAgentIcon />,
      title: 'Dedicated Support',
      description: 'Get help when you need it with our responsive customer support team.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
        py: { xs: 12, md: 16 },
        backgroundColor: '#F8F6F3',
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
              Why Choose Us
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
              Your Trusted Learning Partner
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
              Experience the difference with our comprehensive platform designed for medical professionals and students.
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {benefits.map((benefit, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <BenefitCard variants={itemVariants}>
                  <IconWrapper className="icon-wrapper">{benefit.icon}</IconWrapper>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: headingFontFamily,
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#1C1C1C',
                      mb: 2,
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#717171',
                      lineHeight: 1.7,
                      fontSize: '1rem',
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </BenefitCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}

export default HomeBenefits
export { HomeBenefits }

