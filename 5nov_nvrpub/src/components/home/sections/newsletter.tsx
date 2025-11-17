import React, { FC, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { headingFontFamily } from '@/config/theme/typography'

const NewsletterContainer = styled(motion.div)({
  backgroundColor: '#1C1C1C',
  padding: '60px 40px',
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
})

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    '& fieldset': {
      borderColor: 'rgba(248, 246, 243, 0.3)',
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: '#EEC1B7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#EEC1B7',
      borderWidth: '2px',
    },
    '& input': {
      color: '#1C1C1C',
      '&::placeholder': {
        color: '#717171',
        opacity: 1,
      },
    },
  },
})

const StyledButton = styled(Button)({
  fontFamily: headingFontFamily,
  fontSize: '1rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '16px 40px',
  borderRadius: 0,
  backgroundColor: '#EEC1B7',
  color: '#1C1C1C',
  border: '1px solid #EEC1B7',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: '#D8A89A',
    borderColor: '#D8A89A',
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    backgroundColor: 'rgba(238, 193, 183, 0.5)',
    color: 'rgba(28, 28, 28, 0.5)',
  },
})

const HomeNewsLetter: FC = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setIsSubscribed(true)
      setShowSuccess(true)
      setEmail('')
      setTimeout(() => {
        setIsSubscribed(false)
      }, 3000)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubscribe()
    }
  }

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 12, md: 16 },
        backgroundColor: '#F8F6F3',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <NewsletterContainer>
            <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: headingFontFamily,
                  fontSize: { xs: '32px', md: '48px' },
                  fontWeight: 700,
                  color: '#F8F6F3',
                  mb: 2,
                  letterSpacing: '-0.02em',
                }}
              >
                Stay Updated
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.125rem',
                  color: 'rgba(248, 246, 243, 0.9)',
                  mb: 4,
                  maxWidth: '500px',
                  mx: 'auto',
                  lineHeight: 1.7,
                }}
              >
                Get the latest updates on our courses, exclusive content, and special offers
                delivered straight to your inbox.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2,
                  maxWidth: '500px',
                  mx: 'auto',
                }}
              >
                <StyledTextField
                  fullWidth
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                />
                <StyledButton onClick={handleSubscribe} disabled={!email || !email.includes('@')}>
                  {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                </StyledButton>
              </Box>
            </Box>
          </NewsletterContainer>
        </motion.div>
      </Container>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{
            backgroundColor: '#EEC1B7',
            color: '#1C1C1C',
            '& .MuiAlert-icon': {
              color: '#1C1C1C',
            },
          }}
        >
          Successfully subscribed! Welcome to our community.
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default HomeNewsLetter
export { HomeNewsLetter }
