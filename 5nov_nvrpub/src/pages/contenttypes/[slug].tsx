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
import { MainLayout } from '@/components/layout'
import { Content } from '@/interfaces/content'

interface Props {
  contenttype: string
  contenttypeData: any
  contents: Content[]
  subjectcategories: any[]
  allSubjectcategories: any[]
  allSubjects: any[]
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

const ContenttypeDetailsPage: NextPageWithLayout<Props> = ({ contenttype, contenttypeData, contents, subjectcategories, allSubjectcategories, allSubjects }) => {
  const theme = useTheme()
  const [activeSubjectcategory, setActiveSubjectcategory] = useState(0)

  // Wrapper to debug state changes
  const handleSetActiveSubject = (value: number) => {
    console.log('🔵 Setting activeSubjectcategory to:', value)
    setActiveSubjectcategory(value)
  }

  // Debug: Log subjects on mount
  useEffect(() => {
    console.log('📚 All subjects available:', allSubjects)
  }, [])

  // Handle category query parameter from URL - auto-select the subject button
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const categoryId = urlParams.get('category')
      if (categoryId) {
        // Find the subject index that matches this category ID
        const subjectIndex = allSubjects.findIndex(s => s.id === parseInt(categoryId))
        if (subjectIndex !== -1) {
          setActiveSubjectcategory(subjectIndex + 1)
        }
      }
    }
  }, [allSubjects])

  // Debug: Log when activeSubjectcategory changes
  useEffect(() => {
    console.log('activeSubjectcategory changed to:', activeSubjectcategory)
    if (activeSubjectcategory > 0 && allSubjects.length > 0) {
      console.log('Selected subject:', allSubjects[activeSubjectcategory - 1])
    }
  }, [activeSubjectcategory, allSubjects])

  const getFilteredContents = () => {
    let filtered = contents

    // Apply subject filter from buttons if selected
    if (activeSubjectcategory > 0 && allSubjects.length > 0) {
      const selectedSubject = allSubjects[activeSubjectcategory - 1]

      // Safety check: if selectedSubject is undefined, return empty array
      if (!selectedSubject || !selectedSubject.id) {
        console.error('Invalid subject selected:', activeSubjectcategory, allSubjects)
        return []
      }

      // Debug logging
      if (typeof window !== 'undefined') {
        console.log('=== FILTERING BOOKS ===')
        console.log('Selected subject:', selectedSubject)
        console.log('Selected subject ID:', selectedSubject.id)
        console.log('Total books before filter:', contents.length)
      }

      let debugCount = 0
      filtered = filtered.filter((content: Content) => {
        const subjectIds = (content as any).subjectcategoryIds

        // Debug first few books
        if (typeof window !== 'undefined' && debugCount < 3) {
          console.log(`Book "${content.title}" has subjectIds:`, subjectIds)
          debugCount++
        }

        // Ensure subjectIds is an array and not empty
        if (!Array.isArray(subjectIds) || subjectIds.length === 0) {
          return false
        }

        // Check if the selected subject ID is in the book's subject IDs
        const matches = subjectIds.includes(selectedSubject.id)
        return matches
      })

      if (typeof window !== 'undefined') {
        console.log('Filtered results:', filtered.length, 'out of', contents.length)
        console.log('===================')
      }
    }

    return filtered
  }

  const contenttypeName = contenttypeData?.title || contenttype.charAt(0).toUpperCase() + contenttype.slice(1)
  const filteredContents = getFilteredContents()
  const totalContents = contents.length
  const totalCategories = allSubjects.length

  // Debug: log current state
  React.useEffect(() => {
    console.log('Active subject category:', activeSubjectcategory)
    console.log('Total contents:', contents.length)
    console.log('Filtered contents:', filteredContents.length)
    console.log('All subjects:', allSubjects.length)
  }, [activeSubjectcategory, filteredContents.length])

  const heroStats = [
    { label: 'Books available', value: totalContents, icon: <MenuBookIcon /> },
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
          {/* Subjects Filter */}
          {allSubjects.length > 0 && (
            <Box sx={{ mb: 6 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#0A2540' }}>Browse by Subject</Typography>
                <Typography variant="body2" color="text.secondary">{filteredContents.length} results</Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 2, '::-webkit-scrollbar': { display: 'none' } }}>
                <Button
                  onClick={() => handleSetActiveSubject(0)}
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
                  All Books
                </Button>
                {allSubjects.map((subject, index) => {
                  const handleClick = () => {
                    console.log('🔴 Button clicked:', subject.subject, 'Subject ID:', subject.id, 'Index:', index + 1)
                    handleSetActiveSubject(index + 1)
                  }

                  return (
                    <Button
                      key={subject.id}
                      onClick={handleClick}
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
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                      }}
                    >
                      {subject.subject}
                    </Button>
                  )
                })}
              </Stack>
            </Box>
          )}

          {/* Books Grid */}
          {filteredContents.length > 0 ? (
            <Grid container spacing={4}>
              {filteredContents.map((content: Content, index) => {
                const imageSrc = content.image || content.coverImage || FALLBACK_IMAGE
                const ratingValue = Math.max(0, Math.min(5, Number(content.rating) || 0))

                // Get the category/subject name to display
                let categoryName = 'General'

                // First, try to get from subjectcategoryIds array (these are actually subject IDs from the subjects table)
                const subjectIdsArray = (content as any).subjectcategoryIds || []
                if (Array.isArray(subjectIdsArray) && subjectIdsArray.length > 0 && allSubjects.length > 0) {
                  const firstSubjectId = subjectIdsArray[0]
                  const firstSubject = allSubjects.find(s => s.id === firstSubjectId)
                  if (firstSubject && firstSubject.subject) {
                    categoryName = firstSubject.subject
                  }
                }

                // If still General, try the category field (from subjectcategory table)
                if (categoryName === 'General' && (content as any).category) {
                  categoryName = (content as any).category
                }

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={content.id}>
                    <Link href={contenttype === 'journals' ? `/content/journal/${content.id}` : `/content/book/${content.isbn}`} style={{ textDecoration: 'none' }}>
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
                            label={categoryName}
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
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                {activeSubjectcategory > 0 ? 'No books available' : 'No books found'}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                {activeSubjectcategory > 0
                  ? `There are no books available for "${allSubjects[activeSubjectcategory - 1]?.subject}" at the moment. Try selecting a different subject or view all books.`
                  : 'We couldn\'t find any books. Try selecting a different filter or view all books.'
                }
              </Typography>
              <Button
                onClick={() => handleSetActiveSubject(0)}
                variant="outlined"
                sx={{ borderRadius: '999px', textTransform: 'none' }}
              >
                View All Books
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}

ContenttypeDetailsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>

export const getServerSideProps: GetServerSideProps = async ({ params, req, query }) => {
  const { slug } = params!
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || `${protocol}://${host}`

  try {
    // Fetch content type data
    const contenttypeRes = await fetch(`${apiUrl}/api/contenttypes`)
    let contenttypesData: any = []
    try {
      const raw = await contenttypeRes.json()
      // Normalize into array
      if (Array.isArray(raw)) {
        contenttypesData = raw
      } else if (raw && Array.isArray(raw.data)) {
        contenttypesData = raw.data
      } else {
        console.warn('Unexpected contenttypes payload shape; using empty array', raw)
        contenttypesData = []
      }
    } catch (e) {
      console.error('Failed to parse contenttypes response', e)
      contenttypesData = []
    }
    let contenttypeData = contenttypesData.find((ct: any) => ct.slug === slug)

    // Fallback for books if not in DB
    if (!contenttypeData && slug === 'books') {
      contenttypeData = {
        id: 999, // Dummy ID
        title: 'Books',
        slug: 'books',
        description: 'Explore our comprehensive collection of medical textbooks and reference materials.',
        icon: 'MenuBook', // Using a standard icon name
        displayOrder: 1,
        ishomepage: 0,
        isActive: 1
      }
    }

    if (!contenttypeData) {
      return {
        notFound: true,
      }
    }

    // Fetch data depending on content type (books use dedicated table)
    let contents: any[] = []
    if (slug === 'books') {
      let allBooks: any[] = []
      try {
        const booksRes = await fetch(`${apiUrl}/api/books/active`)
        const rawBooks = await booksRes.json()
        const payloadArray = Array.isArray(rawBooks?.data)
          ? rawBooks.data
          : (Array.isArray(rawBooks) ? rawBooks : [])
        allBooks = payloadArray
      } catch (e) {
        console.error('Books API failed, using static fallback:', e)
        try {
          const { data: staticData } = await import('@/components/home/data/popular-content.data')
          allBooks = staticData.filter((c: any) => c.contenttype === 'books')
        } catch (e2) {
          console.error('Failed loading static fallback books', e2)
          allBooks = []
        }
      }
      contents = allBooks

      // Debug: Log sample book data
      if (contents.length > 0) {
        console.log('Server: Sample book data:', {
          title: contents[0].title,
          subjectcategoryIds: contents[0].subjectcategoryIds,
          category: contents[0].category
        })
      }
    } else {
      const contentsRes = await fetch(`${apiUrl}/api/contents`)
      let allContents: any = []
      try {
        const rawContents = await contentsRes.json()
        if (Array.isArray(rawContents)) allContents = rawContents
        else if (rawContents && Array.isArray(rawContents.data)) allContents = rawContents.data
        else {
          console.warn('Unexpected contents payload shape; using empty array', rawContents)
          allContents = []
        }
      } catch (e) {
        console.error('Failed to parse contents response', e)
        allContents = []
      }
      contents = allContents.filter((content: any) => content.contentTypeId === contenttypeData.id)
    }

    // Fetch subject categories data
    const subjectcategoriesRes = await fetch(`${apiUrl}/api/subjectcategories`)
    const allSubjectcategories = await subjectcategoriesRes.json()

    // Fetch subjects data for displaying on book cards
    const subjectsRes = await fetch(`${apiUrl}/api/admin/subjects`)
    const subjectsData = await subjectsRes.json()
    const allSubjects = subjectsData.success ? subjectsData.data : []

    if (!Array.isArray(allSubjectcategories)) {
      console.error('Failed to fetch subject categories:', allSubjectcategories)
      return {
        props: {
          contenttype: slug,
          contenttypeData,
          contents,
          subjectcategories: [],
          allSubjectcategories: [],
          allSubjects: [],
        },
      }
    }

    // Get unique subject categories for this content type (kept for backward compatibility)
    const uniqueIds = new Set(
      contents
        .map((content: any) => Number(content.subjectcategoryId))
        .filter((id: number) => Number.isFinite(id) && id > 0)
    )
    const contentSubjectcategoryIds = Array.from(uniqueIds)
    const subjectcategories = allSubjectcategories.filter((sc: any) =>
      contentSubjectcategoryIds.includes(sc.id)
    )

    // Pass all subject categories for lookup purposes (to display category names on cards)
    const allSubjectcategoriesForLookup = allSubjectcategories

    // Filter subjects to only show those that have books OR match the requested category
    const uniqueSubjectIds = new Set<number>()

    // Always include the requested category if present
    if (query.category) {
      const requestedCategoryId = parseInt(query.category as string)
      if (!isNaN(requestedCategoryId) && requestedCategoryId > 0) {
        uniqueSubjectIds.add(requestedCategoryId)
      }
    }

    contents.forEach((content: any) => {
      const subjectIds = content.subjectcategoryIds
      // Only process if subjectIds is a valid array with items
      if (Array.isArray(subjectIds) && subjectIds.length > 0) {
        subjectIds.forEach((id: number) => {
          if (typeof id === 'number' && id > 0) {
            uniqueSubjectIds.add(id)
          }
        })
      }
    })
    const filteredSubjects = allSubjects.filter((s: any) => uniqueSubjectIds.has(s.id))

    console.log('Server: Total books:', contents.length)
    console.log('Server: Unique subject IDs found:', Array.from(uniqueSubjectIds))
    console.log('Server: Filtered subjects:', filteredSubjects.length)

    return {
      props: {
        contenttype: slug,
        contenttypeData,
        contents,
        subjectcategories,
        allSubjectcategories: allSubjectcategoriesForLookup,
        allSubjects: filteredSubjects,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      notFound: true,
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
