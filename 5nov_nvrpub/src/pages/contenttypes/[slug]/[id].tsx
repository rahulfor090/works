import React from 'react'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '@/interfaces/layout'
import Head from 'next/head'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import Image from 'next/image'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { MainLayout } from '@/components/layout'
interface BookPageProps {
  slug: string
  book?: any
  chapters?: any[]
}

const CourseDetailPage: NextPageWithLayout<BookPageProps> = ({ slug, book, chapters }) => {
  const theme = useTheme()
  const isBook = slug === 'books'
  const contenttypeName = isBook ? 'Books' : slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <>
      <Head>
        <title>{isBook ? book?.title : 'Content'} - {contenttypeName}</title>
        <meta name="description" content={isBook ? `Details for ${book?.title}` : `Details for ${contenttypeName}`} />
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
          <Breadcrumbs sx={{ mb: 4 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Typography color="text.secondary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                Home
              </Typography>
            </Link>
            <Link href="/contenttypes" style={{ textDecoration: 'none' }}>
              <Typography color="text.secondary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                Content Types
              </Typography>
            </Link>
            <Link href={`/contenttypes/${slug}`} style={{ textDecoration: 'none' }}>
              <Typography color="text.secondary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                {contenttypeName}
              </Typography>
            </Link>
            <Typography color="text.primary">{isBook ? book?.title : contenttypeName}</Typography>
          </Breadcrumbs>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Link href={`/contenttypes/${slug}`}>
              <IconButton sx={{ mr: 2 }}>
                <ArrowBack />
              </IconButton>
            </Link>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: 28, md: 40 },
                fontWeight: 700,
              }}
            >
              {isBook ? book?.title : contenttypeName}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{
                p: 2,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                textAlign: 'center',
              }}>
                <Image src={(isBook ? (book?.coverImage || '/images/courses/JMEDS_Cover.jpeg') : '/images/home-feature.jpg')} width={300} height={420} alt={isBook ? (book?.title || 'Book') : contenttypeName} />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{
                p: 3,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}>
                {isBook ? (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating name="rating-book" value={book?.rating || 0} max={5} sx={{ color: '#ffce31', mr: 1 }} readOnly />
                      <Typography component="span" variant="h6">
                        ({book?.ratingCount || 0})
                      </Typography>
                    </Box>
                    {book?.author && (
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Author: <strong>{book.author}</strong>
                      </Typography>
                    )}
                    {book?.description && (
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {book.description}
                      </Typography>
                    )}

                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Chapters
                    </Typography>
                    {chapters && chapters.length > 0 ? (
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1 }}>
                        {chapters.map((ch: any) => (
                          <Box key={ch.id} sx={{ p: 1.5, borderRadius: 1, border: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">{typeof ch.number === 'number' ? `Chapter ${ch.number}` : 'Chapter'}</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>{ch.title}</Typography>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">No chapters available</Typography>
                    )}

                    <Link href={`/contenttypes/${slug}`}>
                      <Button variant="outlined" sx={{ mt: 3 }}>Back to {contenttypeName}</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      This content type detail page is currently focused on Books.
                    </Typography>
                    <Link href={`/contenttypes/${slug}`}>
                      <Button variant="outlined">Back to {contenttypeName}</Button>
                    </Link>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

CourseDetailPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const slug = params?.slug as string
  const idParam = params?.id as string
  const id = Number(idParam)
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || `${protocol}://${host}`

  if (slug === 'books') {
    try {
      const res = await fetch(`${apiUrl}/api/books/${id}`)
      if (!res.ok) {
        return { notFound: true }
      }
      const data = await res.json()
      return {
        props: {
          slug,
          book: data.book,
          chapters: data.chapters || [],
        },
      }
    } catch (e) {
      return { notFound: true }
    }
  }

  // Fallback for non-books: keep minimal props
  return {
    props: {
      slug,
    },
  }
}

export default CourseDetailPage


