import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Alert,
} from '@mui/material'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Hardcoded credentials
    if (email === 'superuser@gmail.com' && password === 'superuser') {
      // Store user session in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: 'superuser@gmail.com',
        isPremium: true,
      }))
      // Redirect to home or previous page
      router.push('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <>
      <Head>
        <title>Login | NRV Publication</title>
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to your account
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#7e3794',
                  '&:hover': { backgroundColor: '#6a2d7d' },
                  mb: 2,
                }}
              >
                Sign In
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <NextLink href="/signup" passHref legacyBehavior>
                  <Link sx={{ color: '#7e3794', fontWeight: 600 }}>
                    Sign Up
                  </Link>
                </NextLink>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  )
}

export default LoginPage
