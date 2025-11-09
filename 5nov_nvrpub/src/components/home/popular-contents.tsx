import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Slider, { Settings } from 'react-slick'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme, styled, keyframes } from '@mui/material/styles'
import { IconButton, useMediaQuery, Fade, Grow } from '@mui/material'
import IconArrowBack from '@mui/icons-material/ArrowBack'
import IconArrowForward from '@mui/icons-material/ArrowForward'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

import { ContentCardItem } from '@/components/course'

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`

interface SliderArrowArrow {
  onClick?: () => void
  type: 'next' | 'prev'
  className?: string
}

const SliderArrow: FC<SliderArrowArrow> = ({ onClick, type, className }) => {
  return (
    <IconButton
      sx={{
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'common.white',
        border: 'none',
        width: 44,
        height: 44,
        borderRadius: '50%',
        boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}40`,
        '&:hover': {
          transform: 'scale(1.08)',
          boxShadow: (theme) => `0 12px 32px ${theme.palette.primary.main}50`,
          filter: 'brightness(1.05)',
        },
        bottom: { xs: '-70px !important', md: '-35px !important' },
        left: 'unset !important',
        right: type === 'prev' ? '70px !important' : '10px !important',
        zIndex: 10,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      disableRipple
      color="inherit"
      onClick={onClick}
      className={className}
    >
      {type === 'next' ? <IconArrowForward sx={{ fontSize: 22 }} /> : <IconArrowBack sx={{ fontSize: 22 }} />}
    </IconButton>
  )
}

const StyledDots = styled('ul')(({ theme }) => ({
  '&.slick-dots': {
    position: 'absolute',
    left: 0,
    bottom: -35,
    paddingLeft: theme.spacing(1),
    textAlign: 'left',
    '& li': {
      marginRight: theme.spacing(2),
      '& > div': {
        transition: 'all 0.3s ease',
        borderRadius: '8px',
        '&:hover': {
          transform: 'scale(1.2)',
        },
      },
      '&.slick-active > div': {
        backgroundColor: theme.palette.primary.main,
        transform: 'scale(1.1)',
        boxShadow: `0 2px 8px ${theme.palette.primary.main}40`,
      },
    },
  },
}))

const VerticalTabs = styled(Tabs)(({ theme }) => ({
  borderRight: `2px solid ${theme.palette.divider}`,
  minWidth: 140,
  background: 'rgba(248, 249, 250, 0.8)',
  borderRadius: '12px 0 0 12px',
  padding: theme.spacing(1, 0),
  '& .MuiTabs-indicator': {
    left: 0,
    right: 'auto',
    backgroundColor: theme.palette.primary.main,
    width: 4,
    borderRadius: '0 4px 4px 0',
    boxShadow: `0 0 10px ${theme.palette.primary.main}60`,
  },
}))

const VerticalTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  alignItems: 'flex-start',
  textAlign: 'left',
  minHeight: 56,
  padding: theme.spacing(2, 2.5),
  color: theme.palette.text.secondary,
  position: 'relative',
  borderRadius: '8px',
  margin: theme.spacing(0.5, 1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: `${theme.palette.primary.main}15`,
    fontWeight: 700,
    transform: 'translateX(4px)',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: -8,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 4,
      height: '60%',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '0 4px 4px 0',
    },
  },
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}08`,
    transform: 'translateX(2px)',
    color: theme.palette.primary.main,
  },
  '&.clickable': {
    '&:after': {
      content: '""',
      position: 'absolute',
      right: theme.spacing(1.5),
      top: '50%',
      transform: 'translateY(-50%)',
      width: 0,
      height: 0,
      borderLeft: `5px solid ${theme.palette.primary.main}`,
      borderTop: '5px solid transparent',
      borderBottom: '5px solid transparent',
      opacity: 0.6,
      transition: 'all 0.3s ease',
    },
    '&:hover:after': {
      opacity: 1,
      transform: 'translateY(-50%) translateX(2px)',
    },
  },
}))

const HorizontalTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.divider}`,
  minHeight: 48,
  background: 'rgba(248, 249, 250, 0.8)',
  borderRadius: '12px 12px 0 0',
  padding: theme.spacing(0, 2),
  '& .MuiTabs-indicator': {
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    height: 3,
    borderRadius: '3px 3px 0 0',
    boxShadow: `0 -2px 8px ${theme.palette.primary.main}40`,
  },
  '& .MuiTabs-scrollButtons': {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}10`,
    },
  },
}))

const HorizontalTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  minHeight: 48,
  padding: theme.spacing(1.5, 2.5),
  color: theme.palette.text.secondary,
  borderRadius: '8px 8px 0 0',
  margin: theme.spacing(0, 0.5),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 600,
    backgroundColor: `${theme.palette.primary.main}08`,
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: -2,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80%',
      height: 3,
      backgroundColor: theme.palette.primary.main,
      borderRadius: '3px 3px 0 0',
    },
  },
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}05`,
    color: theme.palette.primary.main,
    transform: 'translateY(-1px)',
  },
}))

