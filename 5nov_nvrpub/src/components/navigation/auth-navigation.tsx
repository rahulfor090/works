import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { StyledButton } from '@/components/styled-button'
import { useRouter } from 'next/router'
import { Button, Typography } from '@mui/material'

const AuthNavigation: FC = () => {
  const router = useRouter()
  const [user, setUser] = React.useState<{ email: string; isPremium: boolean } | null>(null)

  React.useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        setUser(JSON.parse(userStr))
      } catch {}
    }
  }, [])

  const handleSignIn = () => {
    router.push('/login')
  }

  const handleSignUp = () => {
    router.push('/signup')
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  if (user) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
          Welcome, <strong>{user.email}</strong>
          {user.isPremium && (
            <Box component="span" sx={{ ml: 1, color: 'primary.main', fontWeight: 600 }}>
              (Premium)
            </Box>
          )}
        </Typography>
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{
            borderColor: '#7e3794',
            color: '#7e3794',
            '&:hover': {
              borderColor: '#6a2d7d',
              backgroundColor: 'rgba(126, 55, 148, 0.04)',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ '& button:first-of-type': { mr: 2 } }}>
      <StyledButton disableHoverEffect={true} variant="outlined" onClick={handleSignIn}>
        Sign In
      </StyledButton>
      <StyledButton disableHoverEffect={true} onClick={handleSignUp}>
        Sign Up
      </StyledButton>
    </Box>
  )
}

export default AuthNavigation
