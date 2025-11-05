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
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Chip from '@mui/material/Chip'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme, styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowForward from '@mui/icons-material/ArrowForward'
import { MainLayout } from '@/components/layout'
import { ContentCardItem } from '@/components/course'
import { Content } from '@/interfaces/content'

interface Props {
  contenttype: string
  contenttypeData: any
  contents: Content[]
  subjectcategories: any[]
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: 40,
  '& .MuiTabs-indicator': {
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
  },
}))

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  minHeight: 40,
  padding: theme.spacing(1, 2),
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

const ContenttypeDetailsPage: NextPageWithLayout<Props> = ({ contenttype, contenttypeData, contents, subjectcategories }) => {
  const theme = useTheme()
  const [activeSubjectcategory, setActiveSubjectcategory] = useState(0)

  const handleSubjectcategoryChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveSubjectcategory(newValue)
  }

  const getFilteredContents = () => {
    if (activeSubjectcategory === 0) {
      return contents // Show all contents in contenttype
    }
    
    const selectedSubjectcategory = subjectcategories[activeSubjectcategory - 1]
    return contents.filter((content: Content) => content.subjectcategoryId === selectedSubjectcategory.id)
  }

  const contenttypeName = contenttypeData?.title || contenttype.charAt(0).toUpperCase() + contenttype.slice(1)
  const filteredContents = getFilteredContents()

  return (
    <>
      <Head>
        <title>{contenttypeName} Contents - Jaypee Digital</title>
        <meta name="description" content={`Browse all ${contenttypeName.toLowerCase()} contents available on Jaypee Digital`} />
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
          {/* Breadcrumbs */}
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
            <Typography color="text.primary">{contenttypeName}</Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Link href="/contenttypes">
                <IconButton sx={{ mr: 2 }}>
                  <ArrowBack />
                </IconButton>
              </Link>
              <Box>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: 32, md: 48 },
                    fontWeight: 700,
                    color: 'text.primary'
                  }}
                >
                  {contenttypeName} Contents
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.secondary',
                    mt: 1
                  }}
                >
                  {contents.length} {contents.length === 1 ? 'Content' : 'Contents'} Available
                </Typography>
              </Box>
            </Box>

            {/* Contenttype Description */}
            <Box
              sx={{
                p: 3,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                {getContenttypeDescription(contenttype)}
              </Typography>
            </Box>
          </Box>

          {/* Subject Categories Slider */}
          {subjectcategories.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <Box
                  id="categories-slider"
                  sx={{
                    display: 'flex',
                    gap: 2,
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    pb: 1,
                    '&::-webkit-scrollbar': {
                      height: 6,
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: theme.palette.grey[200],
                      borderRadius: 3,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 3,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    },
                  }}
                >
                  {/* All Option */}
                  <Box
                    onClick={() => setActiveSubjectcategory(0)}
                    sx={{
                      minWidth: 'fit-content',
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      cursor: 'pointer',
                      backgroundColor: activeSubjectcategory === 0 ? theme.palette.primary.main : 'transparent',
                      color: activeSubjectcategory === 0 ? theme.palette.primary.contrastText : theme.palette.text.primary,
                      border: `1px solid ${activeSubjectcategory === 0 ? theme.palette.primary.main : theme.palette.divider}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: activeSubjectcategory === 0 ? theme.palette.primary.dark : theme.palette.action.hover,
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: activeSubjectcategory === 0 ? 600 : 400 }}>
                        All
                      </Typography>
                      <Chip
                        label={contents.length}
                        size="small"
                        sx={{
                          backgroundColor: activeSubjectcategory === 0 ? 'rgba(255,255,255,0.2)' : theme.palette.primary.main,
                          color: activeSubjectcategory === 0 ? theme.palette.primary.contrastText : theme.palette.primary.contrastText,
                          fontSize: '0.75rem',
                          height: '20px',
                          minWidth: '20px',
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Subject Categories */}
                  {subjectcategories.map((subjectcategory, index) => {
                    const categoryIndex = index + 1;
                    const isActive = activeSubjectcategory === categoryIndex;
                    const contentCount = contents.filter((content: Content) => content.subjectcategoryId === subjectcategory.id).length;
                    
                    return (
                      <Box
                        key={subjectcategory.id}
                        onClick={() => setActiveSubjectcategory(categoryIndex)}
                        sx={{
                          minWidth: 'fit-content',
                          px: 3,
                          py: 1.5,
                          borderRadius: 2,
                          cursor: 'pointer',
                          backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
                          color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
                          border: `1px solid ${isActive ? theme.palette.primary.main : theme.palette.divider}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: isActive ? theme.palette.primary.dark : theme.palette.action.hover,
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[4],
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: isActive ? 600 : 400 }}>
                            {subjectcategory.title}
                          </Typography>
                          <Chip
                            label={contentCount}
                            size="small"
                            sx={{
                              backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                              fontSize: '0.75rem',
                              height: '20px',
                              minWidth: '20px',
                            }}
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                {/* Navigation Arrows */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: -16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={() => {
                      const slider = document.getElementById('categories-slider');
                      if (slider) {
                        slider.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      boxShadow: theme.shadows[2],
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <ArrowBack />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    right: -16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={() => {
                      const slider = document.getElementById('categories-slider');
                      if (slider) {
                        slider.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      boxShadow: theme.shadows[2],
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <ArrowForward />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )}

          {/* Course Count and Category Display */}
          <Box sx={{ mb: 4 }}>
            {/* Active Category Name Display */}
            {activeSubjectcategory > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1
                  }}
                >
                  {subjectcategories[activeSubjectcategory - 1]?.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Browse {subjectcategories[activeSubjectcategory - 1]?.title} content in {contenttypeName}
                </Typography>
              </Box>
            )}

            {/* Content Count */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" color="text.secondary">
                Showing {filteredContents.length} {filteredContents.length === 1 ? 'content' : 'contents'}
                {activeSubjectcategory === 0 && ' in all categories'}
                {activeSubjectcategory > 0 && ` in ${subjectcategories[activeSubjectcategory - 1]?.title}`}
              </Typography>
              
              {activeSubjectcategory > 0 && (
                <Chip
                  label={subjectcategories[activeSubjectcategory - 1]?.title}
                  color="primary"
                  variant="outlined"
                  sx={{
                    fontWeight: 500,
                  }}
                />
              )}
            </Box>
          </Box>

          {/* Contents Grid */}
            {filteredContents.length > 0 ? (
              <Grid container spacing={3}>
                {filteredContents.map((content: Content) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={content.id}>
                    <ContentCardItem item={content} contenttypeSlug={contenttype} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No contents found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {activeSubjectcategory === 0 
                  ? "There are no contents available in this content type."
                  : `There are no contents available in the ${subjectcategories[activeSubjectcategory - 1]?.title} category.`
                }
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setActiveSubjectcategory(0)}
              >
                View All Contents
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </>
  )
}

ContenttypeDetailsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params!
  
  try {
    // Fetch content type data
    const contenttypeRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/contenttypes`)
    const contenttypesData = await contenttypeRes.json()
    const contenttypeData = contenttypesData.find((ct: any) => ct.slug === slug)
    
    if (!contenttypeData) {
      return {
        notFound: true,
      }
    }

    // Fetch contents data
    const contentsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/contents`)
    const allContents = await contentsRes.json()
    
    // Filter contents by content type
    const contents = allContents.filter((content: any) => content.contentTypeId === contenttypeData.id)

    // Fetch subject categories data
    const subjectcategoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/subjectcategories`)
    const allSubjectcategories = await subjectcategoriesRes.json()
    
    // Get unique subject categories for this content type
    const uniqueIds = new Set(contents.map((content: any) => content.subjectcategoryId))
    const contentSubjectcategoryIds = Array.from(uniqueIds)
    const subjectcategories = allSubjectcategories.filter((sc: any) => 
      contentSubjectcategoryIds.includes(sc.id)
    )

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
