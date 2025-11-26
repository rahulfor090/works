import type { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '@/interfaces/layout'
import { MainLayout } from '@/components/layout'
import Head from 'next/head'
import NextLink from 'next/link'
import path from 'path'
import fs from 'fs'
import React from 'react'
import {
  Box,
  Container,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Stack,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  LinearProgress,
  Paper,
  Fab,
  Snackbar,
  Tabs,
  Tab,
  Popover,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Drawer,
  Chip,
} from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import ShareIcon from '@mui/icons-material/Share'
import SettingsIcon from '@mui/icons-material/Settings'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ContrastIcon from '@mui/icons-material/Contrast'
import { Menu, MenuItem, ListItemIcon } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LockIcon from '@mui/icons-material/Lock'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import CircleIcon from '@mui/icons-material/Circle'

type Chapter = { number?: number | null; title: string; slug: string }

type Props = {
  isbn: string
  ch: string
  title: string
  html: string
  htmlUrl: string
  pdfUrl: string | null
  chapters: Chapter[]
  book?: Book | null
  videoUrl: string | null
}

type Book = {
  id?: number
  isbn?: string | null
  print_isbn?: string | null
  title: string
  author?: string | null
  coverImage?: string | null
}

const DEFAULT_BOOK_COVER = '/images/courses/JMEDS_Cover.jpeg'

const ChapterViewerPage: NextPageWithLayout<Props> = ({ isbn, ch, title, html, chapters, book, videoUrl }: Props) => {
  const [scale, setScale] = React.useState(1)
  const [bookmarked, setBookmarked] = React.useState<boolean>(false)

  const [imageModalOpen, setImageModalOpen] = React.useState(false)
  const [imageModalSrc, setImageModalSrc] = React.useState<string>('')
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const [readProgress, setReadProgress] = React.useState(0)
  const [citeOpen, setCiteOpen] = React.useState(false)
  const [citationText, setCitationText] = React.useState('')
  const [risHref, setRisHref] = React.useState<string>('')
  const [shareOpen, setShareOpen] = React.useState(false)
  const [shareUrl, setShareUrl] = React.useState('')
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string }>({ open: false, message: '' })
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const paperRef = React.useRef<HTMLDivElement | null>(null)

  // Reader Settings
  const [settingsAnchorEl, setSettingsAnchorEl] = React.useState<null | HTMLElement>(null)
  const [fontSize, setFontSize] = React.useState<number>(1.15)
  const [fontFamily, setFontFamily] = React.useState<'serif' | 'sans'>('serif')
  const [theme, setTheme] = React.useState<'light' | 'sepia' | 'dark'>('light')

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>): void => {
    setSettingsAnchorEl(event.currentTarget)
  }

  const handleSettingsClose = (): void => {
    setSettingsAnchorEl(null)
  }

  const getThemeColors = (): Record<string, string> => {
    switch (theme) {
      case 'dark':
        return {
          bg: '#0f172a',
          text: '#cbd5e1',
          heading: '#f8fafc',
          link: '#38bdf8',
          border: '#334155',
          blockquote: '#94a3b8',
          tableHeader: '#1e293b',
          tableRowHover: '#334155',
          uiBg: 'rgba(15, 23, 42, 0.85)',
          uiText: '#f1f5f9',
          uiBorder: 'rgba(255, 255, 255, 0.08)',
          activeItemBg: 'rgba(56, 189, 248, 0.15)',
          hoverItemBg: 'rgba(255, 255, 255, 0.05)',
          mainGradient: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)',
          shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          glassBorder: '1px solid rgba(255, 255, 255, 0.05)',
          accent: '#38bdf8'
        }
      case 'sepia':
        return {
          bg: '#f8f5e6',
          text: '#5c4b37',
          heading: '#433422',
          link: '#a05a2c',
          border: '#e6dbbf',
          blockquote: '#8c7b6c',
          tableHeader: '#efead4',
          tableRowHover: '#e6dbbf',
          uiBg: 'rgba(253, 251, 247, 0.9)',
          uiText: '#433422',
          uiBorder: 'rgba(92, 75, 55, 0.08)',
          activeItemBg: 'rgba(160, 90, 44, 0.1)',
          hoverItemBg: 'rgba(67, 52, 34, 0.05)',
          mainGradient: 'linear-gradient(135deg, #fdfbf7 0%, #f8f5e6 50%, #f1eace 100%)',
          shadow: '0 25px 50px -12px rgba(67, 52, 34, 0.1)',
          glassBorder: '1px solid rgba(92, 75, 55, 0.05)',
          accent: '#a05a2c'
        }
      default:
        return {
          bg: '#ffffff',
          text: '#64748B', // Slate 500
          heading: '#0A2540', // Dark Blue
          link: '#3B82F6', // Blue
          border: '#CBD5E1', // Darker border for visibility
          blockquote: '#64748B',
          tableHeader: '#F8FAFC',
          tableRowHover: '#F8FAFC',
          uiBg: 'rgba(255, 255, 255, 0.95)',
          uiText: '#0A2540',
          uiBorder: '#CBD5E1', // Darker UI border
          activeItemBg: '#F0F9FF',
          hoverItemBg: '#F8FAFC',
          mainGradient: 'linear-gradient(to bottom right, #F0F9FF, #ffffff, #FFF5F5)',
          shadow: '0 10px 30px -10px rgba(10, 37, 64, 0.08)',
          glassBorder: '1px solid #CBD5E1', // Visible solid border
          accent: '#FF6B6B'
        }
    }
  }

  const themeColors = getThemeColors()

  // Enhanced Image Modal State
  const [imgZoom, setImgZoom] = React.useState(1)
  const [imgPan, setImgPan] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })
  const [imgCaption, setImgCaption] = React.useState('')

  // Mobile Drawer State
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const handleZoomIn = (): void => setImgZoom(prev => Math.min(prev + 0.5, 4))
  const handleZoomOut = (): void => setImgZoom(prev => Math.max(prev - 0.5, 1))
  const handleResetZoom = (): void => {
    setImgZoom(1)
    setImgPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent): void => {
    if (imgZoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - imgPan.x, y: e.clientY - imgPan.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (isDragging && imgZoom > 1) {
      e.preventDefault()
      setImgPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = (): void => setIsDragging(false)


  // User authentication state
  const [, setUser] = React.useState<{ email?: string; isPremium?: boolean } | null>(null)
  const [isLocked, setIsLocked] = React.useState(true)

  // Check user authentication and premium status
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    // Determine if chapter should be locked based on chapter number
    // Unlock: preliminary, index, and chapter 1
    // Lock: chapter 2 and above (unless superuser)
    const isChapterNumeric = /^\d+$/.test(ch)
    const chapterNumber = isChapterNumeric ? Number(ch) : null

    // Prelims and Index are always unlocked
    if (ch === 'preliminary' || ch === 'index') {
      setIsLocked(false)
      return
    }

    // Chapter 1 is always unlocked
    if (chapterNumber === 1) {
      setIsLocked(false)
      return
    }

    // For chapters 2 and above, check user authentication
    if (chapterNumber && chapterNumber >= 2) {
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
    } else {
      setIsLocked(false)
    }
  }, [ch])

  const [topTab, setTopTab] = React.useState<string>('content')
  const counts = React.useMemo(() => {
    if (videoUrl) return { figuresCount: 0, tablesCount: 0 }
    const s = html || ''
    // Match <figure> or <div class="figure">
    const figuresTag = (s.match(/<figure\b/gi)?.length || 0)
    const figuresDiv = (s.match(/<div[^>]*class=["'][^"']*figure[^"']*["']/gi)?.length || 0)
    const figuresTotal = figuresTag + figuresDiv

    const images = (s.match(/<img\b/gi)?.length || 0)

    // Match <table> or <div class="table">
    const tablesTag = (s.match(/<table\b/gi)?.length || 0)
    const tablesDiv = (s.match(/<div[^>]*class=["'][^"']*table[^"']*["']/gi)?.length || 0)
    const tablesTotal = tablesTag + tablesDiv

    return {
      figuresCount: (figuresTotal > 0 ? figuresTotal : images),
      tablesCount: tablesTotal
    }
  }, [html])

  const filteredHtml = React.useMemo(() => {
    if (typeof window === 'undefined') return html

    if (topTab === 'figures') {
      try {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')

        const divFigures = Array.from(doc.querySelectorAll('div.figure'))
        const tagFigures = Array.from(doc.querySelectorAll('figure'))
        const allImages = Array.from(doc.querySelectorAll('img'))

        // Filter images that are not inside a captured figure
        const standaloneImages = allImages.filter(img => {
          return !img.closest('div.figure') && !img.closest('figure')
        })

        const parts = [
          ...divFigures.map(el => el.outerHTML),
          ...tagFigures.map(el => el.outerHTML),
          ...standaloneImages.map(el => el.outerHTML)
        ]

        return parts.length ? parts.join('<br/><br/><hr style="border-color: rgba(0,0,0,0.1);"/><br/><br/>') : '<p>No figures or images found.</p>'
      } catch (e) {
        console.error('Error parsing figures', e)
        return '<p>Error loading figures.</p>'
      }
    }

    if (topTab === 'tables') {
      try {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')

        const divTables = Array.from(doc.querySelectorAll('div.table'))
        const tagTables = Array.from(doc.querySelectorAll('table'))

        // Filter tables that are not inside a captured div.table
        const standaloneTables = tagTables.filter(t => !t.closest('div.table'))

        const parts = [
          ...divTables.map(el => el.outerHTML),
          ...standaloneTables.map(el => el.outerHTML)
        ]

        return parts.length ? parts.join('<br/><br/><hr style="border-color: rgba(0,0,0,0.1);"/><br/><br/>') : '<p>No tables found.</p>'
      } catch (e) {
        console.error('Error parsing tables', e)
        return '<p>Error loading tables.</p>'
      }
    }

    return html
  }, [topTab, html])

  // compute previous/next chapter for top navigation
  const prevNext = React.useMemo(() => {
    // Construct current slug to match what's in chapters array
    let currentSlug = ''
    if (ch === 'preliminary' || ch === 'index') {
      currentSlug = `/content/book/${isbn}/chapter/${ch}`
    } else if (String(ch).toLowerCase().startsWith('video-')) {
      currentSlug = `/content/book/${isbn}/chapter/${ch}`
    } else if (String(ch).toLowerCase().startsWith('case')) {
      currentSlug = `/content/book/${isbn}/chapter/${ch}`
    } else {
      // Numeric chapter
      // The chapters array uses the format from TOC which is usually /content/book/{isbn}/chapter/{num}
      // But we need to be careful about how we match.
      // If ch is "1", we look for .../chapter/1
      currentSlug = `/content/book/${isbn}/chapter/${ch}`
    }

    // Find index
    const idx = chapters.findIndex(c => c.slug === currentSlug)

    if (idx === -1) {
      // Fallback for numeric chapters if exact slug match fails (e.g. ch=01 vs slug=1)
      if (/^\d+$/.test(ch)) {
        const num = Number(ch)
        const idx2 = chapters.findIndex(c => c.number === num)
        if (idx2 !== -1) {
          const prevItem = idx2 > 0 ? chapters[idx2 - 1] : null
          const nextItem = idx2 < chapters.length - 1 ? chapters[idx2 + 1] : null
          return {
            prev: prevItem ? { title: prevItem.title, slug: prevItem.slug } : null,
            next: nextItem ? { title: nextItem.title, slug: nextItem.slug } : null
          }
        }
      }
      return { prev: null, next: null }
    }

    const prevItem = idx > 0 ? chapters[idx - 1] : null
    const nextItem = idx < chapters.length - 1 ? chapters[idx + 1] : null

    return {
      prev: prevItem ? { title: prevItem.title, slug: prevItem.slug } : null,
      next: nextItem ? { title: nextItem.title, slug: nextItem.slug } : null
    }
  }, [chapters, ch, isbn])

  // three-dot options menu state and handlers
  const [optionsAnchorEl, setOptionsAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuOpen = Boolean(optionsAnchorEl)
  const openOptionsMenu = (e: React.MouseEvent<HTMLElement>): void => setOptionsAnchorEl(e.currentTarget)
  const closeOptionsMenu = (): void => setOptionsAnchorEl(null)

  const handleCite = (): void => {
    // Build a simple citation text and RIS content
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const text = `${title}. Chapter in Book ISBN ${isbn}. ${url}`
    setCitationText(text)
    const ris = [
      'TY  - CHAP',
      `TI  - ${title}`,
      `T2  - Book ISBN ${isbn}`,
      url ? `UR  - ${url}` : '',
      'ER  - '
    ].filter(Boolean).join('\n')
    const href = 'data:application/x-research-info-systems;charset=utf-8,' + encodeURIComponent(ris)
    setRisHref(href)
    setCiteOpen(true)
    closeOptionsMenu()
  }
  const handleShare = (): void => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    setShareUrl(url)
    setShareOpen(true)
    closeOptionsMenu()
  }
  const handleBookmarkMenu = (): void => { toggleBookmark(); closeOptionsMenu() }

  const handleFullscreen = (): void => {
    setIsFullscreen(prev => {
      const newFullscreen = !prev
      // Set zoom to 110% when entering fullscreen, 100% when exiting
      setScale(newFullscreen ? 1.1 : 1)
      return newFullscreen
    })
  }

  const storageKeyBookmark = `bookmark:${isbn}:${ch}`


  React.useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const bm = window.localStorage.getItem(storageKeyBookmark)
      setBookmarked(bm === 'true')
    } catch { }
  }, [storageKeyBookmark])

  // reading progress based on scroll within the content area
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = (): void => {
      const max = el.scrollHeight - el.clientHeight
      const pct = max > 0 ? Math.min(100, Math.max(0, (el.scrollTop / max) * 100)) : 0
      setReadProgress(pct)
    }
    el.addEventListener('scroll', onScroll)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [scrollRef, html])

  const toggleBookmark = (): void => {
    const next = !bookmarked
    setBookmarked(next)
    try { window.localStorage.setItem(storageKeyBookmark, String(next)) } catch { }
  }



  // Make images clickable to open large versions from /XML/[isbn]/Chapters/large/
  React.useEffect(() => {
    if (!contentRef.current) return
    const imgs = Array.from(contentRef.current.querySelectorAll('img'))
    const onClick = (e: Event): void => {
      const el = e.currentTarget as HTMLImageElement
      const srcAttr = el.getAttribute('src') || ''
      // Extract filename from src and construct large image path
      const parts = srcAttr.split('?')[0].split('#')[0].split('/')
      const filename = parts[parts.length - 1]
      if (!filename) return
      const largeSrc = `/books/${isbn}/chapter/LargeImage/${filename}`

      // Try to find caption
      let caption = ''
      const figure = el.closest('figure') || el.closest('div.figure')
      if (figure) {
        const capEl = figure.querySelector('figcaption') || figure.querySelector('.caption') || figure.querySelector('.title')
        if (capEl) caption = capEl.textContent || ''
      }

      setImageModalSrc(largeSrc)
      setImgCaption(caption)
      setImgZoom(1)
      setImgPan({ x: 0, y: 0 })
      setImageModalOpen(true)
    }
    imgs.forEach(img => {
      img.style.cursor = 'zoom-in'
      img.addEventListener('click', onClick)
    })
    return () => {
      imgs.forEach(img => img.removeEventListener('click', onClick))
    }
  }, [isbn, filteredHtml])

  return (
    <>
      <Head>
        <title>{title} | Chapter Viewer</title>
        <base href={`/`} />
      </Head>
      <Box sx={{ minHeight: '100vh', background: themeColors.mainGradient, transition: 'background 0.5s ease' }}>

        {/* Mobile TOC Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 320,
              backgroundColor: themeColors.bg,
              color: themeColors.text
            }
          }}
        >
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: themeColors.heading }}>Contents</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <Divider />
          <List sx={{ p: 2 }}>
            {chapters.map((c, idx) => {
              const chNormForActive = String(ch).replace(/^ch/i, '')
              const isActive = c.slug.endsWith(`/chapter/${chNormForActive}`)
              return (
                <ListItemButton
                  key={idx}
                  component={NextLink}
                  href={c.slug}
                  selected={isActive}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    borderRadius: '0.75rem',
                    mb: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: themeColors.activeItemBg,
                      color: themeColors.accent,
                      '& .MuiListItemIcon-root': { color: themeColors.accent }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {isActive ? <CircleIcon sx={{ fontSize: 8 }} /> : <Typography variant="caption" sx={{ color: themeColors.text, opacity: 0.5 }}>{idx + 1}</Typography>}
                  </ListItemIcon>
                  <ListItemText
                    primary={c.title}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: isActive ? 600 : 400 }}
                  />
                  {isActive && <Chip size="small" label="Reading" color="primary" sx={{ height: 20, fontSize: '0.65rem' }} />}
                </ListItemButton>
              )
            })}
          </List>
        </Drawer>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <LinearProgress
            variant="determinate"
            value={readProgress}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              height: 4,
              borderRadius: 2,
              mb: 3,
              backgroundColor: 'transparent',
              backdropFilter: 'blur(4px)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
                borderRadius: 2,
                boxShadow: '0 0 10px rgba(255, 107, 107, 0.3)'
              }
            }}
          />
          {/* Book info header */}
          {book && (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ width: '100%' }}>
                <Grid container sx={{ minHeight: { md: '450px' } }}>
                  <Grid item xs={12} md={6} sx={{ p: { xs: 4, md: 8 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                      <Typography variant="h2" sx={{
                        fontWeight: 300,
                        fontFamily: '"Georgia", serif',
                        color: themeColors.heading,
                        lineHeight: 1.1,
                        fontSize: { xs: '2.5rem', md: '3.5rem' }
                      }}>
                        {book.title}
                      </Typography>

                      {book.author && (
                        <Typography variant="subtitle1" sx={{
                          color: themeColors.text,
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          mb: 2
                        }}>
                          {book.author}
                        </Typography>
                      )}

                      <Typography variant="body1" sx={{ color: themeColors.text, mb: 4, maxWidth: '90%', lineHeight: 1.6 }}>
                        ISBN: {isbn}
                      </Typography>

                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton
                          onClick={() => setDrawerOpen(true)}
                          sx={{
                            display: { xs: 'flex', md: 'none' },
                            border: `1px solid ${themeColors.uiText}`,
                            color: themeColors.uiText
                          }}
                        >
                          <MenuIcon />
                        </IconButton>
                        <Button
                          component={NextLink}
                          href={`/content/book/${isbn}`}
                          sx={{
                            textTransform: 'none',
                            borderRadius: '100px',
                            border: `1px solid ${themeColors.uiText}`,
                            color: themeColors.uiText,
                            fontWeight: 500,
                            px: 4,
                            py: 1.5,
                            transition: 'all 0.2s',
                            '&:hover': {
                              backgroundColor: themeColors.uiText,
                              color: themeColors.bg
                            }
                          }}
                        >
                          Back to TOC
                        </Button>

                        <Tooltip title="Copy ISBN">
                          <IconButton
                            onClick={() => {
                              if (navigator.clipboard) {
                                navigator.clipboard.writeText(isbn).then(() => setSnackbar({ open: true, message: 'ISBN copied' })).catch(() => null)
                              }
                            }}
                            sx={{
                              color: themeColors.text,
                              border: `1px solid ${themeColors.border}`,
                              '&:hover': { borderColor: themeColors.text, color: themeColors.heading }
                            }}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6} sx={{ position: 'relative', minHeight: { xs: '300px', md: 'auto' }, p: 2 }}>
                    <Box
                      component="img"
                      src={book.coverImage || DEFAULT_BOOK_COVER}
                      alt={book.title}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '1.5rem',
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
          {!book && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  border: '2px solid #0A2540',
                  color: '#0A2540'
                }}
              >
                <MenuIcon />
              </IconButton>
              <Button
                component={NextLink}
                href={`/content/book/${isbn}`}
                startIcon={<ArrowBackIcon />}
                sx={{
                  textTransform: 'none',
                  borderRadius: '100px',
                  color: '#0A2540',
                  fontWeight: 600,
                  px: 2.5,
                  py: 0.75,
                  backgroundColor: 'transparent',
                  border: '2px solid #0A2540',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#ffffff',
                    backgroundColor: '#0A2540',
                    borderColor: '#0A2540',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                Back to TOC
              </Button>
            </Box>
          )}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#0A2540', letterSpacing: '-0.02em' }}>{title}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            {!videoUrl && (
              <Tabs
                value={topTab}
                onChange={(_, v) => setTopTab(v)}
                sx={{
                  '& .MuiTab-root': {
                    fontWeight: 600,
                    color: '#64748B',
                    textTransform: 'none',
                    '&.Mui-selected': { color: '#0A2540' }
                  },
                  '& .MuiTabs-indicator': { backgroundColor: '#0A2540' }
                }}
              >
                <Tab label="Content" value="content" />
                {counts.figuresCount > 0 && (
                  <Tab label={`Figures (${counts.figuresCount})`} value="figures" />
                )}
                {counts.tablesCount > 0 && (
                  <Tab label={`Tables (${counts.tablesCount})`} value="tables" />
                )}
              </Tabs>
            )}
          </Box>

          <Grid container spacing={4}>
            {!isFullscreen && (
              <Grid item xs={12} md={3}>
                <Box sx={{ position: 'sticky', top: 80, height: 'calc(100vh - 100px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: '2rem',
                      background: themeColors.uiBg,
                      backdropFilter: 'blur(24px)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: themeColors.shadow,
                      border: themeColors.glassBorder,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 30px 60px -10px ${theme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.15)'}`
                      }
                    }}
                  >
                    <Box sx={{ p: 3, pb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: themeColors.uiText, letterSpacing: '-0.01em', fontSize: '1.1rem' }}>Table of Contents</Typography>
                      <Divider sx={{ mt: 2, borderColor: themeColors.uiBorder }} />
                    </Box>
                    <List sx={{
                      overflow: 'auto',
                      flex: 1,
                      px: 2,
                      pb: 2,
                      '&::-webkit-scrollbar': { width: '4px' },
                      '&::-webkit-scrollbar-track': { background: 'transparent' },
                      '&::-webkit-scrollbar-thumb': {
                        background: themeColors.uiBorder,
                        borderRadius: '4px',
                        '&:hover': { background: themeColors.link }
                      }
                    }}>
                      {chapters.map((c, idx) => {
                        const chNormForActive = String(ch).replace(/^ch/i, '')
                        const isActive = c.slug.endsWith(`/chapter/${chNormForActive}`)
                        return (
                          <ListItemButton
                            key={idx}
                            component={NextLink}
                            href={c.slug}
                            selected={isActive}
                            sx={{
                              borderRadius: '1rem',
                              mb: 0.5,
                              py: 1.5,
                              px: 2,
                              transition: 'all 0.2s ease',
                              border: '1px solid transparent',
                              color: themeColors.uiText,
                              position: 'relative',
                              overflow: 'hidden',
                              '&.Mui-selected': {
                                backgroundColor: themeColors.activeItemBg,
                                color: themeColors.link,
                                '&:hover': { backgroundColor: themeColors.activeItemBg },
                                '& .MuiListItemText-primary': { fontWeight: 700 },
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  left: 0,
                                  top: '10%',
                                  bottom: '10%',
                                  width: '4px',
                                  backgroundColor: themeColors.link,
                                  borderRadius: '0 4px 4px 0'
                                }
                              },
                              '&:hover': {
                                backgroundColor: themeColors.hoverItemBg,
                                transform: 'translateX(4px)'
                              }
                            }}
                          >
                            <ListItemText
                              primary={c.title}
                              primaryTypographyProps={{
                                variant: 'body2',
                                sx: { fontWeight: isActive ? 700 : 500, lineHeight: 1.5 }
                              }}
                            />
                          </ListItemButton>
                        )
                      })}
                    </List>
                  </Paper>
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={isFullscreen ? 12 : 9}>
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 3,
                  p: 1.5,
                  pl: 3,
                  pr: 2,
                  borderRadius: '100px',
                  background: themeColors.uiBg,
                  backdropFilter: 'blur(24px)',
                  boxShadow: themeColors.shadow,
                  border: themeColors.glassBorder,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 20px 40px -5px ${theme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.15)'}`
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {prevNext.prev && (
                    <Button
                      component={NextLink}
                      href={prevNext.prev.slug}
                      startIcon={<span style={{ fontSize: '1.2rem', lineHeight: 1 }}>‹</span>}
                      sx={{
                        textTransform: 'none',
                        color: themeColors.uiText,
                        fontWeight: 600,
                        borderRadius: '100px',
                        px: 2,
                        '&:hover': { backgroundColor: themeColors.hoverItemBg, color: themeColors.link }
                      }}
                    >
                      {prevNext.prev.title}
                    </Button>
                  )}
                  {prevNext.prev && prevNext.next && (
                    <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 20, alignSelf: 'center', borderColor: themeColors.uiBorder }} />
                  )}
                  {prevNext.next && (
                    <Button
                      component={NextLink}
                      href={prevNext.next.slug}
                      endIcon={<span style={{ fontSize: '1.2rem', lineHeight: 1 }}>›</span>}
                      sx={{
                        textTransform: 'none',
                        color: themeColors.uiText,
                        fontWeight: 600,
                        borderRadius: '100px',
                        px: 2,
                        '&:hover': { backgroundColor: themeColors.hoverItemBg, color: themeColors.link }
                      }}
                    >
                      {prevNext.next.title}
                    </Button>
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip title="Reader Settings">
                    <IconButton onClick={handleSettingsClick} size="small" sx={{
                      color: themeColors.uiText,
                      transition: 'all 0.2s',
                      '&:hover': { color: themeColors.link, backgroundColor: themeColors.hoverItemBg, transform: 'rotate(45deg)' }
                    }}>
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                  <Popover
                    open={Boolean(settingsAnchorEl)}
                    anchorEl={settingsAnchorEl}
                    onClose={handleSettingsClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={{
                      sx: {
                        p: 3,
                        width: 320,
                        borderRadius: '1.5rem',
                        boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: theme === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)'
                      }
                    }}
                  >
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700, color: theme === 'dark' ? '#94a3b8' : '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Font Size</Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <TextFieldsIcon sx={{ fontSize: 16, color: theme === 'dark' ? '#64748b' : '#94A3B8' }} />
                        <Slider
                          value={fontSize}
                          min={0.8}
                          max={1.8}
                          step={0.05}
                          onChange={(_, v) => setFontSize(v as number)}
                          sx={{
                            color: theme === 'dark' ? '#38bdf8' : '#0A2540',
                            '& .MuiSlider-thumb': {
                              width: 16,
                              height: 16,
                              backgroundColor: '#fff',
                              border: '2px solid currentColor',
                              '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0 0 0 4px ${theme === 'dark' ? 'rgba(56, 189, 248, 0.16)' : 'rgba(10, 37, 64, 0.16)'}`,
                              },
                            },
                          }}
                        />
                        <TextFieldsIcon sx={{ fontSize: 24, color: theme === 'dark' ? '#e2e8f0' : '#0A2540' }} />
                      </Stack>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700, color: theme === 'dark' ? '#94a3b8' : '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Font Family</Typography>
                      <ToggleButtonGroup
                        value={fontFamily}
                        exclusive
                        onChange={(_, v) => v && setFontFamily(v)}
                        fullWidth
                        size="small"
                        sx={{
                          gap: 1,
                          '& .MuiToggleButton-root': {
                            borderRadius: '0.75rem !important',
                            textTransform: 'none',
                            fontWeight: 600,
                            border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                            '&.Mui-selected': {
                              backgroundColor: theme === 'dark' ? 'rgba(56, 189, 248, 0.15)' : '#EFF6FF',
                              color: theme === 'dark' ? '#38bdf8' : '#3B82F6',
                              borderColor: theme === 'dark' ? '#38bdf8' : '#BFDBFE',
                              '&:hover': { backgroundColor: theme === 'dark' ? 'rgba(56, 189, 248, 0.25)' : '#DBEAFE' }
                            }
                          }
                        }}
                      >
                        <ToggleButton value="serif" sx={{ fontFamily: '"Georgia", serif', color: theme === 'dark' ? '#e2e8f0' : '#334155' }}>Serif</ToggleButton>
                        <ToggleButton value="sans" sx={{ fontFamily: '"Inter", sans-serif', color: theme === 'dark' ? '#e2e8f0' : '#334155' }}>Sans</ToggleButton>
                      </ToggleButtonGroup>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700, color: theme === 'dark' ? '#94a3b8' : '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Theme</Typography>
                      <ToggleButtonGroup
                        value={theme}
                        exclusive
                        onChange={(_, v) => v && setTheme(v)}
                        fullWidth
                        size="small"
                        sx={{
                          gap: 1,
                          '& .MuiToggleButton-root': {
                            borderRadius: '0.75rem !important',
                            textTransform: 'none',
                            fontWeight: 600,
                            border: '1px solid transparent',
                            '&.Mui-selected': {
                              borderColor: 'currentColor',
                              borderWidth: 2,
                              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }
                          }
                        }}
                      >
                        <ToggleButton value="light" sx={{ backgroundColor: '#ffffff', color: '#334155', '&:hover': { backgroundColor: '#f8fafc' }, '&.Mui-selected': { backgroundColor: '#ffffff', color: '#0A2540' } }}>
                          <LightModeIcon sx={{ mr: 1, fontSize: 18 }} /> Light
                        </ToggleButton>
                        <ToggleButton value="sepia" sx={{ backgroundColor: '#f4ecd8', color: '#5b4636', '&:hover': { backgroundColor: '#e9dfc6' }, '&.Mui-selected': { backgroundColor: '#f4ecd8', color: '#433422' } }}>
                          <ContrastIcon sx={{ mr: 1, fontSize: 18 }} /> Sepia
                        </ToggleButton>
                        <ToggleButton value="dark" sx={{ backgroundColor: '#1e293b', color: '#e2e8f0', '&:hover': { backgroundColor: '#334155' }, '&.Mui-selected': { backgroundColor: '#1e293b', color: '#f8fafc' } }}>
                          <DarkModeIcon sx={{ mr: 1, fontSize: 18 }} /> Dark
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                  </Popover>

                  <Tooltip title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
                    <IconButton onClick={handleFullscreen} size="small" sx={{ color: themeColors.uiText, '&:hover': { color: themeColors.link, backgroundColor: themeColors.hoverItemBg } }}>
                      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'Download Book PDF'}>
                    <IconButton
                      component="a"
                      href={`/books/${isbn}/${isbn}.pdf`}
                      download={`${isbn}.pdf`}
                      aria-label="Download Book PDF"
                      size="small"
                      sx={{ color: themeColors.uiText, '&:hover': { color: '#EF4444', backgroundColor: '#FEF2F2' } }}
                    >
                      <PictureAsPdfIcon />
                    </IconButton>
                  </Tooltip>
                  <IconButton aria-label="more options" onClick={openOptionsMenu} size="small" sx={{ color: themeColors.uiText, '&:hover': { color: themeColors.link, backgroundColor: themeColors.hoverItemBg } }}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Menu
                  anchorEl={optionsAnchorEl}
                  open={menuOpen}
                  onClose={closeOptionsMenu}
                  keepMounted
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      borderRadius: '1rem',
                      boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: theme === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      mt: 1,
                      minWidth: 200
                    }
                  }}
                >
                  <MenuItem onClick={handleCite} sx={{ borderRadius: 1, mx: 1, my: 0.5, color: themeColors.uiText, '&:hover': { backgroundColor: themeColors.hoverItemBg } }}>
                    <ListItemIcon><FormatQuoteIcon fontSize="small" sx={{ color: themeColors.uiText }} /></ListItemIcon>
                    <ListItemText>Cite</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleShare} sx={{ borderRadius: 1, mx: 1, my: 0.5, color: themeColors.uiText, '&:hover': { backgroundColor: themeColors.hoverItemBg } }}>
                    <ListItemIcon><ShareIcon fontSize="small" sx={{ color: themeColors.uiText }} /></ListItemIcon>
                    <ListItemText>Share</ListItemText>
                  </MenuItem>
                  <Divider sx={{ my: 1, borderColor: themeColors.uiBorder }} />
                  <MenuItem onClick={handleBookmarkMenu} sx={{ borderRadius: 1, mx: 1, my: 0.5, color: themeColors.uiText, '&:hover': { backgroundColor: themeColors.hoverItemBg } }}>
                    <ListItemIcon>{bookmarked ? <BookmarkIcon fontSize="small" color="primary" /> : <BookmarkBorderIcon fontSize="small" sx={{ color: themeColors.uiText }} />}</ListItemIcon>
                    <ListItemText>{bookmarked ? 'Remove bookmark' : 'Bookmark'}</ListItemText>
                  </MenuItem>

                </Menu>
              </Paper>



              <Paper ref={paperRef} elevation={0} sx={{
                borderRadius: '2rem',
                overflow: 'hidden',
                height: isFullscreen ? 'calc(100vh - 150px)' : '80vh',
                position: 'relative',
                boxShadow: isFullscreen ? 'none' : themeColors.shadow,
                backgroundColor: isFullscreen ? themeColors.bg : themeColors.uiBg,
                backdropFilter: 'blur(24px)',
                border: isFullscreen ? 'none' : themeColors.glassBorder,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                {videoUrl ? (
                  <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#000' }}>
                    <iframe
                      src={videoUrl}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: 'none' }}
                    />
                  </Box>
                ) : (
                  <>
                    {isLocked && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(12px)',
                          zIndex: 1000,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 3,
                        }}
                      >
                        <Box sx={{
                          p: 4,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                          boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)'
                        }}>
                          <LockIcon sx={{ fontSize: 48, color: 'white' }} />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: themeColors.heading, textAlign: 'center' }}>
                          Premium Content
                        </Typography>
                        <Typography variant="body1" sx={{ color: themeColors.text, textAlign: 'center', maxWidth: 400, lineHeight: 1.6 }}>
                          This chapter is locked. Please log in with a premium account to access the full content.
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            component={NextLink}
                            href="/login"
                            sx={{
                              textTransform: 'none',
                              px: 4,
                              py: 1.5,
                              borderRadius: '100px',
                              fontWeight: 700,
                              background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
                              boxShadow: '0 10px 20px rgba(255, 107, 107, 0.2)'
                            }}
                          >
                            Log In
                          </Button>
                          <Button
                            variant="outlined"
                            component={NextLink}
                            href="/signup"
                            sx={{
                              textTransform: 'none',
                              px: 4,
                              py: 1.5,
                              borderRadius: '100px',
                              fontWeight: 700,
                              borderColor: '#0A2540',
                              color: '#0A2540',
                              '&:hover': { borderColor: '#0A2540', backgroundColor: 'rgba(10, 37, 64, 0.05)' }
                            }}
                          >
                            Sign Up
                          </Button>
                        </Stack>
                      </Box>
                    )}
                    <Box ref={scrollRef} sx={{
                      overflow: 'auto',
                      height: isFullscreen ? 'calc(100vh - 150px)' : '80vh',
                      filter: isLocked ? 'blur(8px)' : 'none',
                      pointerEvents: isLocked ? 'none' : 'auto',
                      scrollBehavior: 'smooth',
                      '&::-webkit-scrollbar': { width: '10px', height: '10px' },
                      '&::-webkit-scrollbar-track': { background: 'transparent' },
                      '&::-webkit-scrollbar-thumb': {
                        background: themeColors.uiBorder,
                        borderRadius: '5px',
                        border: '3px solid transparent',
                        backgroundClip: 'content-box',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: themeColors.link,
                        border: '3px solid transparent',
                        backgroundClip: 'content-box',
                      }
                    }}>
                      <Box sx={{ transform: `scale(${scale})`, transformOrigin: 'top center', width: `${100 / scale}%`, height: `${100 / scale}%` }}>
                        <Box sx={{
                          px: { xs: 2, md: 4 },
                          py: isFullscreen ? { xs: 4, md: 8 } : { xs: 4, md: 8 },
                          display: 'flex',
                          justifyContent: 'center',
                          '& .chapter-html': {
                            fontFamily: fontFamily === 'serif' ? '"Georgia", "Times New Roman", serif' : '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            color: themeColors.text,
                            maxWidth: '800px', // Optimal reading width
                            margin: '0 auto'
                          },
                          '& .chapter-html p': {
                            fontSize: `${fontSize}rem`,
                            lineHeight: 1.9, // Improved line height
                            marginBottom: '1.8em',
                            color: themeColors.text,
                            textAlign: 'justify',
                            letterSpacing: '-0.01em'
                          },
                          '& .chapter-html h1': {
                            fontSize: `${fontSize * 2.5}rem`,
                            fontWeight: 800,
                            color: themeColors.heading,
                            marginTop: '2em',
                            marginBottom: '1em',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            textAlign: 'center'
                          },
                          '& .chapter-html h2': {
                            fontSize: `${fontSize * 1.75}rem`,
                            fontWeight: 700,
                            color: themeColors.heading,
                            marginTop: '2.5em',
                            marginBottom: '1em',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.3,
                            position: 'relative',
                            paddingLeft: '1rem',
                            borderLeft: `4px solid ${themeColors.accent}`
                          },
                          '& .chapter-html h3': {
                            fontSize: `${fontSize * 1.4}rem`,
                            fontWeight: 600,
                            color: themeColors.heading,
                            marginTop: '2em',
                            marginBottom: '0.75em',
                            lineHeight: 1.3
                          },
                          '& .chapter-html h4': {
                            fontSize: `${fontSize * 1.15}rem`,
                            fontWeight: 600,
                            color: themeColors.heading,
                            marginTop: '1.5em',
                            marginBottom: '0.5em'
                          },
                          '& .chapter-html img': {
                            display: 'block',
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '1rem',
                            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
                            margin: '3em auto',
                            transition: 'transform 0.3s ease',
                            cursor: 'zoom-in',
                            '&:hover': { transform: 'scale(1.01)' }
                          },
                          '& .chapter-html figure': {
                            margin: '3em 0',
                            textAlign: 'center'
                          },
                          '& .chapter-html figcaption': {
                            marginTop: '1em',
                            fontSize: '0.9rem',
                            color: themeColors.text,
                            opacity: 0.8,
                            fontStyle: 'italic',
                            backgroundColor: themeColors.hoverItemBg,
                            padding: '0.75rem 1.5rem',
                            borderRadius: '100px',
                            display: 'inline-block'
                          },
                          '& .chapter-html a': {
                            color: themeColors.link,
                            textDecoration: 'none',
                            borderBottom: `1px solid ${themeColors.link}40`,
                            transition: 'all 0.2s',
                            '&:hover': {
                              borderBottomColor: themeColors.link,
                              backgroundColor: `${themeColors.link}10`
                            }
                          },
                          '& .chapter-html ul, & .chapter-html ol': {
                            marginBottom: '1.5em',
                            paddingLeft: '2em',
                            color: themeColors.text
                          },
                          '& .chapter-html li': {
                            marginBottom: '0.75em',
                            fontSize: `${fontSize}rem`,
                            lineHeight: 1.7
                          },
                          '& .chapter-html blockquote': {
                            borderLeft: `4px solid ${themeColors.accent}`,
                            padding: '1.5em 2em',
                            margin: '2em 0',
                            fontStyle: 'italic',
                            color: themeColors.blockquote,
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            borderRadius: '0 1rem 1rem 0'
                          },
                          '& .chapter-html table': {
                            width: '100%',
                            display: 'block',
                            overflowX: 'auto',
                            borderCollapse: 'collapse',
                            borderSpacing: 0,
                            margin: '3em 0',
                            fontSize: `${fontSize * 0.9}rem`,
                            border: `1px solid ${themeColors.border}`,
                            borderRadius: '8px',
                            boxShadow: 'none'
                          },
                          '& .chapter-html thead': {
                            backgroundColor: themeColors.tableHeader,
                            borderBottom: `2px solid ${themeColors.border}`
                          },
                          '& .chapter-html th': {
                            color: themeColors.heading,
                            fontWeight: 700,
                            textAlign: 'left',
                            padding: '1rem',
                            borderBottom: `2px solid ${themeColors.border}`,
                            borderRight: `1px solid ${themeColors.border}`,
                            backgroundColor: themeColors.tableHeader,
                            whiteSpace: 'nowrap'
                          },
                          '& .chapter-html th:last-child': {
                            borderRight: 'none'
                          },
                          '& .chapter-html tbody tr:nth-of-type(even)': {
                            backgroundColor: themeColors.hoverItemBg
                          },
                          '& .chapter-html td': {
                            padding: '1rem',
                            borderBottom: `1px solid ${themeColors.border}`,
                            borderRight: `1px solid ${themeColors.border}`,
                            color: themeColors.text,
                            verticalAlign: 'top',
                            lineHeight: 1.6,
                            minWidth: '120px'
                          },
                          '& .chapter-html td:last-child': {
                            borderRight: 'none'
                          },
                          '& .chapter-html tr:last-of-type td': {
                            borderBottom: 'none'
                          },
                          '& .chapter-html tr:hover td': {
                            backgroundColor: themeColors.activeItemBg,
                            transition: 'background-color 0.2s'
                          }
                        }}>
                          <Box sx={{
                            width: '100%',
                            maxWidth: '1200px',
                            backgroundColor: themeColors.bg,
                            padding: { xs: '30px', md: '60px' },
                            boxShadow: themeColors.shadow,
                            borderRadius: '8px',
                            transition: 'background-color 0.3s ease, color 0.3s ease',
                            margin: '0 auto'
                          }}>
                            <div
                              ref={contentRef}
                              className="chapter-html"
                              dangerouslySetInnerHTML={{ __html: filteredHtml }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
              </Paper>

              <Fab
                size="medium"
                onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                sx={{
                  position: 'fixed',
                  bottom: 32,
                  right: 32,
                  background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
                  color: 'white',
                  boxShadow: '0 10px 25px rgba(255, 107, 107, 0.4)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: '0 15px 35px rgba(255, 107, 107, 0.5)',
                  }
                }}
              >
                <ArrowUpwardIcon />
              </Fab>

              <Dialog
                open={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
                maxWidth={false}
                fullScreen
                PaperProps={{
                  sx: {
                    backgroundColor: 'rgba(0,0,0,0.95)',
                    backdropFilter: 'blur(10px)'
                  }
                }}
              >
                <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  {/* Modal Header */}
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                    <Typography variant="subtitle1" sx={{ color: 'white', opacity: 0.8 }}>
                      {imgCaption ? (imgCaption.length > 60 ? imgCaption.substring(0, 60) + '...' : imgCaption) : 'Figure Viewer'}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton onClick={handleZoomOut} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}><ZoomOutIcon /></IconButton>
                      <IconButton onClick={handleResetZoom} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}><RestartAltIcon /></IconButton>
                      <IconButton onClick={handleZoomIn} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}><ZoomInIcon /></IconButton>
                      <IconButton onClick={() => setImageModalOpen(false)} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>
                        <CloseIcon />
                      </IconButton>
                    </Stack>
                  </Box>

                  {/* Main Image Area */}
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      cursor: imgZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    <img
                      src={imageModalSrc}
                      alt="Chapter figure"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        transform: `scale(${imgZoom}) translate(${imgPan.x / imgZoom}px, ${imgPan.y / imgZoom}px)`,
                        transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                      }}
                      draggable={false}
                    />
                  </Box>

                  {/* Caption Panel */}
                  {imgCaption && (
                    <Box sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <Container maxWidth="md">
                        <Typography variant="body1" sx={{ color: 'white', textAlign: 'center', lineHeight: 1.6 }}>
                          {imgCaption}
                        </Typography>
                      </Container>
                    </Box>
                  )}
                </Box>
              </Dialog>

              <Dialog
                open={citeOpen}
                onClose={() => setCiteOpen(false)}
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
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0A2540' }}>Cite This Chapter</Typography>
                </DialogTitle>
                <DialogContent sx={{ px: 4, py: 4 }}>
                  <Paper variant="outlined" sx={{ p: 3, backgroundColor: '#F8FAFC', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
                    <Typography variant="body1" sx={{ fontFamily: 'Georgia, serif', color: '#334155', lineHeight: 1.6 }}>{citationText}</Typography>
                  </Paper>
                </DialogContent>
                <DialogActions sx={{ px: 4, pb: 4, borderTop: '1px solid #E2E8F0', pt: 3 }}>
                  <Button
                    variant="contained"
                    component="a"
                    href={risHref}
                    download={`citation-${isbn}.ris`}
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
                    Download RIS
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={shareOpen}
                onClose={() => setShareOpen(false)}
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
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0A2540' }}>Share This Chapter</Typography>
                </DialogTitle>
                <DialogContent sx={{ px: 4, py: 4 }}>
                  <Typography variant="body1" sx={{ mb: 2, color: '#475569' }}>
                    Click <strong>Copy Link</strong> button to copy the content permanent URL.
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, mb: 3, backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', borderRadius: '0.75rem' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ color: '#0369A1' }}>
                      This link can be shared with users that are connected to the institution’s/school’s network and they will automatically have access to the content.
                    </Typography>
                  </Paper>

                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#0A2540' }}>Share on social media</Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <IconButton
                      component="a"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                      sx={{ color: '#1877F2', backgroundColor: '#E7F5FF', '&:hover': { backgroundColor: '#D0EBFF' } }}
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on X"
                      sx={{ color: '#000000', backgroundColor: '#F1F5F9', '&:hover': { backgroundColor: '#E2E8F0' } }}
                    >
                      <TwitterIcon />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                      sx={{ color: '#0A66C2', backgroundColor: '#E8F4F9', '&:hover': { backgroundColor: '#D0E8F2' } }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Box>
                </DialogContent>
                <DialogActions sx={{ px: 4, pb: 4, borderTop: '1px solid #E2E8F0', pt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (navigator.clipboard && shareUrl) {
                        navigator.clipboard.writeText(shareUrl).then(() => setSnackbar({ open: true, message: 'Link copied' })).catch(() => null)
                      }
                    }}
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
                    Copy Link
                  </Button>
                </DialogActions>
              </Dialog>
              <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ open: false, message: '' })} message={snackbar.message} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { isbn, ch } = ctx.query
  const isbnStr = String(isbn || '')
  const chStr = String(ch || '')
  const proto = ctx.req.headers['x-forwarded-proto'] || 'http'
  const host = ctx.req.headers.host || 'localhost:3000'
  const base = `${proto}://${host}`

  let videoUrl: string | null = null
  let title = `Chapter ${chStr}`

  // Resolve HTML URL for chapter/preliminary/index and verify existence
  let htmlPathPublic = ''
  let htmlFsPath = ''
  if (chStr === 'preliminary') {
    htmlPathPublic = `/books/${isbnStr}/preliminary/prelims.html`
    htmlFsPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'preliminary', 'prelims.html')
  } else if (chStr === 'index') {
    htmlPathPublic = `/books/${isbnStr}/index/index.html`
    htmlFsPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'index', 'index.html')
  } else if (chStr.toLowerCase().startsWith('case')) {
    // Handle cases
    const caseId = chStr
    htmlPathPublic = `/books/${isbnStr}/cases/${caseId}.html`
    htmlFsPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'cases', `${caseId}.html`)
  } else if (chStr.toLowerCase().startsWith('video-')) {
    // Handle videos
    const videoId = chStr.replace(/^video-/, '')
    // Try to find video in JSON
    try {
      const jsonPath = path.join(process.cwd(), 'public', 'books', isbnStr, `${isbnStr}.json`)
      if (fs.existsSync(jsonPath)) {
        const jsonContent = fs.readFileSync(jsonPath, 'utf-8')
        const bookData = JSON.parse(jsonContent)
        const video = bookData.videos?.find((v: any) => (v.video_id || '') === videoId)
        if (video) {
          videoUrl = video.video_url
          title = video.video_title || `Video ${videoId}`
        }
      }
    } catch (e) {
      console.error('Error loading video data:', e)
    }
  } else {
    const m = /^ch(\d+)$/i.exec(chStr)
    const chNum = m ? m[1] : String(chStr)

    // Try to resolve the file path
    // 1. Try as "ch{number}.html" (standard format)
    // 2. Try as "{chStr}.html" (exact match)

    let candidate = `ch${chNum}.html`
    let fsPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'chapter', candidate)

    if (!fs.existsSync(fsPath)) {
      // Try exact match
      candidate = `${chStr}.html`
      fsPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'chapter', candidate)
    }

    htmlPathPublic = `/books/${isbnStr}/chapter/${candidate}`
    htmlFsPath = fsPath
  }
  try {
    if (!videoUrl && !fs.existsSync(htmlFsPath)) {
      return { notFound: true }
    }
  } catch { }

  // Read HTML content to render inline
  let html = ''
  try {
    html = fs.readFileSync(htmlFsPath, 'utf-8')
  } catch { }

  // Rewrite relative image paths from "XML/..." to "/XML/..."
  const rewriteRelativeXmlImagePaths = (s: string): string => s.replace(/(<img[^>]+src=)(["'])(?!https?:|\/\/|\/)(XML\/[^"']+)(\2)/gi, (_m, p1, q, p, q2) => `${p1}${q}/${p}${q2}`)
  html = rewriteRelativeXmlImagePaths(html)

  // Rewrite /MediumImage/ and /LargeImage/ paths to /books/{isbn}/chapter/MediumImage/ and /books/{isbn}/chapter/LargeImage/
  const rewriteImagePaths = (s: string): string => {
    let out = s
    // Rewrite /MediumImage/ paths
    out = out.replace(/(<img[^>]+src=)(["'])\/MediumImage\/([^"']+)(\2)/gi, (_m, p1, q, filename, q2) => `${p1}${q}/books/${isbnStr}/chapter/MediumImage/${filename}${q2}`)
    // Rewrite /LargeImage/ paths
    out = out.replace(/(<img[^>]+src=)(["'])\/LargeImage\/([^"']+)(\2)/gi, (_m, p1, q, filename, q2) => `${p1}${q}/books/${isbnStr}/chapter/LargeImage/${filename}${q2}`)
    return out
  }
  html = rewriteImagePaths(html)

  // Rewrite chapter navigation links to app routes under /content/book/{isbn}/chapter/{...}
  const rewriteChapterLinks = (s: string): string => {
    let out = s
    // Absolute chapter links like "/{isbn}/chapter/ch4" or "/{isbn}/chapter/ch4.html"
    out = out.replace(new RegExp(`(<a[^>]+href=)(["'])\\/${isbnStr}\\/chapter\\/ch(\\d+)(?:\\.html)?\\2`, 'gi'), (_m, p1, q, num) => `${p1}${q}/content/book/${isbnStr}/chapter/${num}${q}`)
    // Absolute short chapter links like "/{isbn}/ch4"
    out = out.replace(new RegExp(`(<a[^>]+href=)(["'])\\/${isbnStr}\\/ch(\\d+)\\2`, 'gi'), (_m, p1, q, num) => `${p1}${q}/content/book/${isbnStr}/chapter/${num}${q}`)
    // Relative chapter links like "ch4.html"
    out = out.replace(/(<a[^>]+href=)(["'])ch(\d+)\.html\2/gi, (_m, p1, q, num) => `${p1}${q}/content/book/${isbnStr}/chapter/${num}${q}`)
    // Relative links like "../chapter/ch4.html"
    out = out.replace(/(<a[^>]+href=)(["'])\.\.\/chapter\/ch(\d+)\.html\2/gi, (_m, p1, q, num) => `${p1}${q}/content/book/${isbnStr}/chapter/${num}${q}`)
    // Preliminary and Index (absolute)
    out = out.replace(new RegExp(`(<a[^>]+href=)(["'])\\/${isbnStr}\\/preliminary\\2`, 'gi'), (_m, p1, q) => `${p1}${q}/content/book/${isbnStr}/chapter/preliminary${q}`)
    out = out.replace(new RegExp(`(<a[^>]+href=)(["'])\\/${isbnStr}\\/index\\2`, 'gi'), (_m, p1, q) => `${p1}${q}/content/book/${isbnStr}/chapter/index${q}`)
    // Preliminary and Index (relative)
    out = out.replace(/(<a[^>]+href=)(["'])\.\.\/preliminary\/prelims\.html\2/gi, (_m, p1, q) => `${p1}${q}/content/book/${isbnStr}/chapter/preliminary${q}`)
    out = out.replace(/(<a[^>]+href=)(["'])\.\.\/index\/index\.html\2/gi, (_m, p1, q) => `${p1}${q}/content/book/${isbnStr}/chapter/index${q}`)
    return out
  }
  html = rewriteChapterLinks(html)

  // Compute title from toc.html when possible
  if (!videoUrl) {
    try {
      const tocPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'toc.html')
      if (fs.existsSync(tocPath)) {
        const html = fs.readFileSync(tocPath, 'utf-8')
        if (chStr === 'preliminary') {
          const prelimMatch = html.match(new RegExp(`<a[^>]+href=\"\/${isbnStr}\/preliminary(?:/prelims\\.html)?\"[^>]*>([^<]+)<\/a>`, 'i'))
          if (prelimMatch) title = prelimMatch[1].trim()
        } else if (chStr === 'index') {
          const indexMatch = html.match(new RegExp(`<a[^>]+href=\"\/${isbnStr}\/index(?:/index\\.html)?\"[^>]*>([^<]+)<\/a>`, 'i'))
          if (indexMatch) title = indexMatch[1].trim()
        } else if (chStr.toLowerCase().startsWith('case')) {
          // Try to find title for case in TOC if present, otherwise default
          // Cases might not be in TOC, so we might need to rely on default or fetch from JSON if needed.
          // For now, let's default to "Case" + number if not found.
          title = chStr.replace(/^case/i, 'Case ')
        } else {
          const chNumForTitle = (/^ch(\d+)$/i.exec(chStr)?.[1]) || chStr
          const m = html.match(new RegExp(`<a[^>]+href=\"\/${isbnStr}\/ch${chNumForTitle}\"[^>]*>([^<]+)<\/a>`, 'i'))
          if (m) title = m[1].trim()
        }
      }
    } catch { }
  }

  // Check for corresponding PDF
  let pdfUrl: string | null = null
  try {
    const m = /^ch(\d+)$/i.exec(chStr)
    const chNumForPdf = m ? m[1] : chStr
    pdfUrl = (chStr === 'preliminary' || chStr === 'index')
      ? null
      : `/books/${isbnStr}/chapter/ch${encodeURIComponent(chNumForPdf)}.pdf`
  } catch { }

  // (client-side menu handlers are defined inside the component)

  // Fetch book meta (supports numeric id or ISBN) to render header
  let book: Book | null = null
  try {
    const isNumericId = /^\d+$/.test(isbnStr)
    const metaUrl = isNumericId
      ? `${base}/api/books/${encodeURIComponent(isbnStr)}`
      : `${base}/api/books/print_isbn/${encodeURIComponent(isbnStr)}`
    const metaRes = await fetch(metaUrl)
    const metaJson = metaRes.ok ? await metaRes.json() : null
    book = metaJson?.book || null
  } catch { }


  // Build chapters list from TOC for sidebar navigation
  const chapters: Chapter[] = []
  try {
    const tocPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'toc.html')
    if (fs.existsSync(tocPath)) {
      const html = fs.readFileSync(tocPath, 'utf-8')
      const items: { index: number, item: Chapter }[] = []
      let m: RegExpExecArray | null

      // Prelims
      const prelimRegex = new RegExp(`<a[^>]+href=\"\/${isbnStr}\/preliminary(?:/prelims\\.html)?\"[^>]*>([^<]+)<\/a>`, 'gi')
      while ((m = prelimRegex.exec(html)) !== null) {
        items.push({ index: m.index, item: { number: null, title: m[1].trim(), slug: `/content/book/${isbnStr}/chapter/preliminary` } })
      }

      // Chapters
      const chapterRegex = new RegExp(`<a[^>]+href=\"\/${isbnStr}\/ch(\\d+)\"[^>]*>([^<]+)<\/a>`, 'gi')
      while ((m = chapterRegex.exec(html)) !== null) {
        const num = Number(m[1])
        const titleCh = (m[2] || `Chapter ${num}`).replace(/\s+/g, ' ').trim()
        items.push({ index: m.index, item: { number: Number.isNaN(num) ? null : num, title: titleCh, slug: `/content/book/${isbnStr}/chapter/${m[1]}` } })
      }

      // Cases
      const caseRegex = new RegExp(`<a[^>]+href=\"\/${isbnStr}\/cases\/([^"]+)\"[^>]*>([^<]+)<\/a>`, 'gi')
      while ((m = caseRegex.exec(html)) !== null) {
        const caseFile = m[1]
        const caseId = caseFile.replace(/\.html$/, '')
        const titleCase = (m[2] || caseId).replace(/\s+/g, ' ').trim()
        items.push({ index: m.index, item: { number: null, title: titleCase, slug: `/content/book/${isbnStr}/chapter/${caseId}` } })
      }

      // Index
      const indexRegex = new RegExp(`<a[^>]+href=\"\/${isbnStr}\/index(?:/index\\.html)?\"[^>]*>([^<]+)<\/a>`, 'gi')
      while ((m = indexRegex.exec(html)) !== null) {
        items.push({ index: m.index, item: { number: null, title: m[1].trim(), slug: `/content/book/${isbnStr}/chapter/index` } })
      }

      items.sort((a, b) => a.index - b.index)
      items.forEach(x => chapters.push(x.item))
    }

    // Also add videos to the sidebar if they exist in JSON
    try {
      const jsonPath = path.join(process.cwd(), 'public', 'books', isbnStr, `${isbnStr}.json`)
      if (fs.existsSync(jsonPath)) {
        const jsonContent = fs.readFileSync(jsonPath, 'utf-8')
        const bookData = JSON.parse(jsonContent)
        if (bookData.videos && Array.isArray(bookData.videos)) {
          bookData.videos.forEach((v: any, idx: number) => {
            const vidId = v.video_id || `video${idx + 1}`
            chapters.push({
              number: null,
              title: v.video_title || `Video ${idx + 1}`,
              slug: `/content/book/${isbnStr}/chapter/video-${vidId}`
            })
          })
        }
      }
    } catch { }

  } catch { }


  return { props: { isbn: isbnStr, ch: chStr, title, html, htmlUrl: htmlPathPublic, pdfUrl, chapters, book, videoUrl } }
}

ChapterViewerPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default ChapterViewerPage
