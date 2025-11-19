'use client'

import React from 'react'
import NextLink from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
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

  const metrics = [
    { label: 'Active mentors', value: '70+', accent: '#768597' },
    { label: 'Case libraries unlocked', value: '1.3k', accent: '#BCA182' },
  ]

  const floatingOrbs = [
    { top: '-80px', left: '-50px', size: 260, color: 'rgba(247, 226, 255, 0.45)', float: 32, delay: 0 },
    { top: '35%', right: '-90px', size: 300, color: 'rgba(255, 233, 209, 0.4)', float: 40, delay: 0.3 },
    { bottom: '-90px', left: '20%', size: 280, color: 'rgba(193, 235, 255, 0.35)', float: 35, delay: 0.6 },
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
        background: mode === 'login' ? 'var(--alternate-gradient-hero-warm)' : 'var(--gradient-hero-subtle)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 0 },
      }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 12% 18%, rgba(255,255,255,0.5), transparent 40%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.35), transparent 35%)',
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
            filter: 'blur(50px)',
            mixBlendMode: 'soft-light',
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
          background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.6), rgba(255,255,255,0))',
          opacity: 0.6,
        }

        if (line.top) baseStyle.top = line.top
        if (line.bottom) baseStyle.bottom = line.bottom
        if (line.left) baseStyle.left = line.left
        if (line.right) baseStyle.right = line.right

        return (
          <motion.div
            key={`line-${index}`}
            style={baseStyle}
            animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.2, 0.6, 0.2] }}
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
            background: 'linear-gradient(120deg, rgba(255,255,255,0.15), rgba(255, 153, 102, 0.15))',
            boxShadow: '0 50px 120px rgba(109, 73, 55, 0.35)',
          }}
        >
          <motion.div
            initial={{ opacity: 0.2, scale: 0.95 }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.02, 0.95] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 16,
              borderRadius: 32,
              background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3), transparent 55%)',
              filter: 'blur(25px)',
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
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 25px 80px rgba(142, 91, 84, 0.25)',
              overflow: 'hidden',
              backdropFilter: 'blur(12px)',
              position: 'relative',
            }}
            style={{
              transform: `perspective(1600px) rotateX(${cursorTilt.y * 4}deg) rotateY(${cursorTilt.x * -4}deg)`,
              transition: 'transform 0.25s ease',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(249,232,250,0.25))',
                opacity: 0.6,
                pointerEvents: 'none',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.25) 0, transparent 35%)',
                pointerEvents: 'none',
                mixBlendMode: 'soft-light',
              }}
            />
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
                py: { xs: 5, sm: 6, md: 7 },
                background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(249,232,250,0.9) 100%)',
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
                    letterSpacing: 4,
                    color: 'var(--text-secondary)',
                    fontFamily: 'SF Mono, monospace',
                  }}
                >
                  NRV PUBLICATION
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mt: 2, mb: 2 }}>
                  {mode === 'login' ? 'Welcome back to your learning cockpit.' : 'Create your NRV Publication account.'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text-secondary)', mb: 4, maxWidth: 420 }}>
                  {mode === 'login'
                    ? 'Pick up your curated journeys, deep-dive into clinical insights, and stay ahead with premium content crafted for medical professionals.'
                    : 'Unlock immersive study plans, benchmark with peers, and stay future-ready with a single login.'}
                </Typography>

                <Stack spacing={3}>
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
                          background: 'rgba(255,255,255,0.65)',
                          border: '1px solid rgba(0,0,0,0.04)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        }}
                      >
                        <Box
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: mode === 'login' ? 'var(--accent-orange-200)' : 'var(--accent-blue-200)',
                            color: mode === 'login' ? 'var(--accent-orange-400)' : 'var(--accent-blue-400)',
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 4, borderColor: 'rgba(0,0,0,0.08)' }} />
                <Typography variant="body2" color="text.secondary">
                  Prefer a dedicated link?{' '}
                  <NextLink href={mode === 'login' ? '/signup' : '/login'} passHref legacyBehavior>
                    <Link sx={{ fontWeight: 600, color: 'rgb(35,35,35)' }}>
                      {mode === 'login' ? 'Open sign up' : 'Open sign in'}
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
                py: { xs: 5, sm: 6, md: 7 },
                background: 'rgba(255,255,255,0.95)',
                borderLeft: { md: '1px solid rgba(0,0,0,0.05)' },
              }}
            >
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {mode === 'login' ? 'Sign in' : 'Create account'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {mode === 'login'
                    ? 'Enter your credentials to sync progress across devices.'
                    : 'Fill in your details to unlock the full NRV Publication experience.'}
                </Typography>

                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 999,
                    background: 'rgba(0,0,0,0.05)',
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
                      background: 'var(--text-primary)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
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
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        letterSpacing: 0.5,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          textAlign: 'center',
                          color: mode === option.value ? '#fff' : 'rgba(0,0,0,0.45)',
                          transition: 'color 0.3s ease',
                          fontWeight: mode === option.value ? 700 : 600,
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
                        <Alert severity="error" sx={{ mb: 3 }}>
                          {loginError}
                        </Alert>
                      )}
                      <Box component="form" onSubmit={handleLogin}>
                        <Stack spacing={3}>
                          <TextField
                            label="Email address"
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            fullWidth
                            required
                            disabled={isLoggingIn}
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            label="Password"
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            fullWidth
                            required
                            disabled={isLoggingIn}
                            InputLabelProps={{ shrink: true }}
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            disabled={isLoggingIn}
                            sx={{
                              py: 1.4,
                              textTransform: 'none',
                              fontSize: '1rem',
                              fontWeight: 600,
                              borderRadius: 3,
                          color: '#fff',
                              background: 'var(--text-primary)',
                              boxShadow: '0 20px 40px rgba(35,35,35,0.18)',
                              '&:hover': {
                            color: '#fff',
                                background: 'var(--text-secondary)',
                                boxShadow: '0 30px 60px rgba(35,35,35,0.25)',
                              },
                            }}
                            fullWidth
                          >
                            {isLoggingIn ? 'Signing in...' : 'Access dashboard'}
                          </Button>
                          <Typography variant="caption" color="text.secondary" align="center">
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
                        <Alert severity="error" sx={{ mb: 3 }}>
                          {signupError}
                        </Alert>
                      )}
                      <Box component="form" onSubmit={handleSignup}>
                        <Stack spacing={3}>
                          <TextField
                            label="Full name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isSigningUp}
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            label="Email address"
                            type="email"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                            disabled={isSigningUp}
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isSigningUp}
                            helperText="Minimum 6 characters"
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            label="Confirm password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isSigningUp}
                            InputLabelProps={{ shrink: true }}
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            disabled={isSigningUp}
                            sx={{
                              py: 1.4,
                              textTransform: 'none',
                              fontSize: '1rem',
                              fontWeight: 600,
                              borderRadius: 3,
                            color: '#fff',
                              background: 'var(--text-primary)',
                              boxShadow: '0 20px 40px rgba(35,35,35,0.18)',
                              '&:hover': {
                              color: '#fff',
                                background: 'var(--text-secondary)',
                                boxShadow: '0 30px 60px rgba(35,35,35,0.25)',
                              },
                            }}
                            fullWidth
                          >
                            {isSigningUp ? 'Creating account...' : 'Create account'}
                          </Button>
                          <Typography variant="caption" color="text.secondary" align="center">
                            By creating an account, you agree to our Terms of Service and Privacy Policy.
                          </Typography>
                        </Stack>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ mt: 5 }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: 3,
                      background: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(0,0,0,0.04)',
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Average weekly study time
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      6.5 hrs
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: 3,
                      background: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(0,0,0,0.04)',
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Active cohorts live
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      24+
                    </Typography>
                  </Box>
                </Stack>

                {mode === 'signup' && (
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {metrics.map((metric) => (
                      <Grid item xs={12} sm={6} key={metric.label}>
                        <Box
                          sx={{
                            p: 2.5,
                            borderRadius: 3,
                            border: '1px dashed rgba(0,0,0,0.15)',
                            background: 'rgba(255,255,255,0.65)',
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {metric.label}
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: metric.accent }}>
                            {metric.value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
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

