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
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import SchoolIcon from '@mui/icons-material/School'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CloseIcon from '@mui/icons-material/Close'
import DownloadIcon from '@mui/icons-material/Download'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

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
  const title = book?.title || "Book Title"
  const author = book?.author || 'Unknown Author'

  const [tab, setTab] = React.useState(0)
  const [query, setQuery] = React.useState('')
  const [expandAll, setExpandAll] = React.useState(false)
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({})
  const [favorite, setFavorite] = React.useState<boolean>(false)
  const [referDialogOpen, setReferDialogOpen] = React.useState(false)
  const [librarianDialogOpen, setLibrarianDialogOpen] = React.useState(false)
  const [keywordsExpanded, setKeywordsExpanded] = React.useState(false)
  
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
    } catch {}
    try {
      await navigator.clipboard.writeText(url)
      // Simple user feedback; avoid adding Snackbar for now
      window.alert('Page link copied to clipboard')
    } catch {}
  }

  const handleExpandAll = () => setExpandAll(true)
  const handleCollapseAll = () => setExpandAll(false)
  const toggleExpandCollapse = () => setExpandAll(prev => !prev)
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Box sx={{ 
          width: '80%', 
          height: '2px', 
          background: (theme) => `linear-gradient(to right, transparent, ${theme.palette.primary.main} 20%, ${theme.palette.primary.main} 80%, transparent)`,
        }} />
      </Box>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} md={3.2} sx={{ pr: 3 }}>
            <Box component="img" src={cover} alt={title} sx={{ width: '100%', borderRadius: 1 }} />
          </Grid>
          <Grid item xs={12} md={8.8}>
            <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 600 }}>{title}</Typography>
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
                <Accordion disableGutters expanded={keywordsExpanded} onChange={() => setKeywordsExpanded(!keywordsExpanded)} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Keywords</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {(book.keywords || '')
                        .split(',')
                        .map(k => k.trim())
                        .filter(Boolean)
                        .map((kw, idx) => (
                          <Chip 
                            key={`kw-${idx}`} 
                            label={kw} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                            sx={{ color: 'black', borderWidth: '2px' }}
                          />
                        ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <TextField fullWidth placeholder={`Search within ${title}...`} size="small" value={query} onChange={(e) => setQuery(e.target.value)} />
            </Box>
          </Grid>
        </Grid>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="Table of Contents" sx={{ fontWeight: 600 }} />
          <Tab label={`Videos (${videosCount})`} sx={{ fontWeight: 600 }} />
          <Tab label={`Cases (${casesCount})`} sx={{ fontWeight: 600 }} />
          <Tab label={`Reviews (${reviewsCount})`} sx={{ fontWeight: 600 }} />
        </Tabs>

        {tab === 0 && (
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Button variant="contained" onClick={toggleExpandCollapse} sx={{ textTransform: 'none' }}>
                {expandAll ? 'Collapse All' : 'Expand All'}
              </Button>
              <Button 
                variant="contained" 
                disabled={!bookPdfUrl} 
                href={bookPdfUrl || undefined}
                endIcon={<PictureAsPdfIcon />}
                sx={{ textTransform: 'none' }}
              >
                Download
              </Button>
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

      {/* Refer to Friend Dialog */}
      <Dialog 
        open={referDialogOpen} 
        onClose={handleCloseReferDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Refer to Friend
            <IconButton onClick={handleCloseReferDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Sender's Name <span style={{ color: 'red' }}>*</span>
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
                Sender's Email Address <span style={{ color: 'red' }}>*</span>
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
                Recipient's Name <span style={{ color: 'red' }}>*</span>
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
                Recipient's Email Address <span style={{ color: 'red' }}>*</span>
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
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleSubmitRefer}
            sx={{ 
              textTransform: 'none'
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
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Recommend To Librarian
            <IconButton onClick={handleCloseLibrarianDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
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
                Librarian's details:
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
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleSubmitLibrarian}
            sx={{ 
              textTransform: 'none'
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { isbn } = ctx.query
  const isbnStr = String(isbn || '')

  try {
    // Build path to metadata.json in public folder
    const bookDir = path.join(process.cwd(), 'public', 'books', isbnStr)
    const metadataPath = path.join(bookDir, 'metadata.json')

    // Check if metadata.json exists
    if (!fs.existsSync(metadataPath)) {
      return { props: { isbn: isbnStr, book: null, sections: [], bookPdfUrl: null, videosCount: 0, casesCount: 0, reviewsCount: 0 } }
    }

    // Read and parse metadata.json
    const metadataContent = fs.readFileSync(metadataPath, 'utf-8')
    const metadata = JSON.parse(metadataContent)

    // Extract book information from metadata
    const bookInfo = metadata.Book
    const chaptersData = metadata.Chapters || []

    // Format author name: convert "LastName FirstName" to "FirstName LastName"
    let authorName = bookInfo['Book-Author-(Last-Name,-First-Name,-Middle-Name)'] || null
    if (authorName) {
      const firstName = bookInfo['Author-1-First-Name'] || ''
      const lastName = bookInfo['Author-1-Last-Name'] || ''
      if (firstName && lastName) {
        authorName = `${firstName} ${lastName}`
      }
    }

    // Build book object
    const book: Book = {
      isbn: bookInfo['Print-ISBN'] || isbnStr,
      print_isbn: bookInfo['Print-ISBN'] || null,
      title: bookInfo['Book-Title'] || 'Untitled',
      author: authorName,
      coverImage: `/books/${isbnStr}/3D_Cover/${isbnStr}.png`,
      description: bookInfo['Book-Abstract'] || null,
      keywords: bookInfo['Book-Keywords'] || null,
    }

    // Build chapters from metadata
    const chapters: Chapter[] = []
    
    // Sort chapters by sequence
    const sortedChapters = [...chaptersData].sort((a, b) => {
      const seqA = parseInt(a['Chapter-Sequence']) || 0
      const seqB = parseInt(b['Chapter-Sequence']) || 0
      return seqA - seqB
    })

    // Process each chapter
    sortedChapters.forEach((chapterData) => {
      const chapterNo = chapterData['Chapter-No'] || ''
      const chapterTitle = chapterData['Chapter-Title'] || 'Untitled'
      const chapterFileName = chapterData['Chapter-File-Name'] || ''
      const chapterSequence = parseInt(chapterData['Chapter-Sequence']) || 0
      
      if (!chapterFileName) return // Skip if no filename
      
      let slug: string | null = null
      let chapterType = 'chapter' // default type
      
      // Determine the slug and type based on chapter number
      if (chapterNo === 'Prelims') {
        slug = `/books/${isbnStr}/preliminary/prelims.html`
        chapterType = 'prelims'
      } else if (chapterNo === 'Index') {
        slug = `/books/${isbnStr}/index/${chapterFileName}.html`
        chapterType = 'index'
      } else if (chapterNo.startsWith('Appendix')) {
        slug = `/books/${isbnStr}/chapter/${chapterFileName}.html`
        chapterType = 'appendix'
      } else if (chapterNo.startsWith('Chapter')) {
        slug = `/books/${isbnStr}/chapter/${chapterFileName}.html`
        chapterType = 'chapter'
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
      } as any)
    })

    // Group into sections based on chapterType
    const prelims = chapters.filter((ch: any) => ch.chapterType === 'prelims')
    const index = chapters.filter((ch: any) => ch.chapterType === 'index')
    const appendices = chapters.filter((ch: any) => ch.chapterType === 'appendix')
    const mainChapters = chapters.filter((ch: any) => ch.chapterType === 'chapter' && ch.number != null)

    const sections: Section[] = []
    if (prelims.length) sections.push({ title: 'Prelims', chapters: prelims })
    if (index.length) sections.push({ title: 'Index', chapters: index })
    if (mainChapters.length) sections.push({ title: 'Chapters', chapters: mainChapters })
    if (appendices.length) sections.push({ title: 'Appendices', chapters: appendices })

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
    } catch {}

    return { props: { isbn: isbnStr, book, sections, bookPdfUrl, videosCount: 0, casesCount: 0, reviewsCount: 0 } }
  } catch (e) {
    console.error('Error loading book metadata:', e)
    return { props: { isbn: isbnStr, book: null, sections: [], bookPdfUrl: null, videosCount: 0, casesCount: 0, reviewsCount: 0 } }
  }
}

BookDetailPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default BookDetailPage