// Contenttypes with "All"
const HomePopularContent: FC = () => {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'))
  const [activeContenttype, setActiveContenttype] = useState(0)
  const [activeSubjectcategory, setActiveSubjectcategory] = useState(0)
  const [contents, setContents] = useState<any[]>([])
  const [contenttypes, setContenttypes] = useState<any[]>([])
  const [subjectcategories, setSubjectcategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sliderReady, setSliderReady] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all data in parallel (include books to resolve ISBNs for book items)
        const [contenttypesRes, subjectcategoriesRes, contentsRes, booksRes] = await Promise.all([
          fetch('/api/contenttypes'),
          fetch('/api/subjectcategories'),
          fetch('/api/contents'),
          fetch('/api/books')
        ])

        if (contenttypesRes.ok && subjectcategoriesRes.ok && contentsRes.ok) {
          const [contenttypesData, subjectcategoriesData, contentsData] = await Promise.all([
            contenttypesRes.json(),
            subjectcategoriesRes.json(),
            contentsRes.json()
          ])

          // Books data may fail independently; treat as optional
          const booksData = booksRes.ok ? await booksRes.json() : []

          // Transform contenttypes data to match expected format
          const transformedContenttypes = [
            { label: 'All', value: 'all', id: 0 },
            ...contenttypesData
              .filter((ct: any) => ct.ishomepage) // Only show homepage contenttypes
              .map((ct: any) => ({
                label: ct.title,
                value: ct.title.toLowerCase(),
                id: ct.id
              }))
          ]

          setContenttypes(transformedContenttypes)
          setSubjectcategories(subjectcategoriesData)
          
          // Build a quick lookup map of book titles -> canonical ISBN
          const normalizeTitle = (t: string) => String(t || '')
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/[^a-z0-9\s]/g, '')

          const bookTitleToIsbn = new Map<string, string>()
          ;(booksData || []).forEach((b: any) => {
            const key = normalizeTitle(b?.title)
            if (!key) return
            const canonicalIsbn = (b?.print_isbn && String(b.print_isbn).trim()) || (b?.isbn && String(b.isbn).trim())
            if (canonicalIsbn) {
              bookTitleToIsbn.set(key, canonicalIsbn)
            }
          })

          // Transform contents data to include contenttype property and enrich books with ISBN
          let transformedContents = contentsData
            .filter((content: any) => content.ishomepage)
            .map((content: any) => {
              // Find the contenttype for this content
              const contenttype = contenttypesData.find((ct: any) => ct.id === content.contentTypeId)
              const ctSlug = contenttype ? contenttype.title.toLowerCase() : 'unknown'
              const base = {
                ...content,
                contenttype: ctSlug,
                ratingCount: content.ratingCount || 0
              }

              // If this is a book, attempt to enrich with ISBN for correct linking
              if (ctSlug === 'books') {
                const titleKey = normalizeTitle(content.title)
                const isbn = bookTitleToIsbn.get(titleKey)
                // Explicit override: ensure homepage ID 26 links to the known ISBN
                if (content.id === 26) {
                  return { ...base, isbn: '9788184484175' }
                }
                if (isbn) {
                  return { ...base, isbn }
                }
              }

              return base
            })

          // Fallback: if no homepage contents, build book cards from books list
          if (!transformedContents || transformedContents.length === 0) {
            const booksCt = (contenttypesData || []).find((ct: any) => String(ct.title).toLowerCase() === 'books')
            const booksCtId = booksCt?.id ?? 1
            transformedContents = (booksData || []).map((b: any, idx: number) => ({
              id: b.id ?? idx + 1,
              isbn: (b.print_isbn && String(b.print_isbn).trim()) || (b.isbn && String(b.isbn).trim()),
              title: b.title,
              coverImage: b.coverImage || '/images/courses/JMEDS_Cover.jpeg',
              description: b.description || '',
              author: b.author || '',
              detailsHtml: '',
              rating: b.rating || 0,
              displayOrder: idx,
              contentTypeId: booksCtId,
              subjectcategoryId: 0, // ensure it passes "All" filter
              ishomepage: 1,
              ratingCount: b.ratingCount || 0,
              contenttype: 'books',
            }))
          }

          setContents(transformedContents)
          setLoading(false)
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Add a delay to ensure DOM is ready for slider
  useEffect(() => {
    if (!loading && contents.length > 0) {
      const timer = setTimeout(() => {
        // Additional check to ensure DOM elements are available
        if (typeof window !== 'undefined' && document.readyState === 'complete') {
          setSliderReady(true)
        } else {
          // Wait for DOM to be ready
          const checkReady = () => {
            if (document.readyState === 'complete') {
              setSliderReady(true)
            } else {
              setTimeout(checkReady, 50)
            }
          }
          checkReady()
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [loading, contents])

  const handleContenttypeChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveContenttype(newValue)
    setActiveSubjectcategory(0) // Reset subjectcategory
  }

  const handleSubjectcategoryChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveSubjectcategory(newValue)
  }

  const getSubjectcategories = () => {
    const contenttype = contenttypes[activeContenttype]
    if (!contenttype) return [{ label: 'All', value: 'all', id: 0 }]
    
    const contenttypeId = contenttype.id
    
    // Filter subjectcategories by contentTypeId and homepage visibility
    const filteredSubjectcategories = subjectcategories.filter((subcat: any) => {
      if (contenttypeId === 0) return subcat.ishomepage // Show all homepage subjectcategories for "All"
      return subcat.contentTypeId === contenttypeId && subcat.ishomepage
    })

    const transformedSubjectcategories = filteredSubjectcategories.map((subcat: any) => ({
      label: subcat.name,
      value: subcat.slug,
      id: subcat.id
    }))

    return [{ label: 'All', value: 'all', id: 0 }, ...transformedSubjectcategories]
  }

  const getFilteredData = () => {
    const contenttype = contenttypes[activeContenttype]
    const subjectcategoriesList = getSubjectcategories()
    const subjectcategory = subjectcategoriesList[activeSubjectcategory]
    
    if (!contenttype || !subjectcategory) return []

    return contents.filter(item => {
      // Filter by contenttype
      const contenttypeMatch = contenttype.id === 0 || item.contentTypeId === contenttype.id
      
      // Filter by subjectcategory
      const subjectcategoryMatch = subjectcategory.id === 0 || item.subjectcategoryId === subjectcategory.id
      
      return contenttypeMatch && subjectcategoryMatch
    })
  }

  if (loading || !sliderReady) {
    return (
      <Box sx={{ 
        py: 10, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
      }}>
        <Fade in={true}>
          <Box>
            <AutoAwesomeIcon 
              sx={{ 
                fontSize: 48, 
                color: 'primary.main', 
                mb: 2,
                animation: `${float} 2s ease-in-out infinite`,
              }} 
            />
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Loading amazing content...
            </Typography>
          </Box>
        </Fade>
      </Box>
    )
  }

  // Don't render if no data available
  if (!contenttypes || contenttypes.length === 0 || !contents || contents.length === 0) {
    return null
  }

  const filteredData = getFilteredData()

  const sliderConfig: Settings = {
    infinite: filteredData.length > 1,
    autoplay: filteredData.length > 1,
    autoplaySpeed: 3500,
    cssEase: 'ease-in-out',
    pauseOnHover: true,
    speed: 500,
    slidesToShow: matchMobileView ? 1 : Math.min(3, filteredData.length),
    slidesToScroll: 1,
    centerMode: !matchMobileView && filteredData.length > 2,
    centerPadding: matchMobileView ? '0px' : '40px',
    prevArrow: filteredData.length > 1 ? <SliderArrow type="prev" /> : undefined,
    nextArrow: filteredData.length > 1 ? <SliderArrow type="next" /> : undefined,
    dots: filteredData.length > 1,
    appendDots: (dots) => <StyledDots>{dots}</StyledDots>,
    customPaging: () => (
      <Box sx={{ height: 8, width: 28, backgroundColor: 'divider', display: 'inline-block', borderRadius: 6 }} />
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: Math.min(3, filteredData.length) },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: Math.min(2, filteredData.length), centerMode: false, centerPadding: '0px' },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, centerMode: false, centerPadding: '0px' },
      },
    ],
  }

  const subjectcategoriesList = getSubjectcategories()

  return (
    <Box
      id="popular-course"
      sx={{
        pt: {
          xs: 6,
          md: 8,
        },
        pb: 16,
        background: 'rgba(248, 249, 250, 0.5)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'rgba(38, 139, 187, 0.03)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={800}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingUpIcon 
                sx={{ 
                  fontSize: 40, 
                  color: 'primary.main',
                  animation: `${float} 3s ease-in-out infinite`,
                }} 
              />
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: 32, md: 52 },
                  textAlign: { xs: 'center', md: 'left' },
                  color: 'primary.main',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  animation: `${fadeInUp} 1s ease-out`,
                }}
              >
                New Releases
              </Typography>
            </Box>
            <Grow in={true} timeout={1200}>
              <Link href="/contenttypes/books">
                <Button
                  variant="contained"
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    px: 4,
                    py: 2,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                    boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                    alignItems: 'center',
                    gap: 1,
                    '&:hover': {
                      boxShadow: '0 12px 35px rgba(25, 118, 210, 0.4)',
                      transform: 'translateY(-2px)',
                      background: 'linear-gradient(135deg, #1565c0 0%, #8e24aa 100%)',
                    },
                  }}
                >
                  <AutoAwesomeIcon sx={{ fontSize: '1.2rem' }} />
                  View All New Releases
                </Button>
              </Link>
            </Grow>
          </Box>
        </Fade>

        {/* Mobile View All Content Types Button */}
        <Fade in={true} timeout={1000}>
          <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4, textAlign: 'center' }}>
            <Link href="/contenttypes">
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 5,
                  py: 2,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                  boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    boxShadow: '0 12px 35px rgba(25, 118, 210, 0.4)',
                    transform: 'translateY(-2px)',
                    background: 'linear-gradient(135deg, #1565c0 0%, #8e24aa 100%)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 20, mr: 1 }} />
                Explore More By Specialities
              </Button>
            </Link>
          </Box>
        </Fade>

        <Fade in={true} timeout={1400}>
          <Grid container spacing={4}>
            {/* Contenttype Vertical Tabs */}
            <Grid item xs={12} md={2}>
              <Box
                sx={{
                  animation: `${slideInLeft} 1s ease-out`,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <VerticalTabs
                  orientation="vertical"
                  value={activeContenttype}
                  onChange={handleContenttypeChange}
                >
                  {contenttypes.map((contenttype) => (
                    <VerticalTab 
                      key={contenttype.value} 
                      label={contenttype.label}
                    />
                  ))}
                </VerticalTabs>
              </Box>
            </Grid>

            {/* Subjectcategory Horizontal Tabs + Slider */}
            <Grid item xs={12} md={10}>
              <Box
                sx={{
                  animation: `${slideInRight} 1s ease-out`,
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  overflow: 'hidden',
                }}
              >
                <HorizontalTabs
                  value={activeSubjectcategory}
                  onChange={handleSubjectcategoryChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ mb: 0 }}
                >
                  {subjectcategoriesList.map((subcat) => (
                    <HorizontalTab key={subcat.value} label={subcat.label} />
                  ))}
                </HorizontalTabs>

                <Box sx={{ p: 4, pt: 3 }}>
                  <Slider {...sliderConfig} key={`${activeContenttype}-${activeSubjectcategory}`}>
                    {filteredData.map((item, index) => (
                      <Box key={index} sx={{ px: 1.5 }}>
                        <Link href={item.contenttype === 'books' ? `/content/book/${item.isbn || item.id}` : `/contenttypes/${item.contenttype}/${item.id}`}>
                          <Box
                            sx={{
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              '&:hover': {
                                transform: 'translateY(-8px) scale(1.02)',
                                filter: 'drop-shadow(0 10px 16px rgba(0,0,0,0.12))',
                              },
                            }}
                          >
                            <ContentCardItem item={item} />
                          </Box>
                        </Link>
                      </Box>
                    ))}
                  </Slider>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Box>
  )
}

export default HomePopularContent
export { HomePopularContent }
