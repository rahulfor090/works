import React, { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
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
import { data } from '@/components/home/popular-course.data'
import { Course } from '@/interfaces/course'

interface Props {
  course: Course
}

const CourseDetailPage: NextPageWithLayout<Props> = ({ course }) => {
  const theme = useTheme()
  const contenttypeName = course.contenttype.charAt(0).toUpperCase() + course.contenttype.slice(1)

  return (
    <>
      <Head>
        <title>{course.title} - {contenttypeName}</title>
        <meta name="description" content={`Details for ${course.title}`} />
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
            <Link href={`/contenttypes/${course.contenttype}`} style={{ textDecoration: 'none' }}>
              <Typography color="text.secondary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                {contenttypeName}
              </Typography>
            </Link>
            <Typography color="text.primary">{course.title}</Typography>
          </Breadcrumbs>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Link href={`/contenttypes/${course.contenttype}`}>
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
              {course.title}
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
                <Image src={course.cover} width={300} height={420} alt={course.title} />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{
                p: 3,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating name="rating-course" value={course.rating} max={5} sx={{ color: '#ffce31', mr: 1 }} readOnly />
                  <Typography component="span" variant="h6">
                    ({course.ratingCount})
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Content Type: <strong>{contenttypeName}</strong>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Subject Category: <strong>{course.subjectcategory.charAt(0).toUpperCase() + course.subjectcategory.slice(1)}</strong>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  This is a demo details page. You can extend this section with more metadata, description, authors, publication info, pricing, and actions.
                </Typography>
                <Link href={`/contenttypes/${course.contenttype}`}>
                  <Button variant="outlined">Back to {contenttypeName}</Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

CourseDetailPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = data.map((course) => ({
    params: { slug: course.contenttype, id: String(course.id) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const idParam = params?.id as string

  const course = data.find((c) => c.contenttype === slug && String(c.id) === idParam)

  if (!course) {
    return { notFound: true }
  }

  return {
    props: {
      course,
    },
  }
}

export default CourseDetailPage


