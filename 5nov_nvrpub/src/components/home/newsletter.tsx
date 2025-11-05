import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { styled, keyframes } from '@mui/material/styles'
import { Fade, Grow, Zoom, IconButton, Snackbar, Alert } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import SendIcon from '@mui/icons-material/Send'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { StyledButton } from '../styled-button'

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

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const StyledNewsletterContainer = styled(Box)(({ theme }) => ({
  background: '#268bbb',
  borderRadius: 32,
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: 16,
  height: 56,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  fontSize: '1rem',
  fontWeight: 500,
  border: '2px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-200px',
    width: '200px',
    height: '100%',
    background: 'rgba(38, 139, 187, 0.2)',
    animation: `${shimmer} 2s infinite`,
  },
  
  '&:hover': {
    border: '2px solid rgba(38, 139, 187, 0.5)',
    boxShadow: '0 8px 25px rgba(38, 139, 187, 0.2)',
    transform: 'translateY(-2px)',
  },
  
  '&.Mui-focused': {
    border: '2px solid #268bbb',
    boxShadow: '0 12px 35px rgba(38, 139, 187, 0.3)',
    transform: 'translateY(-2px)',
  },
  
  '& input': {
    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.6)',
      opacity: 1,
    },
  },
}))

const StyledSubscribeButton = styled(StyledButton)(({ theme }) => ({
  background: '#268bbb',
  color: 'white',
  borderRadius: 16,
  height: 56,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  fontSize: '1rem',
  fontWeight: 700,
  border: '2px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 25px rgba(38, 139, 187, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&:hover': {
    background: '#1b6e93',
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 15px 40px rgba(38, 139, 187, 0.4)',
  },
  
  '&:active': {
    transform: 'translateY(-1px) scale(1.02)',
  },
}))

const HomeNewsLetter: FC = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setIsSubscribed(true)
      setShowSuccess(true)
      setEmail('')
      
      // Reset after 3 seconds
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
      sx={{ 
        backgroundColor: 'background.paper', 
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={800}>
          <StyledNewsletterContainer
            sx={{
              py: { xs: 6, md: 8 },
              px: { xs: 4, md: 6 },
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Decorative Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                animation: `${float} 3s ease-in-out infinite`,
              }}
            >
              <NotificationsActiveIcon 
                sx={{ 
                  fontSize: 40, 
                  color: 'rgba(255, 255, 255, 0.7)',
                  animation: `${pulse} 2s ease-in-out infinite`,
                }} 
              />
            </Box>
            
            <Box
              sx={{
                position: 'absolute',
                top: 30,
                right: 30,
                animation: `${float} 3s ease-in-out infinite 1s`,
              }}
            >
              <EmailIcon 
                sx={{ 
                  fontSize: 35, 
                  color: 'rgba(255, 255, 255, 0.6)',
                  animation: `${pulse} 2s ease-in-out infinite 0.5s`,
                }} 
              />
            </Box>

            {/* Main Content */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Grow in={true} timeout={1000}>
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h1" 
                    component="h2" 
                    sx={{ 
                      mb: 2, 
                      fontSize: { xs: 36, md: 48 },
                      fontWeight: 800,
                      color: 'white',
                      textShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                      animation: `${fadeInUp} 1s ease-out`,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Stay Updated with Our Newsletter
                  </Typography>
                  
                  <Typography 
                    sx={{ 
                      mb: 1,
                      fontSize: '1.2rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontWeight: 500,
                      maxWidth: 600,
                      mx: 'auto',
                      lineHeight: 1.6,
                      animation: `${fadeInUp} 1s ease-out 0.3s both`,
                    }}
                  >
                    Get the latest updates on our courses, exclusive content, and special offers delivered straight to your inbox.
                  </Typography>
                  
                  <Typography 
                    sx={{ 
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 400,
                      animation: `${fadeInUp} 1s ease-out 0.5s both`,
                    }}
                  >
                    Join 50,000+ learners who trust us for quality education
                  </Typography>
                </Box>
              </Grow>

              {/* Newsletter Form */}
              <Zoom in={true} timeout={1200}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'center',
                    gap: { xs: 3, md: 2 },
                    maxWidth: 600,
                    mx: 'auto',
                  }}
                >
                  <Box 
                    sx={{ 
                      flex: 1, 
                      width: '100%',
                      animation: `${slideInLeft} 1s ease-out 0.7s both`,
                    }}
                  >
                    <StyledInputBase
                      fullWidth
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      startAdornment={
                        <EmailIcon 
                          sx={{ 
                            mr: 1, 
                            color: 'rgba(0, 0, 0, 0.5)',
                            fontSize: 20,
                          }} 
                        />
                      }
                    />
                  </Box>
                  
                  <Box sx={{ animation: `${slideInRight} 1s ease-out 0.9s both` }}>
                    <StyledSubscribeButton 
                      onClick={handleSubscribe}
                      disabled={!email || !email.includes('@')}
                      startIcon={
                        isSubscribed ? (
                          <CheckCircleIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <SendIcon sx={{ fontSize: 20 }} />
                        )
                      }
                    >
                      {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                    </StyledSubscribeButton>
                  </Box>
                </Box>
              </Zoom>

            
            </Box>
          </StyledNewsletterContainer>
        </Fade>
      </Container>

      {/* Success Snackbar */}
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
            width: '100%',
            background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          🎉 Successfully subscribed! Welcome to our community!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default HomeNewsLetter
export { HomeNewsLetter }
