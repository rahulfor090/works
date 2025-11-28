import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    primary: {
      main: '#268bbb',
    },
  },
})

const AdminLogin = () => {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (data.success) {
        // Store token/session in sessionStorage (clears on browser close)
        if (data.token) {
          sessionStorage.setItem('adminToken', data.token)
        }
        // Store user information in sessionStorage
        if (data.user) {
          sessionStorage.setItem('adminUser', JSON.stringify(data.user))
        }
        router.push('/admin')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Admin Login - Jaypee Digital</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: '#f5f5f5'
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <img 
              src="/images/nvr-logo.jpg" 
              alt="Logo" 
              style={{ height: '60px', objectFit: 'contain' }}
            />
          </Box>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 700 }}>
              Admin Login
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              margin="normal"
              required
              disabled={loading}
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              margin="normal"
              required
              disabled={loading}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  </ThemeProvider>
  )
}

export default AdminLogin