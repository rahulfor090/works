import type { GetServerSideProps } from 'next'
import React from 'react'
import { NextPageWithLayout } from '@/interfaces/layout'
import { MainLayout } from '@/components/layout'
import Head from 'next/head'
import NextLink from 'next/link'
import path from 'path'
import fs from 'fs'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  Tabs,
  Tab,
  Button,
  TextField,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import SchoolIcon from '@mui/icons-material/School'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CloseIcon from '@mui/icons-material/Close'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import SearchIcon from '@mui/icons-material/Search'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

type Chapter = { id?: number; number?: number | null; title: string; slug?: string | null; chapterType?: string; videoUrl?: string; keywords?: string | null; pdfUrl?: string | null }
type Section = { title: string; chapters: Chapter[] }
type Book = {
  id?: number
  isbn?: string | null
  print_isbn?: string | null
  title: string
  author?: string | null
  coverImage?: string | null
  description?: string | null
  keywords?: string | null
  subjectcategoryId?: number | null
}

type Props = {
  isbn: string
  book: Book | null
  sections: Section[]
  bookPdfUrl: string | null
  videosCount?: number
  casesCount?: number
  reviewsCount?: number
}

const DEFAULT_BOOK_COVER = '/images/courses/JMEDS_Cover.jpeg'

