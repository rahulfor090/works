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
  Link,
  Tabs,
  Tab,
  Chip,
  TextField,
} from '@mui/material'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import ShareIcon from '@mui/icons-material/Share'
import { Menu, MenuItem, ListItemIcon } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

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

const ChapterViewerPage: NextPageWithLayout<Props> = ({ isbn, ch, title, html, htmlUrl, pdfUrl, chapters, book }: Props) => {
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

  const [topTab, setTopTab] = React.useState<number>(0)
  const counts = React.useMemo(() => {
    const s = html || ''
    const figures = (s.match(/<figure\b/gi)?.length || 0)
    const images = (s.match(/<img\b/gi)?.length || 0)
    const tables = (s.match(/<table\b/gi)?.length || 0)
    return { figuresCount: (figures > 0 ? figures : images), tablesCount: tables }
  }, [html])

  const filteredHtml = React.useMemo(() => {
    if (topTab === 1) {
      const figureBlocks = html.match(/<figure[\s\S]*?<\/figure>/gi) || []
      const imgTags = html.match(/<img\b[^>]*>/gi) || []
      const parts = [...figureBlocks, ...imgTags]
      return parts.length ? parts.join('\n') : '<p>No figures or images found.</p>'
    }
    if (topTab === 2) {
      const tableBlocks = html.match(/<table[\s\S]*?<\/table>/gi) || []
      return tableBlocks.length ? tableBlocks.join('\n') : '<p>No tables found.</p>'
    }
    return html
  }, [topTab, html])

  // compute previous/next chapter for top navigation
  const prevNext = React.useMemo(() => {
    const num = /^\d+$/.test(ch) ? Number(ch) : null
    const byNum = (n: number) => chapters.find(c => (c.number ?? -1) === n)
    const firstNum = chapters.find(c => typeof c.number === 'number')?.number ?? null
    const lastNum = [...chapters].reverse().find(c => typeof c.number === 'number')?.number ?? null
    const makeItem = (n: number | null) => {
      if (n == null) return null
      const found = byNum(n)
      return found ? { title: `Chapter ${n}`, slug: found.slug } : { title: `Chapter ${n}`, slug: `/content/book/${isbn}/chapter/${n}` }
    }
    const prev = (num != null) ? ((num - 1) >= 1 ? makeItem(num - 1) : null)
      : (ch === 'index' ? makeItem(lastNum ?? null) : null)
    const next = (num != null) ? makeItem(num + 1)
      : (ch === 'preliminary' ? makeItem(firstNum ?? 1) : null)
    return { prev, next }
  }, [chapters, ch, isbn])

  // three-dot options menu state and handlers
  const [optionsAnchorEl, setOptionsAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuOpen = Boolean(optionsAnchorEl)
  const openOptionsMenu = (e: React.MouseEvent<HTMLElement>) => setOptionsAnchorEl(e.currentTarget)
  const closeOptionsMenu = () => setOptionsAnchorEl(null)
  const getBasicCitation = () => `${title} — ISBN ${isbn}`
  const handleCite = () => {
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
  const handleShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    setShareUrl(url)
    setShareOpen(true)
    closeOptionsMenu()
  }
  const handleBookmarkMenu = () => { toggleBookmark(); closeOptionsMenu() }
  

  const storageKeyBookmark = `bookmark:${isbn}:${ch}`
  

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const bm = window.localStorage.getItem(storageKeyBookmark)
      setBookmarked(bm === 'true')
    } catch {}
  }, [storageKeyBookmark])

  // reading progress based on scroll within the content area
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      const pct = max > 0 ? Math.min(100, Math.max(0, (el.scrollTop / max) * 100)) : 0
      setReadProgress(pct)
    }
    el.addEventListener('scroll', onScroll)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [scrollRef, html])

  const toggleBookmark = () => {
    const next = !bookmarked
    setBookmarked(next)
    try { window.localStorage.setItem(storageKeyBookmark, String(next)) } catch {}
  }

  

  // Make images clickable to open large versions from /XML/[isbn]/Chapters/large/
  React.useEffect(() => {
    if (!contentRef.current) return
    const imgs = Array.from(contentRef.current.querySelectorAll('img'))
    const onClick = (e: Event) => {
      const el = e.currentTarget as HTMLImageElement
      const srcAttr = el.getAttribute('src') || ''
      // Extract filename from src and construct large image path
      const parts = srcAttr.split('?')[0].split('#')[0].split('/')
      const filename = parts[parts.length - 1]
      if (!filename) return
      const largeSrc = `/XML/${isbn}/Chapters/large/${filename}`
      setImageModalSrc(largeSrc)
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
      <Container sx={{ py: 3 }}>
        <LinearProgress variant="determinate" value={readProgress} sx={{ position: 'sticky', top: 0, zIndex: 10, height: 6, borderRadius: 3, mb: 2 }} />
        {/* Book info header */}
        {book && (
          <Grid container spacing={3} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={12} md={2}>
              <Box component="img" src={book.coverImage || DEFAULT_BOOK_COVER} alt={book.title} sx={{ width: '100%', borderRadius: 1, boxShadow: 1 }} />
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 600 }}>{book.title}</Typography>
              {book.author && <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{book.author}</Typography>}
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <Chip label="Book" size="small" />
                <Typography variant="body2" color="text.secondary">ISBN: {isbn}</Typography>
              </Stack>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>{title}</Typography>
              <Box>
                <TextField fullWidth placeholder={`Search within ${book.title}...`} size="small" />
              </Box>
            </Grid>
          </Grid>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Button component={NextLink} href={`/content/book/${isbn}`} startIcon={<ArrowBackIcon />} variant="contained" sx={{ textTransform: 'none' }}>
            Back to TOC
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>{title}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Tabs value={topTab} onChange={(_, v) => setTopTab(v)} textColor="primary" indicatorColor="primary">
            <Tab label="Table of Contents" sx={{ fontWeight: 600 }} />
            <Tab label={`Figures (${counts.figuresCount})`} sx={{ fontWeight: 600 }} />
            <Tab label={`Tables (${counts.tablesCount})`} sx={{ fontWeight: 600 }} />
          </Tabs>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box sx={{ position: 'sticky', top: 80, height: '80vh', overflow: 'auto' }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Chapters</Typography>
              <List dense>
                {chapters.map((c, idx) => {
                  const chNormForActive = String(ch).replace(/^ch/i, '')
                  const isActive = c.slug.endsWith(`/chapter/${chNormForActive}`)
                  return (
                    <ListItemButton
                      key={idx}
                      component={NextLink}
                      href={c.slug}
                      selected={isActive}
                    >
                      <ListItemText primary={c.title} />
                    </ListItemButton>
                  )
                })}
              </List>
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
        <Paper variant="outlined" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, p: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {prevNext.prev && (
              <Typography component={NextLink} href={prevNext.prev.slug} sx={{ color: 'black', fontWeight: 600, fontSize: '1.1rem' }}>
                ‹ {prevNext.prev.title}
              </Typography>
            )}
            {prevNext.prev && prevNext.next && (
              <Typography sx={{ mx: 1, color: 'text.secondary', fontSize: '1.1rem' }}>|</Typography>
            )}
            {prevNext.next && (
              <Typography component={NextLink} href={prevNext.next.slug} sx={{ color: 'black', fontWeight: 600, fontSize: '1.1rem' }}>
                {prevNext.next.title} ›
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Zoom in"><span><IconButton onClick={() => setScale(s => Math.min(2.5, s + 0.1))}><ZoomInIcon /></IconButton></span></Tooltip>
          <Tooltip title="Zoom out"><span><IconButton onClick={() => setScale(s => Math.max(0.5, s - 0.1))}><ZoomOutIcon /></IconButton></span></Tooltip>
          <Tooltip title={'Download Book PDF'}>
              <span>
                <IconButton
                  component="a"
                  href={`/books/${isbn}/${isbn}.pdf`}
                  download={`${isbn}.pdf`}
                  aria-label="Download Book PDF"
                >
                  <PictureAsPdfIcon />
                </IconButton>
              </span>
          </Tooltip>
          <IconButton aria-label="more options" onClick={openOptionsMenu}>
            <MoreVertIcon />
          </IconButton>
          </Box>
          <Menu anchorEl={optionsAnchorEl} open={menuOpen} onClose={closeOptionsMenu} keepMounted>
            <MenuItem onClick={handleCite}>
              <ListItemIcon><FormatQuoteIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Cite</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleShare}>
              <ListItemIcon><ShareIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Share</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleBookmarkMenu}>
              <ListItemIcon>{bookmarked ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}</ListItemIcon>
              <ListItemText>{bookmarked ? 'Remove bookmark' : 'Bookmark'}</ListItemText>
            </MenuItem>
            
          </Menu>
        </Paper>

        

        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', height: '80vh' }}>
          <Box ref={scrollRef} sx={{ overflow: 'auto', height: '80vh' }}>
          <Box sx={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: `${100/scale}%`, height: `${100/scale}%` }}>
            <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 }, display: 'flex', justifyContent: 'center',
              '& .chapter-html p': { fontSize: '1.05rem', lineHeight: 1.8 },
              '& .chapter-html h1, & .chapter-html h2, & .chapter-html h3': { marginTop: 2, marginBottom: 1 },
              '& .chapter-html img': { display: 'block', maxWidth: '100%', height: 'auto', borderRadius: 1, boxShadow: 1, my: 2 },
              '& .chapter-html a': { textDecoration: 'underline' }
            }}>
              <Box sx={{ 
                width: '210mm',
                minHeight: '297mm',
                maxWidth: '100%',
                backgroundColor: 'white',
                padding: '20mm',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
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
        </Paper>

        <Fab color="primary" size="small" onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })} sx={{ position: 'fixed', bottom: 24, right: 24 }}>
          <ArrowUpwardIcon />
        </Fab>

        <Dialog
          open={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
          maxWidth="lg"
          PaperProps={{ sx: { border: '1px solid #2263a4' } }}
        >
          <DialogContent sx={{ p: 0 }}>
            {imageModalSrc ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, backgroundColor: 'transparent', border: '1px solid #2263a4' }}>
                <img
                  src={imageModalSrc}
                  alt="Chapter image"
                  style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', border: '1px solid #2263a4' }}
                />
              </Box>
            ) : null}
          </DialogContent>
        </Dialog>

        <Dialog open={citeOpen} onClose={() => setCiteOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Cite This Chapter</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>{citationText}</Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              component="a"
              href={risHref}
              download={`citation-${isbn}.ris`}
              sx={{ textTransform: 'none' }}
            >
              Download RIS
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={shareOpen} onClose={() => setShareOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Share This Chapter</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Click <strong>Copy Link</strong> button to copy the content permanent URL.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              This link can be shared with users that are connected to the institution’s/school’s network and they will automatically have access to the content.
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              To share a link in a Learning Management System (LMS) course (such as Blackboard, Canvas, Moodle, etc.) that will work for remote users as well as those connected to the school’s network:
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              1. Contact <Link href="mailto:customersuccess@mheducation.com">customersuccess@mheducation.com</Link> to confirm that your LMS has been set up correctly in our system.
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              • Provide your school name and the link for your course in the email.
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              2. Click <strong>Copy Link</strong> button to copy the content permanent URL and paste into your course.
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>Share on social media</Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <IconButton component="a" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton component="a" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
                <TwitterIcon />
              </IconButton>
              <IconButton component="a" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button variant="contained" color="primary" onClick={() => {
              if (navigator.clipboard && shareUrl) {
                navigator.clipboard.writeText(shareUrl).then(() => setSnackbar({ open: true, message: 'Link copied' })).catch(() => {})
              }
            }}>Copy Link</Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ open: false, message: '' })} message={snackbar.message} />
          </Grid>
        </Grid>
      </Container>
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

  // Resolve HTML URL for chapter/preliminary/index and verify existence
  let htmlPathPublic = ''
  let htmlFsPath = ''
  if (chStr === 'preliminary') {
    htmlPathPublic = `/books/${isbnStr}/preliminary/prelims.html`
    htmlFsPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'preliminary', 'prelims.html')
  } else if (chStr === 'index') {
    htmlPathPublic = `/books/${isbnStr}/index/index.html`
    htmlFsPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'index', 'index.html')
  } else {
    const m = /^ch(\d+)$/i.exec(chStr)
    const chNum = m ? m[1] : String(chStr)
    htmlPathPublic = `/books/${isbnStr}/chapter/ch${encodeURIComponent(chNum)}.html`
    htmlFsPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'chapter', `ch${chNum}.html`)
  }
  try {
    if (!fs.existsSync(htmlFsPath)) {
      return { notFound: true }
    }
  } catch {}

  // Read HTML content to render inline
  let html = ''
  try {
    html = fs.readFileSync(htmlFsPath, 'utf-8')
  } catch {}

  // Rewrite relative image paths from "XML/..." to "/XML/..."
  const rewriteRelativeXmlImagePaths = (s: string) => s.replace(/(<img[^>]+src=)(["'])(?!https?:|\/\/|\/)(XML\/[^"']+)(\2)/gi, (_m, p1, q, p, q2) => `${p1}${q}/${p}${q2}`)
  html = rewriteRelativeXmlImagePaths(html)

  // Rewrite chapter navigation links to app routes under /content/book/{isbn}/chapter/{...}
  const rewriteChapterLinks = (s: string) => {
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
  let title = `Chapter ${chStr}`
  try {
    const tocPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'toc.html')
    if (fs.existsSync(tocPath)) {
      const html = fs.readFileSync(tocPath, 'utf-8')
      if (chStr === 'preliminary') {
        const prelimMatch = html.match(new RegExp(`<a[^>]+href=\"\/${isbnStr}\/preliminary\"[^>]*>([^<]+)<\/a>`, 'i'))
        if (prelimMatch) title = prelimMatch[1].trim()
      } else if (chStr === 'index') {
        const indexMatch = html.match(new RegExp(`<a[^>]+href=\"\/${isbnStr}\/index\"[^>]*>([^<]+)<\/a>`, 'i'))
        if (indexMatch) title = indexMatch[1].trim()
      } else {
        const chNumForTitle = (/^ch(\d+)$/i.exec(chStr)?.[1]) || chStr
        const m = html.match(new RegExp(`<a[^>]+href=\"\/${isbnStr}\/ch${chNumForTitle}\"[^>]*>([^<]+)<\/a>`, 'i'))
        if (m) title = m[1].trim()
      }
    }
  } catch {}

  // Check for corresponding PDF
  let pdfUrl: string | null = null
  try {
    const m = /^ch(\d+)$/i.exec(chStr)
    const chNumForPdf = m ? m[1] : chStr
    pdfUrl = (chStr === 'preliminary' || chStr === 'index')
      ? null
      : `/books/${isbnStr}/chapter/ch${encodeURIComponent(chNumForPdf)}.pdf`
  } catch {}

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
  } catch {}


  // Build chapters list from TOC for sidebar navigation
  const chapters: Chapter[] = []
  try {
    const tocPath = path.join(process.cwd(), 'public', 'books', isbnStr, 'toc.html')
    if (fs.existsSync(tocPath)) {
      const html = fs.readFileSync(tocPath, 'utf-8')
      const prelimMatch = html.match(new RegExp(`<a[^>]+href=\"\/${isbnStr}\/preliminary\"[^>]*>([^<]+)<\/a>`, 'i'))
      if (prelimMatch) chapters.push({ number: null, title: prelimMatch[1].trim(), slug: `/content/book/${isbnStr}/chapter/preliminary` })
      const chapterRegex = new RegExp(`<a[^>]+href=\"\/${isbnStr}\/ch(\\d+)\"[^>]*>([^<]+)<\/a>`, 'gi')
      let m: RegExpExecArray | null
      while ((m = chapterRegex.exec(html)) !== null) {
        const num = Number(m[1])
        const titleCh = (m[2] || `Chapter ${num}`).replace(/\s+/g, ' ').trim()
        chapters.push({ number: Number.isNaN(num) ? null : num, title: titleCh, slug: `/content/book/${isbnStr}/chapter/${m[1]}` })
      }
      const indexMatch = html.match(new RegExp(`<a[^>]+href=\"\/${isbnStr}\/index\"[^>]*>([^<]+)<\/a>`, 'i'))
      if (indexMatch) chapters.push({ number: null, title: indexMatch[1].trim(), slug: `/content/book/${isbnStr}/chapter/index` })
    }
  } catch {}
  const sorted = chapters.sort((a, b) => (a.number ?? 0) - (b.number ?? 0))

  return { props: { isbn: isbnStr, ch: chStr, title, html, htmlUrl: htmlPathPublic, pdfUrl, chapters: sorted, book } }
}

ChapterViewerPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default ChapterViewerPage
