import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from '@mui/material'

const SignupPage: NextPage = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // No functionality - just prevent default
    console.log('Signup form submitted (no functionality)')
  }

  return (
    <>
      <Head>
        <title>Sign Up | NRV Publication</title>
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign up to get started
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSignup}>
              <TextField
                fullWidth
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
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
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                Sign Up
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <NextLink href="/login" passHref legacyBehavior>
                  <Link sx={{ color: '#7e3794', fontWeight: 600 }}>
                    Sign In
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

export default SignupPage
