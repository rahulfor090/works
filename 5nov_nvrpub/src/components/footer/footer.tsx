import React, { FC } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { FooterNavigation, FooterSocialLinks } from '@/components/footer'
import { headingFontFamily } from '@/config/theme/typography'

const FooterContainer = styled(Box)({
  backgroundColor: '#F8F6F3',
  borderTop: '1px solid rgba(28, 28, 28, 0.1)',
  paddingTop: '60px',
  paddingBottom: '40px',
})

const NewsletterForm = styled(Box)({
  display: 'flex',
  gap: '12px',
  marginTop: '20px',
  '& .MuiTextField-root': {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      backgroundColor: '#FFFFFF',
      border: '1px solid rgba(28, 28, 28, 0.1)',
      '&:hover': {
        borderColor: '#EEC1B7',
      },
      '&.Mui-focused': {
        borderColor: '#EEC1B7',
      },
    },
  },
  '& .MuiButton-root': {
    borderRadius: 0,
    padding: '14px 32px',
    backgroundColor: '#1C1C1C',
    color: '#F8F6F3',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: '0.875rem',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#EEC1B7',
      color: '#1C1C1C',
    },
  },
})

const Footer: FC = () => {
  const [email, setEmail] = React.useState('')

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      // Handle subscription
      console.log('Subscribed:', email)
      setEmail('')
    }
  }

  return (
    <FooterContainer component="footer">
      <Container>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Newsletter Section */}
          <Grid item xs={12} md={4}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: headingFontFamily,
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#1C1C1C',
                  mb: 2,
                  letterSpacing: '0.05em',
                }}
              >
                Stay Connected
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#717171',
                  lineHeight: 1.6,
                  mb: 2,
                }}
              >
                Subscribe to our newsletter for updates on new collections and resources.
              </Typography>
              <NewsletterForm>
                <TextField
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubscribe()
                    }
                  }}
                />
                <Button onClick={handleSubscribe}>Subscribe</Button>
              </NewsletterForm>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: headingFontFamily,
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#1C1C1C',
                  mb: 2,
                  letterSpacing: '0.05em',
                }}
              >
                Contact
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#717171',
                  lineHeight: 1.8,
                  mb: 1,
                }}
              >
                A-12, Sector 60, Noida - 201301
                <br />
                Uttar Pradesh, India
                <br />
                Phone: +91-120-4200800
                <br />
                Email: info@jaypeedigi.com
              </Typography>
              <Box sx={{ mt: 2 }}>
                <FooterSocialLinks />
              </Box>
            </Box>
          </Grid>

          {/* Navigation */}
          <Grid item xs={12} md={4}>
            <FooterNavigation />
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            pt: 4,
            borderTop: '1px solid rgba(28, 28, 28, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#717171',
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
            }}
          >
            © {new Date().getFullYear()} Jaypee Digital. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  )
}

export default Footer
