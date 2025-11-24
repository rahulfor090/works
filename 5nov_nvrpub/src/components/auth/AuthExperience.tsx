'use client'

import React from 'react'
import NextLink from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Alert,
  Box,
  Button,
  Chip,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ScheduleIcon from '@mui/icons-material/Schedule'
import VerifiedIcon from '@mui/icons-material/Verified'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import GoogleIcon from '@mui/icons-material/Google'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

type AuthMode = 'login' | 'signup'

interface AuthExperienceProps {
  initialMode: AuthMode
}

const AuthExperience: React.FC<AuthExperienceProps> = ({ initialMode }) => {
  const [mode, setMode] = React.useState<AuthMode>(initialMode)
  React.useEffect(() => setMode(initialMode), [initialMode])

  const [loginEmail, setLoginEmail] = React.useState('')
  const [loginPassword, setLoginPassword] = React.useState('')
  const [loginError, setLoginError] = React.useState('')
  const [isLoggingIn, setIsLoggingIn] = React.useState(false)

  const [name, setName] = React.useState('')
  const [signupEmail, setSignupEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [signupError, setSignupError] = React.useState('')
  const [isSigningUp, setIsSigningUp] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(true)
  const [showLoginPassword, setShowLoginPassword] = React.useState(false)
  const [showSignupPassword, setShowSignupPassword] = React.useState(false)
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = React.useState(false)

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setLoginError('')
    setIsLoggingIn(true)

    try {
      const response = await fetch('/api/auth/user-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        window.dispatchEvent(new Event('auth-changed'))
        window.location.href = '/'
      } else {
        setLoginError(data.message || 'Invalid email or password')
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.')
      console.error('Login error:', error)
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleSignup = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setSignupError('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setSignupError('Passwords do not match')
      return
    }

    // Validate password strength
    if (password.length < 6) {
      setSignupError('Password must be at least 6 characters long')
      return
    }

    setIsSigningUp(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: name,
          email: signupEmail,
          password: password,
          plan: 'Free',
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Auto-login after successful signup
        const loginResponse = await fetch('/api/auth/user-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: signupEmail,
            password: password,
          }),
        })

        const loginData = await loginResponse.json()

        if (loginResponse.ok && loginData.success) {
          localStorage.setItem('user', JSON.stringify(loginData.user))
          window.dispatchEvent(new Event('auth-changed'))
          window.location.href = '/'
        }
      } else {
        setSignupError(data.message || 'Failed to create account')
      }
    } catch (error) {
      setSignupError('An error occurred. Please try again.')
      console.error('Signup error:', error)
    } finally {
      setIsSigningUp(false)
    }
  }

  const highlights = [
    {
      title: 'Premium learning journeys',
      description: 'Structured tracks curated by leading medical educators.',
      icon: <StarBorderIcon fontSize="small" />,
    },
    {
      title: 'Secure access',
      description: 'Enterprise-grade access control keeps your account safe.',
      icon: <LockOutlinedIcon fontSize="small" />,
    },
    {
      title: 'Personalised dashboard',
      description: 'Resume where you left off with cross-device syncing.',
      icon: <CheckCircleIcon fontSize="small" />,
    },
  ]

  const benefits = [
    {
      icon: <VerifiedIcon />,
      title: 'Verified resources',
      description: 'Editorially reviewed and peer-aligned medical content.',
    },
    {
      icon: <ScheduleIcon />,
      title: 'Adaptive pacing',
      description: 'Personalised reminders to keep your learning streak alive.',
    },
    {
      icon: <FavoriteBorderIcon />,
      title: 'Mentor access',
      description: 'Q&A with mentors and curated discussion rooms.',
    },
  ]

  const socialProviders = [
    {
      label: 'Continue with Google',
      icon: <GoogleIcon fontSize="small" />,
    },
    {
      label: 'Continue with LinkedIn',
      icon: <LinkedInIcon fontSize="small" />,
    },
  ]



  // Updated colors to match Hero.jsx theme
  // Blue: #3B82F6, Red: #FF6B6B, Green: #10B981
  const floatingOrbs = [
    { top: '-80px', left: '-50px', size: 260, color: 'rgba(59, 130, 246, 0.15)', float: 32, delay: 0 }, // Blue
    { top: '35%', right: '-90px', size: 300, color: 'rgba(255, 107, 107, 0.15)', float: 40, delay: 0.3 }, // Red
    { bottom: '-90px', left: '20%', size: 280, color: 'rgba(16, 185, 129, 0.15)', float: 35, delay: 0.6 }, // Green
  ]

  const accentLines = [
    { top: '8%', left: '4%', width: 220, delay: 0 },
    { top: '18%', right: '10%', width: 180, delay: 0.4 },
    { bottom: '12%', left: '12%', width: 260, delay: 0.8 },
  ]

  const toggleOptions: { label: string; value: AuthMode }[] = [
    { label: 'Sign in', value: 'login' },
    { label: 'Sign up', value: 'signup' },
  ]

  const [cursorTilt, setCursorTilt] = React.useState({ x: 0, y: 0 })

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    setCursorTilt({ x, y })
  }

  const handlePointerLeave = (): void => {
    setCursorTilt({ x: 0, y: 0 })
  }

  const leftPanelVariants = {
    login: { opacity: 1, x: 0, scale: 1 },
    signup: { opacity: 0.8, x: -24, scale: 0.97 },
  }

  const rightPanelVariants = {
    login: { opacity: 0.85, x: 24, scale: 0.97 },
    signup: { opacity: 1, x: 0, scale: 1 },
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        // New gradient from Hero.jsx: from-[#F0F9FF] via-white to-[#FFF5F5]
        background: 'linear-gradient(to bottom right, #F0F9FF, #FFFFFF, #FFF5F5)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 0 },
      }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 12% 18%, rgba(255,255,255,0.8), transparent 40%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.8), transparent 35%)',
          pointerEvents: 'none',
        }}
      />

      {floatingOrbs.map((orb, index) => (
        <motion.span
          key={index}
          style={{
            position: 'absolute',
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: orb.color,
            filter: 'blur(60px)',
            mixBlendMode: 'multiply',
          }}
          animate={{ y: [0, orb.float, 0], x: [0, orb.float / 2, 0] }}
          transition={{
            duration: 11 + index * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {accentLines.map((line, index) => {
        const baseStyle: React.CSSProperties = {
          position: 'absolute',
          height: 1,
          width: line.width,
          background: 'linear-gradient(90deg, rgba(148, 163, 184, 0), rgba(148, 163, 184, 0.3), rgba(148, 163, 184, 0))',
          opacity: 0.4,
        }

        if (line.top) baseStyle.top = line.top
        if (line.bottom) baseStyle.bottom = line.bottom
        if (line.left) baseStyle.left = line.left
        if (line.right) baseStyle.right = line.right

        return (
          <motion.div
            key={`line-${index}`}
            style={baseStyle}
            animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, delay: line.delay }}
          />
        )
      })}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            position: 'relative',
            borderRadius: { xs: 5, md: 6 },
            p: { xs: 1.2, md: 2 },
            // Subtle border/glow matching the clean theme
            background: 'rgba(255,255,255,0.4)',
            boxShadow: '0 20px 60px -10px rgba(148, 163, 184, 0.1)',
            border: '1px solid rgba(255,255,255,0.8)',
          }}
        >
          <motion.div
            initial={{ opacity: 0.2, scale: 0.95 }}
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.95, 1.02, 0.95] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 16,
              borderRadius: 32,
              background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05), transparent 60%)',
              filter: 'blur(30px)',
              zIndex: 0,
            }}
          />
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            elevation={0}
            sx={{
              borderRadius: { xs: 4, md: 5 },
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              position: 'relative',
            }}
            style={{
              transform: `perspective(1600px) rotateX(${cursorTilt.y * 2}deg) rotateY(${cursorTilt.x * -2}deg)`,
              transition: 'transform 0.25s ease',
            }}
          >
            <Grid container sx={{ position: 'relative', zIndex: 1 }}>
              <Grid
                item
                xs={12}
                md={6}
                component={motion.div}
                variants={leftPanelVariants}
                animate={mode}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                sx={{
                  px: { xs: 4, sm: 6 },
                  py: { xs: 4, sm: 5, md: 5 },
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      letterSpacing: 3,
                      color: '#94A3B8', // Slate-400
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  >
                    NRV PUBLICATION
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mt: 2, mb: 2, color: '#0A2540' }}>
                    {mode === 'login' ? 'Welcome back.' : 'Start your journey.'}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748B', mb: 4, maxWidth: 420, lineHeight: 1.6 }}>
                    {mode === 'login'
                      ? 'Access your personalized learning dashboard and continue your progress.'
                      : 'Join thousands of clinicians mastering their craft with NRV Publication.'}
                  </Typography>

                  <Stack spacing={2}>
                    {(mode === 'login' ? highlights : benefits).map((item, index) => (
                      <Box
                        key={item.title}
                        component={motion.div}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="flex-start"
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            background: '#FFFFFF',
                            border: '1px solid #F1F5F9',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: 46,
                              height: 46,
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: mode === 'login' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                              color: mode === 'login' ? '#FF6B6B' : '#3B82F6',
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, color: '#0A2540' }}>
                              {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748B' }}>
                              {item.description}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>

                  <Divider sx={{ my: 4, borderColor: '#E2E8F0' }} />
                  <Typography variant="body2" sx={{ color: '#64748B' }}>
                    Prefer a dedicated link?{' '}
                    <NextLink href={mode === 'login' ? '/signup' : '/login'} passHref legacyBehavior>
                      <Link sx={{ fontWeight: 600, color: '#0A2540', textDecorationColor: 'rgba(10, 37, 64, 0.2)' }}>
                        {mode === 'login' ? 'Create an account' : 'Sign in instead'}
                      </Link>
                    </NextLink>
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                component={motion.div}
                variants={rightPanelVariants}
                animate={mode}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                sx={{
                  px: { xs: 4, sm: 6 },
                  py: { xs: 4, sm: 5, md: 5 },
                  background: '#FFFFFF',
                  borderLeft: { md: '1px solid #F1F5F9' },
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                    <Chip
                      icon={<ShieldOutlinedIcon fontSize="small" />}
                      label="256-bit SSL"
                      sx={{
                        background: 'rgba(59,130,246,0.1)',
                        color: '#0A2540',
                        fontWeight: 600,
                      }}
                      size="small"
                    />
                    <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                      Secure cloud session & multi-factor ready
                    </Typography>
                  </Stack>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#0A2540' }}>
                    {mode === 'login' ? 'Sign in' : 'Create account'}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: '#64748B' }}>
                    {mode === 'login'
                      ? 'Enter your credentials to access your account.'
                      : 'Fill in your details to get started.'}
                  </Typography>

                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: 999,
                      background: '#F1F5F9',
                      p: 0.5,
                      mb: 4,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                    }}
                  >
                    <motion.div
                      layout
                      style={{
                        position: 'absolute',
                        top: 4,
                        bottom: 4,
                        width: 'calc(50% - 8px)',
                        borderRadius: 999,
                        background: '#FFFFFF',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                        pointerEvents: 'none',
                        zIndex: 0,
                      }}
                      animate={{ left: mode === 'login' ? 4 : 'calc(50% + 4px)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                    {toggleOptions.map((option) => (
                      <Box
                        key={option.value}
                        component="button"
                        onClick={() => setMode(option.value)}
                        type="button"
                        style={{
                          border: 'none',
                          background: 'transparent',
                          padding: '0.75rem 1rem',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            textAlign: 'center',
                            color: mode === option.value ? '#0A2540' : '#64748B',
                            transition: 'color 0.3s ease',
                            fontWeight: mode === option.value ? 700 : 500,
                          }}
                        >
                          {option.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <AnimatePresence mode="wait">
                    {mode === 'login' ? (
                      <motion.div
                        key="login-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.35 }}
                      >
                        {loginError && (
                          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {loginError}
                          </Alert>
                        )}
                        <Box component="form" onSubmit={handleLogin}>
                          <Stack spacing={2}>
                            <TextField
                              label="Email address"
                              type="email"
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              fullWidth
                              required
                              disabled={isLoggingIn}
                              InputLabelProps={{ shrink: true }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailOutlinedIcon sx={{ color: '#94A3B8' }} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#3B82F6',
                                  },
                                },
                              }}
                            />
                            <TextField
                              label="Password"
                              type={showLoginPassword ? 'text' : 'password'}
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              fullWidth
                              required
                              disabled={isLoggingIn}
                              InputLabelProps={{ shrink: true }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockOutlinedIcon sx={{ color: '#94A3B8' }} />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="Toggle password visibility"
                                      onClick={() => setShowLoginPassword((prev) => !prev)}
                                      edge="end"
                                      size="small"
                                    >
                                      {showLoginPassword ? (
                                        <VisibilityOffIcon fontSize="small" />
                                      ) : (
                                        <VisibilityIcon fontSize="small" />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#3B82F6',
                                  },
                                },
                              }}
                            />
                            <Stack
                              direction={{ xs: 'column', sm: 'row' }}
                              alignItems={{ xs: 'flex-start', sm: 'center' }}
                              justifyContent="space-between"
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={rememberMe}
                                    onChange={(event) => setRememberMe(event.target.checked)}
                                    sx={{
                                      color: '#CBD5F5',
                                      '&.Mui-checked': { color: '#FF6B6B' },
                                    }}
                                  />
                                }
                                label="Remember me for 30 days"
                                sx={{ color: '#64748B', userSelect: 'none' }}
                              />
                              <NextLink href="/forgot-password" passHref legacyBehavior>
                                <Link sx={{ fontWeight: 600, color: '#0A2540' }}>Forgot password?</Link>
                              </NextLink>
                            </Stack>
                            <Button
                              type="submit"
                              variant="contained"
                              size="large"
                              endIcon={<ArrowForwardIcon />}
                              disabled={isLoggingIn}
                              sx={{
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 3,
                                color: '#fff',
                                // Coral/Orange gradient from Hero.jsx
                                background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
                                boxShadow: '0 10px 15px -3px rgba(255, 107, 107, 0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: 'linear-gradient(to right, #FF5252, #FF7043)',
                                  boxShadow: '0 20px 25px -5px rgba(255, 107, 107, 0.4)',
                                  transform: 'translateY(-1px)',
                                },
                              }}
                              fullWidth
                            >
                              {isLoggingIn ? 'Signing in...' : 'Access dashboard'}
                            </Button>
                            <Typography variant="caption" sx={{ color: '#94A3B8', textAlign: 'center', display: 'block' }}>
                              By continuing, you agree to our Terms of Service and Privacy Policy.
                            </Typography>
                          </Stack>
                        </Box>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="signup-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.35 }}
                      >
                        {signupError && (
                          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {signupError}
                          </Alert>
                        )}
                        <Box component="form" onSubmit={handleSignup}>
                          <Stack spacing={2}>
                            <TextField
                              label="Full name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              disabled={isSigningUp}
                              InputLabelProps={{ shrink: true }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#3B82F6',
                                  },
                                },
                              }}
                            />
                            <TextField
                              label="Email address"
                              type="email"
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              required
                              disabled={isSigningUp}
                              InputLabelProps={{ shrink: true }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailOutlinedIcon sx={{ color: '#94A3B8' }} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#3B82F6',
                                  },
                                },
                              }}
                            />
                            <TextField
                              label="Password"
                              type={showSignupPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              disabled={isSigningUp}
                              helperText="Minimum 6 characters"
                              InputLabelProps={{ shrink: true }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockOutlinedIcon sx={{ color: '#94A3B8' }} />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="Toggle password visibility"
                                      onClick={() => setShowSignupPassword((prev) => !prev)}
                                      edge="end"
                                      size="small"
                                    >
                                      {showSignupPassword ? (
                                        <VisibilityOffIcon fontSize="small" />
                                      ) : (
                                        <VisibilityIcon fontSize="small" />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#3B82F6',
                                  },
                                },
                              }}
                            />
                            <TextField
                              label="Confirm password"
                              type={showSignupConfirmPassword ? 'text' : 'password'}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                              disabled={isSigningUp}
                              InputLabelProps={{ shrink: true }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockOutlinedIcon sx={{ color: '#94A3B8' }} />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="Toggle password visibility"
                                      onClick={() => setShowSignupConfirmPassword((prev) => !prev)}
                                      edge="end"
                                      size="small"
                                    >
                                      {showSignupConfirmPassword ? (
                                        <VisibilityOffIcon fontSize="small" />
                                      ) : (
                                        <VisibilityIcon fontSize="small" />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 3,
                                  '&.Mui-focused fieldset': {
                                    borderColor: '#3B82F6',
                                  },
                                },
                              }}
                            />
                            <Button
                              type="submit"
                              variant="contained"
                              size="large"
                              endIcon={<ArrowForwardIcon />}
                              disabled={isSigningUp}
                              sx={{
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 3,
                                color: '#fff',
                                // Coral/Orange gradient from Hero.jsx
                                background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
                                boxShadow: '0 10px 15px -3px rgba(255, 107, 107, 0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: 'linear-gradient(to right, #FF5252, #FF7043)',
                                  boxShadow: '0 20px 25px -5px rgba(255, 107, 107, 0.4)',
                                  transform: 'translateY(-1px)',
                                },
                              }}
                              fullWidth
                            >
                              {isSigningUp ? 'Creating account...' : 'Create account'}
                            </Button>
                            <Typography variant="caption" sx={{ color: '#94A3B8', textAlign: 'center', display: 'block' }}>
                              By creating an account, you agree to our Terms of Service and Privacy Policy.
                            </Typography>
                          </Stack>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Divider
                    sx={{
                      mt: 4,
                      mb: 3,
                      borderColor: '#E2E8F0',
                      '&::before, &::after': { borderColor: '#E2E8F0' },
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#94A3B8', letterSpacing: 1 }}>
                      OR CONTINUE WITH
                    </Typography>
                  </Divider>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{ mb: 3 }}
                  >
                    {socialProviders.map((provider) => (
                      <Button
                        key={provider.label}
                        variant="outlined"
                        fullWidth
                        startIcon={provider.icon}
                        sx={{
                          borderRadius: 3,
                          borderColor: '#E2E8F0',
                          color: '#0A2540',
                          fontWeight: 600,
                          textTransform: 'none',
                          background: '#fff',
                          '&:hover': {
                            borderColor: '#94A3B8',
                            background: '#F8FAFC',
                          },
                        }}
                      >
                        {provider.label}
                      </Button>
                    ))}
                  </Stack>


                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}

export default AuthExperience
