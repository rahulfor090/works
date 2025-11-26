import React from 'react'
import Head from 'next/head'
import { Box, Container, Typography, Grid, Paper, Avatar } from '@mui/material'
import { MainLayout } from '@/components/layout'
import { 
  School as SchoolIcon, 
  People as PeopleIcon, 
  LocalLibrary as LibraryIcon,
  EmojiObjects as IdeaIcon 
} from '@mui/icons-material'

const AboutPage = () => {
  const values = [
    {
      icon: <SchoolIcon sx={{ fontSize: 48 }} />,
      title: 'Excellence in Education',
      description: 'We are committed to providing the highest quality medical education resources to healthcare professionals worldwide.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 48 }} />,
      title: 'Community Focused',
      description: 'Building a global community of medical professionals who learn, share, and grow together.'
    },
    {
      icon: <LibraryIcon sx={{ fontSize: 48 }} />,
      title: 'Comprehensive Resources',
      description: 'Access to extensive medical literature, journals, and educational materials across all specialties.'
    },
    {
      icon: <IdeaIcon sx={{ fontSize: 48 }} />,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to deliver the best learning experience for medical professionals.'
    }
  ]

  return (
    <>
      <Head>
        <title>About Us - Medical Learning Platform</title>
        <meta name="description" content="Learn about our mission to empower medical professionals with world-class educational resources" />
      </Head>

      <MainLayout>
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: 8,
            mb: 6
          }}
        >
          <Container maxWidth="lg">
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
              }}
            >
              About Us
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                maxWidth: 800, 
                opacity: 0.9,
                fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
              }}
            >
              Empowering Medical Minds Through Quality Education
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ mb: 8 }}>
          {/* Mission Section */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 3,
                fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
              }}
            >
              Our Mission
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.8, 
                color: 'text.secondary',
                fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
              }}
            >
              We are dedicated to advancing medical education by providing healthcare professionals with access to 
              comprehensive, up-to-date, and evidence-based learning resources. Our platform bridges the gap between 
              traditional medical education and the evolving needs of modern healthcare practice.
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.8, 
                color: 'text.secondary',
                fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
              }}
            >
              Through our extensive collection of medical books, journals, videos, and interactive content, we strive 
              to support continuous learning and professional development for medical students, residents, and practicing 
              physicians across all specialties.
            </Typography>
          </Box>

          {/* Values Section */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 4, 
                textAlign: 'center',
                fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
              }}
            >
              Our Core Values
            </Typography>
            <Grid container spacing={4}>
              {values.map((value, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: '100%',
                      textAlign: 'center',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {value.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600,
                        fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* What We Offer Section */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 3,
                fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
              }}
            >
              What We Offer
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'primary.main',
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Extensive Medical Library
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Access thousands of medical textbooks, reference materials, and journals covering all major 
                    medical specialties including biochemistry, cardiology, surgery, pediatrics, and more.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'primary.main',
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Expert Mentorship
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Learn from experienced medical professionals and specialists who bring real-world clinical 
                    experience and teaching expertise to guide your learning journey.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'primary.main',
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Interactive Learning
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Engage with multimedia content including video lectures, clinical cases, and interactive 
                    modules designed to enhance understanding and retention.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'primary.main',
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Always Current
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Stay updated with the latest medical research, guidelines, and evidence-based practices 
                    through our regularly updated content library.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Stats Section */}
          <Box sx={{ mb: 8 }}>
            <Paper
              elevation={3}
              sx={{
                p: 6,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <Grid container spacing={4} textAlign="center">
                <Grid item xs={6} md={3}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    8+
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Books
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    3+
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Videos
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    5+
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Journals
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    1+
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{
                      fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
                    }}
                  >
                    Cases
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          {/* Contact CTA */}
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
              }}
            >
              Join Our Community
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              paragraph 
              sx={{ 
                mb: 3,
                fontFamily: '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif'
              }}
            >
              Start your journey towards medical excellence today
            </Typography>
          </Box>
        </Container>
      </MainLayout>
    </>
  )
}

export default AboutPage