const BookDetailPage: NextPageWithLayout<Props> = ({ isbn, book, sections, videosCount = 0, casesCount = 0, reviewsCount = 0 }: Props) => {
  const cover = book?.coverImage || DEFAULT_BOOK_COVER
  const title = book?.title || "Book Title"
  const author = book?.author || 'Unknown Author'

  const [tab, setTab] = React.useState(0)
  const [expandAll, setExpandAll] = React.useState(false)
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({})
  const [favorite, setFavorite] = React.useState<boolean>(false)
  const [referDialogOpen, setReferDialogOpen] = React.useState(false)
  const [librarianDialogOpen, setLibrarianDialogOpen] = React.useState(false)
  const [searchDialogOpen, setSearchDialogOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showKeywords, setShowKeywords] = React.useState(true)

  // Form states for Refer to Friend
  const [senderName, setSenderName] = React.useState('')
  const [senderEmail, setSenderEmail] = React.useState('')
  const [recipientName, setRecipientName] = React.useState('')
  const [recipientEmail, setRecipientEmail] = React.useState('')
  const [referSubject, setReferSubject] = React.useState('')
  const [referMessage, setReferMessage] = React.useState('')

  // Form states for Recommend to Librarian
  const [libTitle, setLibTitle] = React.useState('')
  const [libIsbn, setLibIsbn] = React.useState('')
  const [libReason, setLibReason] = React.useState('')
  const [librarianName, setLibrarianName] = React.useState('')
  const [librarianEmail, setLibrarianEmail] = React.useState('')
  const [yourName, setYourName] = React.useState('')
  const [yourEmail, setYourEmail] = React.useState('')
  const [company, setCompany] = React.useState('')
  const [department, setDepartment] = React.useState('')
  const [country, setCountry] = React.useState('')

  // User authentication state
  const [user, setUser] = React.useState<{ email?: string; isPremium?: boolean } | null>(null)
  const [isLocked, setIsLocked] = React.useState(true)

  // Check user authentication and premium status
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const userStr = window.localStorage.getItem('user')
      if (userStr) {
        const userData = JSON.parse(userStr)
        setUser(userData)
        // Only superuser@gmail.com gets full access
        const isSuperUser = userData.email === 'superuser@gmail.com'
        setIsLocked(!isSuperUser)
      } else {
        setIsLocked(true)
      }
    } catch {
      setIsLocked(true)
    }
  }, [])

  const favStorageKey = `book:favourite:${isbn}`

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const v = window.localStorage.getItem(favStorageKey)
      setFavorite(v === 'true')
    } catch { }
  }, [favStorageKey])

  const toggleFavorite = () => {
    setFavorite(prev => {
      const next = !prev
      try { if (typeof window !== 'undefined') window.localStorage.setItem(favStorageKey, String(next)) } catch { }
      return next
    })
  }

  const handleReferFriend = () => {
    setReferDialogOpen(true)
  }

  const handleCloseReferDialog = () => {
    setReferDialogOpen(false)
    // Reset form
    setSenderName('')
    setSenderEmail('')
    setRecipientName('')
    setRecipientEmail('')
    setReferSubject('')
    setReferMessage('')
  }

  const handleSubmitRefer = () => {
    // Form validation can be added here
    // Backend functionality will be added later
    console.log('Refer form submitted:', {
      senderName,
      senderEmail,
      recipientName,
      recipientEmail,
      referSubject,
      referMessage,
    })
    handleCloseReferDialog()
  }

  const handleRecommendLibrarian = () => {
    // Pre-fill book data
    setLibTitle(title)
    setLibIsbn(isbn)
    setLibrarianDialogOpen(true)
  }

  const handleCloseLibrarianDialog = () => {
    setLibrarianDialogOpen(false)
    // Reset form
    setLibTitle('')
    setLibIsbn('')
    setLibReason('')
    setLibrarianName('')
    setLibrarianEmail('')
    setYourName('')
    setYourEmail('')
    setCompany('')
    setDepartment('')
    setCountry('')
  }

  const handleSubmitLibrarian = () => {
    // Form validation can be added here
    // Backend functionality will be added later
    console.log('Librarian recommendation submitted:', {
      libTitle,
      libIsbn,
      libReason,
      librarianName,
      librarianEmail,
      yourName,
      yourEmail,
      company,
      department,
      country,
    })
    handleCloseLibrarianDialog()
  }

  const handleSharePage = async () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }
    } catch { }
    try {
      await navigator.clipboard.writeText(url)
      // Simple user feedback; avoid adding Snackbar for now
      window.alert('Page link copied to clipboard')
    } catch { }
  }

  const toggleExpandCollapse = () => setExpandAll(prev => !prev)
  const toggleSection = (idx: number) => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))

  const filteredSections = sections.filter(s => s.title !== 'Cases' && s.title !== 'Videos')

  // Compute search results
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return []
    const lowerQuery = searchQuery.toLowerCase()
    const results: Array<Chapter & { isKeyword?: boolean }> = []

    // Search in chapters
    sections.forEach(sec => {
      sec.chapters.forEach(ch => {
        if (ch.title.toLowerCase().includes(lowerQuery) || (ch.keywords && ch.keywords.toLowerCase().includes(lowerQuery))) {
          results.push(ch)
        }
      })
    })

    // Search in keywords
    if (book?.keywords) {
      const keywords = book.keywords.split(',').map(k => k.trim()).filter(Boolean)
      keywords.forEach(kw => {
        if (kw.toLowerCase().includes(lowerQuery)) {
          results.push({
            title: kw,
            slug: null,
            isKeyword: true
          })
        }
      })
    }

    return results
  }, [searchQuery, sections, book])

  return (
    <>
      <Head>
        <title>{title} | Book</title>
      </Head>
      
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(180deg, #F0F9FF 0%, #FFF 100%)',
        pt: { xs: 4, md: 8 },
        pb: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="flex-start">
            {/* Left: Cover Image */}
            <Grid item xs={12} md={4} lg={3.5}>
              <Box sx={{ position: 'relative', mx: 'auto', maxWidth: '300px' }}>
                <Box 
                  component="img" 
                  src={cover} 
                  alt={title} 
                  sx={{ 
                    width: '100%', 
                    borderRadius: '1.5rem',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                    transform: 'rotate(-2deg)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'rotate(0deg) scale(1.02)' }
                  }} 
                />
              </Box>
            </Grid>

            {/* Right: Details */}
            <Grid item xs={12} md={8} lg={8.5}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Badges */}
                <Stack direction="row" spacing={1}>
                  <Chip 
                    label="Book" 
                    sx={{ 
                      background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
                      color: 'white',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontSize: '0.75rem',
                      height: '28px',
                      boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)'
                    }} 
                  />
                </Stack>

                {/* Title */}
                <Typography variant="h1" sx={{ 
                  fontFamily: '"Georgia", serif', 
                  fontWeight: 700, 
                  color: '#0A2540',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1
                }}>
                  {title}
                </Typography>

                {/* Author */}
                {author && (
                  <Typography variant="h5" sx={{ color: '#64748B', fontWeight: 500 }}>
                    by {author}
                  </Typography>
                )}

                {/* Stats / Meta */}
                <Stack direction="row" spacing={3} sx={{ my: 2, color: '#64748B' }} divider={<Divider orientation="vertical" flexItem />}>
                  <Box>
                    <Typography variant="caption" display="block" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>ISBN</Typography>
                    <Typography variant="subtitle2" color="#0A2540" fontWeight={600}>{isbn}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" display="block" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Chapters</Typography>
                    <Typography variant="subtitle2" color="#0A2540" fontWeight={600}>{sections.reduce((acc, s) => acc + s.chapters.length, 0)}</Typography>
                  </Box>
                </Stack>

                {/* Description */}
                {book?.description && (
                  <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, maxWidth: '90%', fontSize: '1.1rem' }}>
                    {book.description}
                  </Typography>
                )}

                {/* Book Keywords */}
                {book?.keywords && (
                  <Box sx={{ mt: 3 }}>
                    <Box 
                      onClick={() => setShowKeywords(!showKeywords)}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        cursor: 'pointer',
                        mb: 1,
                        userSelect: 'none',
                        width: 'fit-content'
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: '#0A2540', fontWeight: 600 }}>
                        Keywords
                      </Typography>
                      {showKeywords ? <ExpandLessIcon fontSize="small" sx={{ ml: 0.5, color: '#64748B' }} /> : <ExpandMoreIcon fontSize="small" sx={{ ml: 0.5, color: '#64748B' }} />}
                    </Box>
                    <Collapse in={showKeywords}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {book.keywords.split(',').map((k, i) => (
                          <Chip 
                            key={i} 
                            label={k.trim()} 
                            size="small" 
                            sx={{ 
                              backgroundColor: '#F1F5F9', 
                              color: '#64748B',
                              border: '1px solid #E2E8F0'
                            }} 
                          />
                        ))}
                      </Box>
                    </Collapse>
                  </Box>
                )}

                {/* Actions Toolbar */}
                <Stack direction="row" spacing={2} sx={{ mt: 2 }} alignItems="center">
                  <Tooltip title="Refer to Friend">
                    <IconButton onClick={handleReferFriend} sx={{ color: '#64748B', border: '1px solid #E2E8F0', '&:hover': { color: '#0A2540', borderColor: '#0A2540', background: 'transparent' } }}>
                      <PersonAddAlt1Icon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Recommend to Librarian">
                    <IconButton onClick={handleRecommendLibrarian} sx={{ color: '#64748B', border: '1px solid #E2E8F0', '&:hover': { color: '#0A2540', borderColor: '#0A2540', background: 'transparent' } }}>
                      <SchoolIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share This Page">
                    <IconButton onClick={handleSharePage} sx={{ color: '#64748B', border: '1px solid #E2E8F0', '&:hover': { color: '#0A2540', borderColor: '#0A2540', background: 'transparent' } }}>
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={favorite ? 'Remove from favourites' : 'Add to favourites'}>
                    <IconButton onClick={toggleFavorite} sx={{ color: favorite ? '#EF4444' : '#64748B', border: '1px solid #E2E8F0', '&:hover': { color: '#EF4444', borderColor: '#EF4444', background: 'transparent' } }}>
                      {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Tooltip>
                </Stack>

                {/* Search Bar */}
                <Box sx={{ mt: 3, maxWidth: '600px' }}>
                  <Box
                    onClick={() => setSearchDialogOpen(true)}
                    sx={{
                      cursor: 'pointer',
                      border: '1px solid #E2E8F0',
                      borderRadius: '1rem',
                      px: 3,
                      py: 2,
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s',
                      backgroundColor: 'white',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                      '&:hover': {
                        borderColor: '#3B82F6',
                        boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.1)'
                      }
                    }}
                  >
                    <SearchIcon sx={{ fontSize: 20, color: '#94A3B8', mr: 1.5 }} />
                    <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                      Search within this book...
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mb: 4,
            borderBottom: '1px solid #E2E8F0',
            '& .MuiTab-root': {
              fontWeight: 600,
              color: '#64748B',
              textTransform: 'none',
              fontSize: '1.1rem',
              px: 4,
              py: 2,
              '&.Mui-selected': {
                color: '#0A2540'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#0A2540',
              height: '3px',
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          <Tab label="Table of Contents" />
          <Tab label={`Cases (${casesCount})`} />
          <Tab label={`Videos (${videosCount})`} />
          <Tab label={`Reviews (${reviewsCount})`} />
        </Tabs>

        {tab === 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Button
                variant="text"
                onClick={toggleExpandCollapse}
                sx={{
                  textTransform: 'none',
                  color: '#0A2540',
                  fontWeight: 600,
                  '&:hover': { background: 'transparent', textDecoration: 'underline' }
                }}
              >
                {expandAll ? 'Collapse All' : 'Expand All'}
              </Button>
            </Box>

            {filteredSections.map((sec, sIdx) => (
              <Accordion
                key={sIdx}
                disableGutters
                expanded={expandAll || !!expanded[sIdx]}
                onChange={() => toggleSection(sIdx)}
                sx={{
                  mb: 3,
                  borderRadius: '1rem !important',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
                  border: '1px solid #F1F5F9',
                  '&:before': { display: 'none' },
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon sx={{ color: '#64748B' }} />} 
                  sx={{ 
                    backgroundColor: '#fff',
                    borderBottom: (expandAll || !!expanded[sIdx]) ? '1px solid #F1F5F9' : 'none',
                    px: 3,
                    py: 1
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: '#0A2540', fontSize: '1.1rem' }}>{sec.title}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <List disablePadding>
                    {sec.chapters.map((ch, idx) => {
                      const shouldShowLock = isLocked && (
                        (ch.number != null && ch.number >= 2) ||
                        ch.chapterType === 'appendix'
                      )
                      const shouldShowUnlock = !shouldShowLock

                      return (
                        <ListItem 
                          key={`${sec.title}-${idx}`} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            py: 2,
                            px: 3,
                            borderBottom: '1px solid #F8FAFC',
                            '&:last-child': { borderBottom: 'none' },
                            transition: 'background-color 0.2s',
                            '&:hover': { backgroundColor: '#F8FAFC' }
                          }}
                        >
                          {ch.slug ? (
                            <>
                              <NextLink href={ch.slug} style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ 
                                  width: 32, 
                                  height: 32, 
                                  borderRadius: '50%', 
                                  bgcolor: '#F1F5F9', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  mr: 2,
                                  color: '#64748B',
                                  fontWeight: 600,
                                  fontSize: '0.875rem',
                                  flexShrink: 0
                                }}>
                                  {ch.number || idx + 1}
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                  <Typography sx={{
                                    color: '#334155',
                                    fontWeight: 500,
                                    fontSize: '1.05rem',
                                    transition: 'color 0.2s',
                                    '&:hover': { color: '#0A2540' }
                                  }}>
                                    {ch.title}
                                  </Typography>
                                  {ch.keywords && (
                                    <Box sx={{ mt: 1 }}>
                                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'block', mb: 0.5 }}>
                                        Keywords:
                                      </Typography>
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {ch.keywords.split(',').map((k, i) => (
                                          <Chip 
                                            key={i} 
                                            label={k.trim()} 
                                            size="small" 
                                            sx={{ 
                                              fontSize: '0.7rem', 
                                              height: '20px', 
                                              backgroundColor: '#F1F5F9', 
                                              color: '#64748B' 
                                            }} 
                                          />
                                        ))}
                                      </Box>
                                    </Box>
                                  )}
                                </Box>
                              </NextLink>
                              {shouldShowLock && (
                                <Tooltip title="Premium content - Login required">
                                  <LockIcon sx={{ fontSize: 20, color: '#94A3B8' }} />
                                </Tooltip>
                              )}
                              {shouldShowUnlock && (
                                <Tooltip title="Unlocked content">
                                  <LockOpenIcon sx={{ fontSize: 20, color: '#10B981' }} />
                                </Tooltip>
                              )}
                              {ch.pdfUrl && (
                                <Tooltip title="Download Chapter PDF">
                                  <IconButton
                                    component="a"
                                    href={ch.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    size="small"
                                    sx={{ color: '#EF4444', ml: 1 }}
                                  >
                                    <PictureAsPdfIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </>
                          ) : (
                            <>
                              <Box sx={{ 
                                width: 32, 
                                height: 32, 
                                borderRadius: '50%', 
                                bgcolor: '#F1F5F9', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                mr: 2,
                                color: '#64748B',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                flexShrink: 0
                              }}>
                                {ch.number || idx + 1}
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Typography sx={{ color: '#94A3B8' }}>
                                  {ch.title}
                                </Typography>
                                {ch.keywords && (
                                  <Box sx={{ mt: 1 }}>
                                    <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, display: 'block', mb: 0.5 }}>
                                      Keywords:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                      {ch.keywords.split(',').map((k, i) => (
                                        <Chip 
                                          key={i} 
                                          label={k.trim()} 
                                          size="small" 
                                          sx={{ 
                                            fontSize: '0.7rem', 
                                            height: '20px', 
                                            backgroundColor: '#F1F5F9', 
                                            color: '#94A3B8',
                                            borderColor: '#E2E8F0',
                                            borderStyle: 'solid',
                                            borderWidth: '1px'
                                          }} 
                                        />
                                      ))}
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                              {shouldShowLock && (
                                <Tooltip title="Premium content - Login required">
                                  <LockIcon sx={{ fontSize: 20, color: '#94A3B8' }} />
                                </Tooltip>
                              )}
                              {shouldShowUnlock && (
                                <Tooltip title="Unlocked content">
                                  <LockOpenIcon sx={{ fontSize: 20, color: '#10B981' }} />
                                </Tooltip>
                              )}
                              {ch.pdfUrl && (
                                <Tooltip title="Download Chapter PDF">
                                  <IconButton
                                    component="a"
                                    href={ch.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    size="small"
                                    sx={{ color: '#EF4444', ml: 1 }}
                                  >
                                    <PictureAsPdfIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </>
                          )}
                        </ListItem>
                      )
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {tab === 1 && (
          <Box>
            {casesCount > 0 ? (
              <List disablePadding>
                {sections.find(s => s.title === 'Cases')?.chapters.map((c, idx) => (
                  <ListItem 
                    key={idx} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      py: 2,
                      px: 3,
                      borderBottom: '1px solid #F8FAFC',
                      '&:last-child': { borderBottom: 'none' },
                      transition: 'background-color 0.2s',
                      '&:hover': { backgroundColor: '#F8FAFC' }
                    }}
                  >
                    <NextLink href={c.slug || '#'} style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        bgcolor: '#F0F9FF', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mr: 2,
                        color: '#0A2540',
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>📄</span>
                      </Box>
                      <Typography sx={{
                        color: '#334155',
                        fontWeight: 500,
                        fontSize: '1.05rem',
                        transition: 'color 0.2s',
                        '&:hover': { color: '#0A2540' }
                      }}>
                        {c.title}
                      </Typography>
                    </NextLink>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">No cases available for this title.</Typography>
            )}
          </Box>
        )}

        {tab === 2 && (
          <Box>
            {videosCount > 0 ? (
              <List disablePadding>
                {sections.find(s => s.title === 'Videos')?.chapters.map((video, idx) => (
                  <ListItem 
                    key={idx} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      py: 2,
                      px: 3,
                      borderBottom: '1px solid #F8FAFC',
                      '&:last-child': { borderBottom: 'none' },
                      transition: 'background-color 0.2s',
                      '&:hover': { backgroundColor: '#F8FAFC' }
                    }}
                  >
                    <NextLink href={video.slug || '#'} style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        bgcolor: '#F0F9FF', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mr: 2,
                        color: '#0A2540',
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>▶</span>
                      </Box>
                      <Typography sx={{
                        color: '#334155',
                        fontWeight: 500,
                        fontSize: '1.05rem',
                        transition: 'color 0.2s',
                        '&:hover': { color: '#0A2540' }
                      }}>
                        {video.title}
                      </Typography>
                    </NextLink>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">No videos available for this title.</Typography>
            )}
          </Box>
        )}

        {tab === 3 && (
          <Typography variant="body2" color="text.secondary">Reviews coming soon</Typography>
        )}
      </Container>

      {/* Refer to Friend Dialog */}
      <Dialog
        open={referDialogOpen}
        onClose={handleCloseReferDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #E2E8F0', px: 4, py: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0A2540' }}>Refer to Friend</Typography>
            <IconButton onClick={handleCloseReferDialog} size="small" sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444', backgroundColor: '#FEF2F2' } }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 4 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Sender&apos;s Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Sender&apos;s Email Address <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Recipient&apos;s Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Recipient&apos;s Email Address <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Subject <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={referSubject}
                onChange={(e) => setReferSubject(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Message to Recipient <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={4}
                value={referMessage}
                onChange={(e) => setReferMessage(e.target.value)}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 4, borderTop: '1px solid #E2E8F0', pt: 3 }}>
          <Button
            variant="contained"
            onClick={handleSubmitRefer}
            sx={{
              textTransform: 'none',
              borderRadius: '2rem',
              background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.25)',
              fontWeight: 600,
              px: 4,
              py: 1,
              '&:hover': {
                background: 'linear-gradient(to right, #FF5252, #FF7043)',
                boxShadow: '0 8px 20px rgba(255, 107, 107, 0.4)',
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Recommend to Librarian Dialog */}
      <Dialog
        open={librarianDialogOpen}
        onClose={handleCloseLibrarianDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #E2E8F0', px: 4, py: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0A2540' }}>Recommend To Librarian</Typography>
            <IconButton onClick={handleCloseLibrarianDialog} size="small" sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444', backgroundColor: '#FEF2F2' } }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 4 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Title and ISBN */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Title <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={libTitle}
                onChange={(e) => setLibTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ISBN <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={libIsbn}
                onChange={(e) => setLibIsbn(e.target.value)}
                required
              />
            </Grid>

            {/* Reason */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Your reason to recommend this publication: <span style={{ color: 'red' }}>*</span> (max. 1000 characters)
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={libReason}
                onChange={(e) => setLibReason(e.target.value)}
                inputProps={{ maxLength: 1000 }}
                required
              />
            </Grid>

            {/* Librarian's details */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
                Librarian&apos;s details:
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={librarianName}
                onChange={(e) => setLibrarianName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Email ID <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="email"
                value={librarianEmail}
                onChange={(e) => setLibrarianEmail(e.target.value)}
                required
              />
            </Grid>

            {/* Your personal details */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
                Your personal details:
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Company/Organisation
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                E-mail ID <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="email"
                value={yourEmail}
                onChange={(e) => setYourEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Department
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Country
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 4, borderTop: '1px solid #E2E8F0', pt: 3 }}>
          <Button
            variant="contained"
            onClick={handleSubmitLibrarian}
            sx={{
              textTransform: 'none',
              borderRadius: '2rem',
              background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.25)',
              fontWeight: 600,
              px: 4,
              py: 1,
              '&:hover': {
                background: 'linear-gradient(to right, #FF5252, #FF7043)',
                boxShadow: '0 8px 20px rgba(255, 107, 107, 0.4)',
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Search Dialog */}
      <Dialog
        open={searchDialogOpen}
        onClose={() => {
          setSearchDialogOpen(false)
          setSearchQuery('')
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #E2E8F0', px: 4, py: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#0A2540' }}>Search within {title}</Typography>
            <IconButton onClick={() => {
              setSearchDialogOpen(false)
              setSearchQuery('')
            }} size="small" sx={{ color: '#94A3B8', '&:hover': { color: '#EF4444', backgroundColor: '#FEF2F2' } }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 4 }}>
          <TextField
            fullWidth
            placeholder="Search chapters..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            sx={{
              mb: 2,
              borderRadius: '2rem',
              backgroundColor: '#ffffff',
              '& .MuiOutlinedInput-root': {
                borderRadius: '2rem',
                paddingRight: '8px',
                '& fieldset': { borderColor: '#E2E8F0' },
                '&:hover fieldset': { borderColor: '#0A2540' },
                '&.Mui-focused fieldset': { borderColor: '#0A2540' },
              },
            }}
          />
          {searchQuery.trim() && (
            <Box>
              {searchResults.length > 0 ? (
                <List>
                  {searchResults.map((ch, idx) => {
                    const isKeyword = ch.isKeyword
                    return (
                      <ListItem
                        key={idx}
                        {...(!isKeyword && ch.slug ? { component: NextLink, href: ch.slug } : {})}
                        sx={{
                          cursor: isKeyword ? 'default' : 'pointer',
                          '&:hover': !isKeyword ? { backgroundColor: 'action.hover' } : {},
                          borderRadius: 1,
                          mb: 0.5,
                          display: 'flex',
                          gap: 1
                        }}
                      >
                        <Typography sx={{ flex: 1 }}>
                          {ch.number != null ? `Chapter ${ch.number}: ` : ''}{ch.title}
                        </Typography>
                        {isKeyword && (
                          <Chip label="Keyword" size="small" sx={{ background: '#FF6B6B', color: 'white', borderColor: '#FF6B6B' }} variant="outlined" />
                        )}
                      </ListItem>
                    )
                  })}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No results found for &quot;{searchQuery}&quot;
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { isbn } = ctx.query
  const isbnStr = String(isbn || '')

  try {
    // Build path to {isbn}.json in public folder
    const bookDir = path.join(process.cwd(), 'public', 'books', isbnStr)
    const jsonPath = path.join(bookDir, `${isbnStr}.json`)

    // Check if JSON file exists
    if (!fs.existsSync(jsonPath)) {
      return { props: { isbn: isbnStr, book: null, sections: [], bookPdfUrl: null, videosCount: 0, casesCount: 0, reviewsCount: 0 } }
    }

    // Read and parse JSON file
    const jsonContent = fs.readFileSync(jsonPath, 'utf-8')
    const bookData = JSON.parse(jsonContent)

    // Extract book information from JSON
    const chaptersData = bookData.chapters || []

    // Build book object with correct field names
    const book: Book = {
      isbn: bookData.print_isbn || isbnStr,
      print_isbn: bookData.print_isbn || null,
      title: bookData.book_title || 'Untitled',
      author: bookData.book_author_name || null,
      coverImage: `/books/${isbnStr}/${isbnStr}.png`,
      description: bookData.book_abstract || null,
      keywords: bookData.book_keywords || null,
    }

    // Build chapters from metadata
    const chapters: Chapter[] = []

    // Sort chapters by sequence
    const sortedChapters = [...chaptersData].sort((a, b) => {
      const seqA = parseInt(a['chapter-sequence']) || 0
      const seqB = parseInt(b['chapter-sequence']) || 0
      return seqA - seqB
    })

    // Process each chapter
    sortedChapters.forEach((chapterData) => {
      const chapterNo = chapterData['chapter-number'] || ''
      const chapterTitle = chapterData['chapter-title'] || 'Untitled'
      const chapterFileName = chapterData['chapter-file-name'] || ''
      const chapterSequence = parseInt(chapterData['chapter-sequence']) || 0
      const chapterKeywords = chapterData['chapter-keyword'] || null

      if (!chapterFileName) return // Skip if no filename

      let slug: string | null = null
      let chapterType = 'chapter' // default type
      let filePath: string | null = null

      // Determine the slug, type, and file path based on chapter number
      if (chapterNo === 'Prelims') {
        filePath = path.join(bookDir, 'preliminary', 'prelims.html')
        slug = `/content/book/${isbnStr}/chapter/preliminary`
        chapterType = 'prelims'
      } else if (chapterNo === 'Index') {
        filePath = path.join(bookDir, 'index', `${chapterFileName}.html`)
        slug = `/content/book/${isbnStr}/chapter/index`
        chapterType = 'index'
      } else if (chapterNo.startsWith('Appendix')) {
        filePath = path.join(bookDir, 'chapter', `${chapterFileName}.html`)
        slug = `/content/book/${isbnStr}/chapter/${chapterFileName}`
        chapterType = 'appendix'
      } else if (chapterNo.startsWith('Chapter')) {
        filePath = path.join(bookDir, 'chapter', `${chapterFileName}.html`)
        slug = `/content/book/${isbnStr}/chapter/${chapterFileName}`
        chapterType = 'chapter'
      }

      // Check if the file actually exists, if not, set slug to null
      if (filePath && !fs.existsSync(filePath)) {
        slug = null
      }

      // Check for PDF
      let pdfUrl: string | null = null
      if (filePath) {
        const siblingPdfPath = filePath.replace(/\.html$/, '.pdf')
        const dir = path.dirname(filePath)
        const filename = path.basename(siblingPdfPath)
        const subdirPdfPath = path.join(dir, 'PDF', filename)

        let finalPdfPath: string | null = null
        
        if (fs.existsSync(siblingPdfPath)) {
            finalPdfPath = siblingPdfPath
        } else if (fs.existsSync(subdirPdfPath)) {
            finalPdfPath = subdirPdfPath
        }

        if (finalPdfPath) {
          const relativePath = path.relative(path.join(process.cwd(), 'public'), finalPdfPath)
          pdfUrl = '/' + relativePath.split(path.sep).join('/')
        }
      }

      // Extract chapter number if it's a regular chapter
      let chapterNumber: number | null = null
      if (chapterNo.startsWith('Chapter-')) {
        const numMatch = chapterNo.match(/Chapter-(\d+)/)
        if (numMatch) {
          chapterNumber = parseInt(numMatch[1])
        }
      }

      chapters.push({
        number: chapterNumber,
        title: chapterTitle,
        slug: slug,
        id: chapterSequence, // Add chapter data for filtering
        chapterType: chapterType, // Store the type
        keywords: chapterKeywords,
        pdfUrl: pdfUrl,
      })
    })

    // Group into sections based on chapterType
    const prelims = chapters.filter((ch) => ch.chapterType === 'prelims')
    const index = chapters.filter((ch) => ch.chapterType === 'index')
    const appendices = chapters.filter((ch) => ch.chapterType === 'appendix')
    const mainChapters = chapters.filter((ch) => ch.chapterType === 'chapter' && ch.number != null)

    // Process Cases from JSON
    const casesData = bookData.cases || []
    const cases: Chapter[] = casesData.map((c: Record<string, any>, idx: number) => {
      const caseId = c.case_id || `case${idx + 1}`
      return {
        number: null, // Cases don't have a standard chapter number
        title: c.case_title,
        slug: `/content/book/${isbnStr}/chapter/${caseId}`, // Assuming case file structure
        id: 1000 + idx, // Arbitrary high ID for sorting/filtering
        chapterType: 'case'
      }
    })

    // Process Videos from JSON
    const videosData = bookData.videos || []
    const videos: Chapter[] = videosData.map((v: Record<string, any>, idx: number) => {
      const videoId = v.video_id || `video${idx + 1}`
      return {
        number: null,
        title: v.video_title || `Video ${idx + 1}`,
        slug: `/content/book/${isbnStr}/chapter/video-${videoId}`,
        id: 2000 + idx,
        chapterType: 'video',
        videoUrl: v.video_url
      }
    })

    const sections: Section[] = []
    if (prelims.length) sections.push({ title: 'Prelims', chapters: prelims })
    if (mainChapters.length) sections.push({ title: 'Chapters', chapters: mainChapters })
    if (appendices.length) sections.push({ title: 'Appendices', chapters: appendices })
    if (cases.length) sections.push({ title: 'Cases', chapters: cases })
    if (videos.length) sections.push({ title: 'Videos', chapters: videos }) // Add videos to sections if you want them in main list, or keep separate
    if (index.length) sections.push({ title: 'Index', chapters: index })

    // Detect book PDF (<isbn>.pdf or book.pdf) if present
    let bookPdfUrl: string | null = null
    try {
      const isbnPdfFs = path.join(bookDir, `${isbnStr}.pdf`)
      const bookPdfFs = path.join(bookDir, 'book.pdf')
      if (fs.existsSync(isbnPdfFs)) {
        bookPdfUrl = `/books/${isbnStr}/${isbnStr}.pdf`
      } else if (fs.existsSync(bookPdfFs)) {
        bookPdfUrl = `/books/${isbnStr}/book.pdf`
      }
    } catch { }

    return { props: { isbn: isbnStr, book, sections, bookPdfUrl, videosCount: videos.length, casesCount: cases.length, reviewsCount: 0 } }
  } catch (e) {
    console.error('Error loading book metadata:', e)
    return { props: { isbn: isbnStr, book: null, sections: [], bookPdfUrl: null, videosCount: 0, casesCount: 0, reviewsCount: 0 } }
  }
}

BookDetailPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default BookDetailPage
