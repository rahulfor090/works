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
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import SchoolIcon from '@mui/icons-material/School'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

type Chapter = { id?: number; number?: number | null; title: string; slug?: string | null }
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

const BookDetailPage: NextPageWithLayout<Props> = ({ isbn, book, sections, bookPdfUrl, videosCount = 0, casesCount = 0, reviewsCount = 0 }: Props) => {
  const cover = book?.coverImage || DEFAULT_BOOK_COVER
  const title = book?.title || "Perry's Chemical Engineers' Handbook, 9th Edition"
  const author = book?.author || 'McGraw Hill Education'

  const [tab, setTab] = React.useState(0)
  const [query, setQuery] = React.useState('')
  const [expandAll, setExpandAll] = React.useState(false)
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({})
  const [favorite, setFavorite] = React.useState<boolean>(false)

  const favStorageKey = `book:favourite:${isbn}`

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const v = window.localStorage.getItem(favStorageKey)
      setFavorite(v === 'true')
    } catch {}
  }, [favStorageKey])

  const toggleFavorite = () => {
    setFavorite(prev => {
      const next = !prev
      try { if (typeof window !== 'undefined') window.localStorage.setItem(favStorageKey, String(next)) } catch {}
      return next
    })
  }

  const handleReferFriend = () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    const subject = encodeURIComponent(`Check out this book: ${title}`)
    const body = encodeURIComponent(`I thought you might find this useful:\n\n${url}`)
    const mailto = `mailto:?subject=${subject}&body=${body}`
    window.open(mailto, '_blank')
  }

  const handleRecommendLibrarian = () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    const subject = encodeURIComponent(`Recommendation for library: ${title}`)
    const body = encodeURIComponent(`Dear Librarian,\n\nI recommend adding this book to our library.\n\nTitle: ${title}\nISBN: ${isbn}\nLink: ${url}`)
    const mailto = `mailto:?subject=${subject}&body=${body}`
    window.open(mailto, '_blank')
  }

  const handleSharePage = async () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }
    } catch {}
    try {
      await navigator.clipboard.writeText(url)
      // Simple user feedback; avoid adding Snackbar for now
      window.alert('Page link copied to clipboard')
    } catch {}
  }

  const handleExpandAll = () => setExpandAll(true)
  const handleCollapseAll = () => setExpandAll(false)
  const toggleSection = (idx: number) => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))

  const normalizedQuery = query.trim().toLowerCase()
  const filteredSections = sections.map(sec => ({
    title: sec.title,
    chapters: normalizedQuery ? sec.chapters.filter(ch => ch.title.toLowerCase().includes(normalizedQuery)) : sec.chapters,
  }))

  // Fallback sections if none parsed
  const displaySections: Section[] = (sections && sections.length > 0)
    ? sections
    : [
        {
          title: 'Prelims',
          chapters: [
            { number: null, title: 'Prelims', slug: `/content/book/${isbn}/chapter/preliminary` },
          ],
        },
        {
          title: 'Chapters',
          chapters: [
            { number: 1, title: 'Section 1: Unit Conversion Factors and Symbols' },
            { number: 2, title: 'Section 2: Physical and Chemical Data' },
            { number: 3, title: 'Section 3: Mathematics' },
            { number: 4, title: 'Section 4: Thermodynamics' },
            { number: 5, title: 'Section 5: Heat and Mass Transfer' },
            { number: 6, title: 'Section 6: Fluid and Particle Dynamics' },
            { number: 7, title: 'Section 7: Reaction Kinetics' },
            { number: 8, title: 'Section 8: Process Control' },
            { number: 9, title: 'Section 9: Process Economics' },
          ],
        },
        {
          title: 'Appendices',
          chapters: [],
        },
        {
          title: 'Index',
          chapters: [
            { number: null, title: 'Index', slug: `/content/book/${isbn}/chapter/index` },
          ],
        },
      ]

  return (
    <>
      <Head>
        <title>{title} | Book</title>
      </Head>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} md={2}>
            <Box component="img" src={cover} alt={title} sx={{ width: '100%', borderRadius: 1, boxShadow: 1 }} />
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>{title}</Typography>
            {author && <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{author}</Typography>}
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label="Book" size="small" />
              <Typography variant="body2" color="text.secondary">ISBN: {isbn}</Typography>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Tooltip title="Refer to Friend">
                <IconButton onClick={handleReferFriend} size="small" color="primary"><PersonAddAlt1Icon fontSize="small" /></IconButton>
              </Tooltip>
              <Tooltip title="Recommend to Librarian">
                <IconButton onClick={handleRecommendLibrarian} size="small" color="primary"><SchoolIcon fontSize="small" /></IconButton>
              </Tooltip>
              <Tooltip title="Share This Page">
                <IconButton onClick={handleSharePage} size="small" color="primary"><ShareIcon fontSize="small" /></IconButton>
              </Tooltip>
              <Tooltip title={favorite ? 'Remove from favourites' : 'Add to favourites'}>
                <IconButton onClick={toggleFavorite} size="small" color={favorite ? 'primary' : 'default'}>
                  {favorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Stack>
            {book?.description && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">{book.description}</Typography>
              </Box>
            )}
            {book?.keywords && (
              <Box sx={{ mt: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  {(book.keywords || '')
                    .split(',')
                    .map(k => k.trim())
                    .filter(Boolean)
                    .map((kw, idx) => (
                      <Chip key={`kw-${idx}`} label={kw} size="small" color="primary" variant="outlined" />
                    ))}
                </Stack>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <TextField fullWidth placeholder={`Search within ${title}...`} size="small" value={query} onChange={(e) => setQuery(e.target.value)} />
            </Box>
          </Grid>
        </Grid>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="Table of Contents" />
          <Tab label={`Videos (${videosCount})`} />
          <Tab label={`Cases (${casesCount})`} />
          <Tab label={`Reviews (${reviewsCount})`} />
        </Tabs>

        {tab === 0 && (
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Button variant="outlined" onClick={handleExpandAll}>Expand All</Button>
              <Button variant="outlined" onClick={handleCollapseAll}>Collapse All</Button>
              <Button variant="contained" disabled={!bookPdfUrl} href={bookPdfUrl || undefined}>Download PDF</Button>
            </Stack>

            {filteredSections.map((sec, sIdx) => (
              <Accordion key={sIdx} disableGutters expanded={expandAll || !!expanded[sIdx]} onChange={() => toggleSection(sIdx)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
                  <Typography sx={{ fontWeight: 600 }}>{sec.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {sec.chapters.map((ch, idx) => (
                      <ListItem key={`${sec.title}-${idx}`}>
                        {ch.slug ? (
                          <NextLink href={ch.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography sx={{ '&:hover': { textDecoration: 'underline', color: 'primary.main' } }}>
                              {ch.number != null ? `Chapter ${ch.number}: ` : ''}{ch.title}
                            </Typography>
                          </NextLink>
                        ) : (
                          <Typography>
                            {ch.number != null ? `Chapter ${ch.number}: ` : ''}{ch.title}
                          </Typography>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {tab === 1 && (
          <Typography variant="body2" color="text.secondary">Videos coming soon</Typography>
        )}
        {tab === 2 && (
          <Typography variant="body2" color="text.secondary">Cases coming soon</Typography>
        )}
        {tab === 3 && (
          <Typography variant="body2" color="text.secondary">Reviews coming soon</Typography>
        )}
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { isbn } = ctx.query
  const isbnStr = String(isbn || '')
  const proto = ctx.req.headers['x-forwarded-proto'] || 'http'
  const host = ctx.req.headers.host || 'localhost:3000'
  const base = `${proto}://${host}`

  try {
    // Fetch book meta (supports numeric id or ISBN)
    const isNumericId = /^\d+$/.test(isbnStr)
    const metaUrl = isNumericId
      ? `${base}/api/books/${encodeURIComponent(isbnStr)}`
      : `${base}/api/books/print_isbn/${encodeURIComponent(isbnStr)}`
    const metaRes = await fetch(metaUrl)
    const metaJson = metaRes.ok ? await metaRes.json() : null
    const book = metaJson?.book || null
    const canonicalIsbn = (book?.print_isbn && String(book.print_isbn).trim())
      ? String(book.print_isbn).trim()
      : (String(isbnStr).trim() || (book?.isbn && String(book.isbn).trim()) || '')

    // Build chapters from public folder if available
    const chapters: Chapter[] = []
    const bookDir = path.join(process.cwd(), 'public', 'books', canonicalIsbn)
    const tocPath = path.join(bookDir, 'toc.html')

    if (fs.existsSync(tocPath)) {
      const html = fs.readFileSync(tocPath, 'utf-8')
      // Prelims
      const prelimMatch = html.match(new RegExp(`<a[^>]+href=\"\/${canonicalIsbn}\/preliminary\"[^>]*>([^<]+)<\/a>`, 'i'))
      if (prelimMatch) {
        chapters.push({ number: null, title: prelimMatch[1].trim(), slug: `/books/${canonicalIsbn}/preliminary/prelims.html` })
      }
      // Chapters
      const chapterRegex = new RegExp(`<a[^>]+href=\"\/${canonicalIsbn}\/ch(\\d+)\"[^>]*>([^<]+)<\/a>`, 'gi')
      let m: RegExpExecArray | null
      while ((m = chapterRegex.exec(html)) !== null) {
        const num = Number(m[1])
        const title = (m[2] || `Chapter ${num}`).replace(/\s+/g, ' ').trim()
        chapters.push({ number: Number.isNaN(num) ? null : num, title, slug: `/books/${canonicalIsbn}/chapter/ch${m[1]}.html` })
      }
      // Index
      const indexMatch = html.match(new RegExp(`<a[^>]+href=\"\/${canonicalIsbn}\/index\"[^>]*>([^<]+)<\/a>`, 'i'))
      if (indexMatch) {
        chapters.push({ number: null, title: indexMatch[1].trim(), slug: `/books/${canonicalIsbn}/index/index.html` })
      }
    }

    const sorted = chapters.sort((a, b) => {
      const na = a.number ?? 0
      const nb = b.number ?? 0
      return na - nb
    })

    // Group into sections: Prelims, Chapters, Appendices, Index
    const prelims = sorted.filter(ch => (ch.slug || '').endsWith('/preliminary/prelims.html'))
    const index = sorted.filter(ch => (ch.slug || '').endsWith('/index/index.html'))
    const appendices = sorted.filter(ch => /^Appendix\s/i.test(ch.title))
    const mainChapters = sorted.filter(ch => /^CHAPTER\s/i.test(ch.title) || (ch.number != null && !appendices.includes(ch)))

    const sections: Section[] = []
    if (prelims.length) sections.push({ title: 'Prelims', chapters: prelims })
    if (mainChapters.length) sections.push({ title: 'Chapters', chapters: mainChapters })
    if (appendices.length) sections.push({ title: 'Appendices', chapters: appendices })
    if (index.length) sections.push({ title: 'Index', chapters: index })

    // Detect book PDF (<isbn>.pdf or book.pdf) if present
    let bookPdfUrl: string | null = null
    try {
      const isbnPdfFs = path.join(bookDir, `${canonicalIsbn}.pdf`)
      const bookPdfFs = path.join(bookDir, 'book.pdf')
      if (fs.existsSync(isbnPdfFs)) {
        bookPdfUrl = `/books/${canonicalIsbn}/${canonicalIsbn}.pdf`
      } else if (fs.existsSync(bookPdfFs)) {
        bookPdfUrl = `/books/${canonicalIsbn}/book.pdf`
      }
    } catch {}

    return { props: { isbn: canonicalIsbn, book, sections, bookPdfUrl, videosCount: 0, casesCount: 0, reviewsCount: 0 } }
  } catch (e) {
    return { props: { isbn: isbnStr, book: null, sections: [], bookPdfUrl: null, videosCount: 0, casesCount: 0, reviewsCount: 0 } }
  }
}

BookDetailPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default BookDetailPage
