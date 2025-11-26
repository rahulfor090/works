import React, { FC, useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '@/interfaces/layout'
import Head from 'next/head'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Rating from '@mui/material/Rating'
import { useTheme, styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import IconButton from '@mui/material/IconButton'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowForward from '@mui/icons-material/ArrowForward'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import CategoryIcon from '@mui/icons-material/Category'
import FilterListIcon from '@mui/icons-material/FilterList'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { MainLayout } from '@/components/layout'
import { Content } from '@/interfaces/content'

interface Props {
  contenttype: string
  contenttypeData: any
  contents: Content[]
  subjectcategories: any[]
}

const FALLBACK_IMAGE = '/images/courses/JMEDS_Cover.jpeg'

const StyledCard = styled(motion.div)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  borderRadius: 24,
  overflow: 'hidden',
  border: '1px solid rgba(148,163,184,0.15)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
    '& .cover-overlay': {
      opacity: 1,
    },
    '& .arrow-btn': {
      background: 'linear-gradient(90deg, #FF6B6B 0%, #FF8E53 100%)',
      color: '#fff',
    }
  },
}))

const GradientText = styled('span')(({ theme }) => ({
  background: 'linear-gradient(90deg, #FF6B6B 0%, #FF8E53 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}))

const VideoCard = ({ video, index }: { video: any, index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeId(video.url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : FALLBACK_IMAGE;

  return (
    <StyledCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Box sx={{ position: 'relative', pt: '56.25%', backgroundColor: '#000' }}>
        {isPlaying && videoId ? (
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <Box
              component="img"
              src={thumbnailUrl}
              alt={video.title}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e: any) => { e.target.src = FALLBACK_IMAGE }}
            />
            <Box
              className="cover-overlay"
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.3s ease',
                '&:hover': {
                  background: 'rgba(0,0,0,0.5)',
                }
              }}
              onClick={() => setIsPlaying(true)}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <PlayArrowIcon sx={{ fontSize: 32, color: '#FF6B6B', ml: 0.5 }} />
              </Box>
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.3,
            color: '#0A2540',
          }}
        >
          {video.title}
        </Typography>


      </Box>
    </StyledCard>
  );
};

const ContenttypeDetailsPage: NextPageWithLayout<Props> = ({ contenttype, contenttypeData, contents, subjectcategories }) => {
  const theme = useTheme()
  const [activeSubjectcategory, setActiveSubjectcategory] = useState(0)

  const getFilteredContents = () => {
    if (activeSubjectcategory === 0) {
      return contents
    }
    const selectedSubjectcategory = subjectcategories[activeSubjectcategory - 1]
    return contents.filter((content: Content) => content.subjectcategoryId === selectedSubjectcategory.id)
  }

  const contenttypeName = contenttypeData?.title || contenttype.charAt(0).toUpperCase() + contenttype.slice(1)
  const filteredContents = getFilteredContents()
  const totalContents = contents.length
  const totalCategories = subjectcategories.length

  const heroStats = [
    { label: `${contenttype === 'videos' ? 'Videos' : 'Books'} available`, value: totalContents, icon: <MenuBookIcon /> },
    { label: 'Subject categories', value: totalCategories || '—', icon: <CategoryIcon /> },
    { label: 'Showing now', value: filteredContents.length, icon: <FilterListIcon /> },
  ]

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 50%, #FFF5F5 100%)' }}>
      <Head>
        <title>{contenttypeName} Contents - Jaypee Digital</title>
        <meta name="description" content={`Browse all ${contenttypeName.toLowerCase()} contents available on Jaypee Digital`} />
      </Head>

      <Box sx={{ pt: { xs: 4, md: 8 }, pb: 8 }}>
        {/* Hero Section */}
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Stack spacing={3}>
                  {/* Breadcrumbs */}
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                    <Typography variant="caption">/</Typography>
                    <Link href="/contenttypes" style={{ textDecoration: 'none', color: 'inherit' }}>Content Types</Link>
                    <Typography variant="caption">/</Typography>
                    <Typography color="text.primary" fontWeight={500}>{contenttypeName}</Typography>
                  </Stack>

                  <Box>
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1.1, color: '#0A2540' }}>
                      {contenttypeName} <GradientText>Collection</GradientText>
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem', maxWidth: 600, lineHeight: 1.6 }}>
                      {getContenttypeDescription(contenttype)}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={2} sx={{ pt: 2, flexWrap: 'wrap', gap: 2 }}>
                    {heroStats.map((stat, index) => (
                      <Box
                        key={stat.label}
                        sx={{
                          p: 2.5,
                          borderRadius: 4,
                          backgroundColor: 'rgba(255,255,255,0.6)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.8)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                          minWidth: 140,
                          flex: { xs: '1 1 100%', sm: '0 1 auto' }
                        }}
                      >
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1, color: 'text.secondary' }}>
                          {React.cloneElement(stat.icon as any, { fontSize: 'small' })}
                          <Typography variant="caption" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            {stat.label}
                          </Typography>
                        </Stack>
                        <Typography variant="h4" fontWeight={800} color="text.primary">
                          {stat.value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </motion.div>
            </Grid>

            {/* Decorative Image/Graphic could go here in the other grid column */}
          </Grid>
        </Container>

        {/* Content Section */}
        <Container maxWidth="lg" sx={{ mt: 8 }}>
          {/* Categories Filter */}
          {subjectcategories.length > 0 && (
            <Box sx={{ mb: 6 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#0A2540' }}>Browse by Category</Typography>
                <Typography variant="body2" color="text.secondary">{filteredContents.length} results</Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 2, '::-webkit-scrollbar': { display: 'none' } }}>
                <Button
                  onClick={() => setActiveSubjectcategory(0)}
                  variant={activeSubjectcategory === 0 ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: '999px',
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    whiteSpace: 'nowrap',
                    boxShadow: activeSubjectcategory === 0 ? '0 8px 20px rgba(255,107,107,0.25)' : 'none',
                    background: activeSubjectcategory === 0 ? 'linear-gradient(90deg, #FF6B6B 0%, #FF8E53 100%)' : 'transparent',
                    border: activeSubjectcategory === 0 ? 'none' : `1px solid ${theme.palette.divider}`,
                    color: activeSubjectcategory === 0 ? '#fff' : 'text.secondary',
                  }}
                >
                  All {contenttype === 'videos' ? 'Videos' : 'Books'}
                </Button>
                {subjectcategories.map((category, index) => (
                  <Button
                    key={category.id}
                    onClick={() => setActiveSubjectcategory(index + 1)}
                    variant={activeSubjectcategory === index + 1 ? 'contained' : 'outlined'}
                    sx={{
                      borderRadius: '999px',
                      textTransform: 'none',
                      px: 3,
                      py: 1,
                      whiteSpace: 'nowrap',
                      boxShadow: activeSubjectcategory === index + 1 ? '0 8px 20px rgba(255,107,107,0.25)' : 'none',
                      background: activeSubjectcategory === index + 1 ? 'linear-gradient(90deg, #FF6B6B 0%, #FF8E53 100%)' : 'transparent',
                      border: activeSubjectcategory === index + 1 ? 'none' : `1px solid ${theme.palette.divider}`,
                      color: activeSubjectcategory === index + 1 ? '#fff' : 'text.secondary',
                    }}
                  >
                    {category.title}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}

          {/* Content Grid */}
          {filteredContents.length > 0 ? (
            <Grid container spacing={4}>
              {filteredContents.map((content: any, index) => {
                if (contenttype === 'videos') {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <VideoCard video={content} index={index} />
                    </Grid>
                  )
                }

                const imageSrc = content.image || content.coverImage || FALLBACK_IMAGE
                const ratingValue = Math.max(0, Math.min(5, Number(content.rating) || 0))

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={content.id}>
                    <Link href={`/content/book/${content.isbn}`} style={{ textDecoration: 'none' }}>
                      <StyledCard
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Box sx={{ position: 'relative', pt: '133%', backgroundColor: '#f1f5f9' }}>
                          <Box
                            component="img"
                            src={imageSrc}
                            alt={content.title}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            onError={(e: any) => { e.target.src = FALLBACK_IMAGE }}
                          />
                          <Box
                            className="cover-overlay"
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                            }}
                          />
                          <Chip
                            label={content.subject || 'General'}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              backgroundColor: 'rgba(255,255,255,0.9)',
                              backdropFilter: 'blur(4px)',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                            }}
                          />
                        </Box>

                        <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              fontSize: '1.1rem',
                              mb: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              lineHeight: 1.3,
                              color: '#0A2540',
                            }}
                          >
                            {content.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              mb: 2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {content.authors || 'Unknown Author'}
                          </Typography>

                          <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Rating value={ratingValue} readOnly size="small" sx={{ color: '#FBBF24' }} />
                            <Box
                              className="arrow-btn"
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                backgroundColor: '#f1f5f9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                                color: 'text.secondary',
                              }}
                            >
                              <ArrowForwardIcon sx={{ fontSize: 16 }} />
                            </Box>
                          </Box>
                        </Box>
                      </StyledCard>
                    </Link>
                  </Grid>
                )
              })}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 10, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 8, border: '1px dashed rgba(148,163,184,0.3)' }}>
              <Box sx={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                <MenuBookIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
              </Box>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>No items found</Typography>
              <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                We couldn't find any items in this category. Try selecting a different category or view all.
              </Typography>
              <Button
                onClick={() => setActiveSubjectcategory(0)}
                variant="outlined"
                sx={{ borderRadius: '999px', textTransform: 'none' }}
              >
                View All
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}

ContenttypeDetailsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params!

  try {
    // Fetch content type data
    const contenttypeRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/contenttypes`)
    const contenttypesData = await contenttypeRes.json()
    let contenttypeData = contenttypesData.find((ct: any) => ct.slug === slug)

    // Fallback for books/videos if not in DB
    if (!contenttypeData) {
      if (slug === 'books') {
        contenttypeData = {
          id: 999,
          title: 'Books',
          slug: 'books',
          description: 'Explore our comprehensive collection of medical textbooks and reference materials.',
          icon: 'MenuBook',
          displayOrder: 1,
          ishomepage: 0,
          isActive: 1
        }
      } else if (slug === 'videos') {
        contenttypeData = {
          id: 998,
          title: 'Videos',
          slug: 'videos',
          description: 'Interactive video lectures and tutorials designed to enhance your learning experience.',
          icon: 'PlayCircle',
          displayOrder: 2,
          ishomepage: 0,
          isActive: 1
        }
      }
    }

    if (!contenttypeData) {
      return {
        notFound: true,
      }
    }

    // Fetch data depending on content type
    let contents: any[] = []
    if (slug === 'books') {
      const booksRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/books/active`)
      const booksPayload = await booksRes.json()
      const allBooks = Array.isArray(booksPayload?.data) ? booksPayload.data : booksPayload
      contents = allBooks
    } else if (slug === 'videos') {
      // Hardcoded videos as requested
      contents = [
        {
          id: 1,
          title: 'Anuv Jain X Lost Stories - Arz Kiya Hai (Official Video) | Coke Studio Bharat',
          url: 'https://youtu.be/bP8ATWCvqzw?si=g4IQyqgymXdjOQda',
          subjectcategoryId: 0 // General
        },
        {
          id: 2,
          title: 'Kaifi Khalil - Kahani Suno 2.0 [Official Music Video]',
          url: 'https://youtu.be/_XBVWlI8TsQ?si=eAiRUnlZ_P9MjmRZ',
          subjectcategoryId: 0 // General
        },
        {
          id: 3,
          title: 'HASEEN - TALWIINDER, NDS, RIPPY (Official Visualizer)',
          url: 'https://youtu.be/IltsOcCj1Ak?si=k-bqCL5EbAD7GTYs',
          subjectcategoryId: 0 // General
        }
      ]
    } else {
      const contentsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/contents`)
      const allContents = await contentsRes.json()
      contents = allContents.filter((content: any) => content.contentTypeId === contenttypeData.id)
    }

    // Fetch subject categories data
    let subjectcategories = []
    if (slug !== 'videos') {
      const subjectcategoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/subjectcategories`)
      const allSubjectcategories = await subjectcategoriesRes.json()

      if (Array.isArray(allSubjectcategories)) {
        const uniqueIds = new Set(
          contents
            .map((content: any) => Number(content.subjectcategoryId))
            .filter((id: number) => Number.isFinite(id) && id > 0)
        )
        const contentSubjectcategoryIds = Array.from(uniqueIds)
        subjectcategories = allSubjectcategories.filter((sc: any) =>
          contentSubjectcategoryIds.includes(sc.id)
        )
      }
    }

    return {
      props: {
        contenttype: slug,
        contenttypeData,
        contents,
        subjectcategories,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      notFound: true,
      props: {
        contenttype: slug,
        contenttypeData: null,
        contents: [],
        subjectcategories: []
      }
    }
  }
}

function getContenttypeDescription(contenttype: string): string {
  const descriptions: Record<string, string> = {
    books: 'Comprehensive textbooks and reference materials covering various medical and healthcare subjects. Our book collection includes the latest editions and authoritative content from leading medical publishers.',
    videos: 'Interactive video lectures and tutorials designed to enhance your learning experience. Access high-quality educational content with expert instructors and practical demonstrations.',
    journals: 'Latest research articles and academic publications in medical and healthcare fields. Stay updated with cutting-edge research and clinical studies from renowned medical journals.',
  }

  return descriptions[contenttype] || 'Explore our comprehensive collection of educational content in this content type, designed to support your learning journey.'
}

export default ContenttypeDetailsPage
