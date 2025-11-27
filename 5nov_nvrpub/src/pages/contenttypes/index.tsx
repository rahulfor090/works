import React, { FC } from 'react'
import { GetStaticProps } from 'next'
import { NextPageWithLayout } from '@/interfaces/layout'
import Head from 'next/head'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { MainLayout } from '@/components/layout'
import { data } from '@/components/home/data/popular-content.data'

interface Contenttype {
  name: string
  slug: string
  description: string
  image: string
  contentCount: number
}

interface Props {
  contenttypes: Contenttype[]
}

const ContenttypesPage: NextPageWithLayout<Props> = ({ contenttypes }) => {
  const theme = useTheme()

  return (
    <>
      <Head>
        <title>Content Types - Jaypee Digital</title>
        <meta name="description" content="Browse all content types available on Jaypee Digital" />
      </Head>
      
      <Box
        sx={{
          pt: { xs: 6, md: 8 },
          pb: 8,
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography 
              variant="h1" 
              sx={{ 
                mb: 2, 
                fontSize: { xs: 32, md: 48 },
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              Content Types
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Explore our comprehensive collection of educational content across different content types
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {contenttypes.map((contenttype: Contenttype) => (
              <Grid item xs={12} sm={6} md={4} key={contenttype.slug}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: theme.transitions.create(['transform', 'box-shadow']),
                    willChange: 'transform',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      backgroundColor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          color: 'white',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: 2,
                        }}
                      >
                        {contenttype.name.charAt(0)}
                      </Typography>
                    </Box>
                  </CardMedia>
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 600,
                        color: 'text.primary'
                      }}
                    >
                      {contenttype.name}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 3, 
                        color: 'text.secondary',
                        lineHeight: 1.6
                      }}
                    >
                      {contenttype.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {contenttype.contentCount} {contenttype.contentCount === 1 ? 'Content' : 'Contents'}
                      </Typography>
                    </Box>
                    
                    <Link href={`/contenttypes/${contenttype.slug}`}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                          textTransform: 'none',
                          borderRadius: 2,
                        }}
                      >
                        Explore {contenttype.name}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

ContenttypesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>

export const getStaticProps: GetStaticProps = async () => {
  // Get unique contenttypes from the data
  const contenttypeMap = new Map<string, { count: number; name: string }>()
  
  data.forEach((content) => {
    if (content.contenttype) {
      const contenttypeName = content.contenttype.charAt(0).toUpperCase() + content.contenttype.slice(1)
      if (contenttypeMap.has(content.contenttype)) {
        contenttypeMap.get(content.contenttype)!.count++
      } else {
        contenttypeMap.set(content.contenttype, { count: 1, name: contenttypeName })
      }
    }
  })

  const contenttypes: Contenttype[] = Array.from(contenttypeMap.entries()).map(([slug, info]) => ({
    slug,
    name: info.name,
    description: `Explore ${info.name.toLowerCase()} content and resources`,
    image: `/images/contenttypes/${slug}.jpg`,
    contentCount: info.count,
  }))

  return {
    props: {
      contenttypes,
    },
  }
}

function getContenttypeDescription(contenttype: string): string {
  const descriptions: Record<string, string> = {
    books: 'Comprehensive textbooks and reference materials covering various medical and healthcare subjects.',
    videos: 'Interactive video lectures and tutorials to enhance your learning experience.',
    journals: 'Latest research articles and academic publications in medical and healthcare fields.',
  }
  
  return descriptions[contenttype] || 'Explore our collection of educational content in this content type.'
}

export default ContenttypesPage
