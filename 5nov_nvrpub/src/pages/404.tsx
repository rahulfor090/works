import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/interfaces/layout'
import Head from 'next/head'
import NextLink from 'next/link'
import { Box, Button, Container, Typography } from '@mui/material'

const NotFoundPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 2 }}>404 — Page Not Found</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you’re looking for doesn’t exist or may have moved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button component={NextLink} href="/" variant="contained">Go to Home</Button>
          <Button component={NextLink} href="/search" variant="outlined">Search</Button>
          <Button component={NextLink} href="/content/book/22" variant="outlined">Open Sample Book</Button>
        </Box>
      </Container>
    </>
  )
}

NotFoundPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default NotFoundPage

