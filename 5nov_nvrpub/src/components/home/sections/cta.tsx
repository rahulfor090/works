import React, { FC } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { headingFontFamily } from '@/config/theme/typography'

const CTAContainer = styled(motion.div)(({ theme }) => ({
  backgroundColor: '#1C1C1C',
  padding: '60px 40px',
  [theme.breakpoints.up('md')]: {
    padding: '80px 60px',
  },
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(238, 193, 183, 0.1) 0%, rgba(216, 177, 121, 0.1) 100%)',
    pointerEvents: 'none',
  },
}))

const StyledButton = styled(Button)({
  fontFamily: headingFontFamily,
  fontSize: '1rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '16px 48px',
  borderRadius: 0,
  backgroundColor: '#EEC1B7',
  color: '#1C1C1C',
  border: '1px solid #EEC1B7',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: '#D8A89A',
    borderColor: '#D8A89A',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(238, 193, 183, 0.3)',
  },
})

const HomeCTA: FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 0, md: 0 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, md: 4 } }}>
        <CTAContainer
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: headingFontFamily,
                fontSize: { xs: '32px', md: '48px' },
                fontWeight: 700,
                color: '#F8F6F3',
                mb: 3,
                letterSpacing: '-0.02em',
              }}
            >
              Ready to Begin Your Journey?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                color: 'rgba(248, 246, 243, 0.9)',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              Join thousands of medical professionals and students who trust Jaypee Digital for their learning needs.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contenttypes" passHref legacyBehavior>
                <StyledButton>Explore Collections</StyledButton>
              </Link>
              <Link href="/admin/login" passHref legacyBehavior>
                <StyledButton
                  sx={{
                    backgroundColor: 'transparent',
                    borderColor: '#EEC1B7',
                    color: '#EEC1B7',
                    '&:hover': {
                      backgroundColor: '#EEC1B7',
                      color: '#1C1C1C',
                    },
                  }}
                >
                  Get Started
                </StyledButton>
              </Link>
            </Box>
          </Box>
        </CTAContainer>
      </Container>
    </Box>
  )
}

export default HomeCTA
export { HomeCTA }



