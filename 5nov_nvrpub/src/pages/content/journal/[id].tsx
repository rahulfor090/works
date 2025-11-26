import type { GetServerSideProps } from 'next'
import React from 'react'
import { NextPageWithLayout } from '@/interfaces/layout'
import { MainLayout } from '@/components/layout'
import Head from 'next/head'
import NextLink from 'next/link'
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
    Snackbar,
    Alert,
    MenuItem,
    Select,
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
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import SearchIcon from '@mui/icons-material/Search'

type Chapter = { id?: number; number?: number | null; title: string; slug?: string | null; chapterType?: string; pages?: string }
type Section = { title: string; chapters: Chapter[] }
type Journal = {
    id?: number
    issn?: string | null
    title: string
    author?: string | null
    coverImage?: string | null
    description?: string | null
    keywords?: string | null
    subjectcategoryId?: number | null
}

type Props = {
    id: string
    journal: Journal | null
    sections: Section[]
    journalPdfUrl: string | null
    videosCount?: number
    reviewsCount?: number
}

const DEFAULT_JOURNAL_COVER = '/images/jaypee-DSJUOG-1761321552656.jpg'

const JournalDetailPage: NextPageWithLayout<Props> = ({ id, journal, sections, journalPdfUrl, videosCount = 0, reviewsCount = 0 }: Props) => {
    const cover = journal?.coverImage || DEFAULT_JOURNAL_COVER
    const title = journal?.title || "Journal Title"
    const author = journal?.author || 'Unknown Author'

    const [tab, setTab] = React.useState(0)
    const [volume, setVolume] = React.useState('Volume - 1')
    const [issue, setIssue] = React.useState('Issue - 1')
    const [query, setQuery] = React.useState('')
    const [expandAll, setExpandAll] = React.useState(false)
    const [expanded, setExpanded] = React.useState<Record<number, boolean>>({})
    const [favorite, setFavorite] = React.useState<boolean>(false)
    const [referDialogOpen, setReferDialogOpen] = React.useState(false)
    const [librarianDialogOpen, setLibrarianDialogOpen] = React.useState(false)

    const [searchDialogOpen, setSearchDialogOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const [snackbarMessage, setSnackbarMessage] = React.useState('')
    const [descriptionModalOpen, setDescriptionModalOpen] = React.useState(false)

    // Form states for Refer to Friend
    const [senderName, setSenderName] = React.useState('')
    const [senderEmail, setSenderEmail] = React.useState('')
    const [recipientName, setRecipientName] = React.useState('')
    const [recipientEmail, setRecipientEmail] = React.useState('')
    const [referSubject, setReferSubject] = React.useState('')
    const [referMessage, setReferMessage] = React.useState('')

    // Form states for Recommend to Librarian
    const [libTitle, setLibTitle] = React.useState('')
    const [libIssn, setLibIssn] = React.useState('')
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

    const favStorageKey = `journal:favourite:${id}`

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
        // Pre-fill journal data
        setLibTitle(title)
        setLibIssn(id)
        setLibrarianDialogOpen(true)
    }

    const handleCloseLibrarianDialog = () => {
        setLibrarianDialogOpen(false)
        // Reset form
        setLibTitle('')
        setLibIssn('')
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
            libIssn,
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

    const handleExpandAll = () => setExpandAll(true)
    const handleCollapseAll = () => setExpandAll(false)
    const toggleExpandCollapse = () => setExpandAll(prev => !prev)
    const toggleSection = (idx: number) => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))

    // Function to handle PDF download
    const handleDownloadPdf = async (chapterSlug: string | null | undefined) => {
        if (!chapterSlug) return

        // Extract the path components from the slug
        const slugParts = chapterSlug.split('/')
        const fileName = slugParts[slugParts.length - 1]
        const fileNameWithoutExt = fileName.replace('.html', '')
        const folderType = slugParts[slugParts.length - 2]

        // Construct PDF path
        const pdfPath = `/journals/${id}/${folderType}/PDF/${fileNameWithoutExt}.pdf`

        // Check if PDF exists before attempting download
        try {
            const response = await fetch(pdfPath, { method: 'HEAD' })
            if (!response.ok) {
                setSnackbarMessage('No PDF found')
                setSnackbarOpen(true)
                return
            }

            // Create a temporary anchor element to trigger download
            const link = document.createElement('a')
            link.href = pdfPath
            link.download = `${fileNameWithoutExt}.pdf`
            link.target = '_blank'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            setSnackbarMessage('No PDF found')
            setSnackbarOpen(true)
        }
    }

    const normalizedQuery = query.trim().toLowerCase()
    const filteredSections = sections.map(sec => ({
        title: sec.title,
        chapters: normalizedQuery ? sec.chapters.filter(ch => ch.title.toLowerCase().includes(normalizedQuery)) : sec.chapters,
    }))

    // Compute search results
    const searchResults = React.useMemo(() => {
        if (!searchQuery.trim()) return []
        const lowerQuery = searchQuery.toLowerCase()
        const results: Array<Chapter & { isKeyword?: boolean }> = []

        // Search in chapters
        sections.forEach(sec => {
            sec.chapters.forEach(ch => {
                if (ch.title.toLowerCase().includes(lowerQuery)) {
                    results.push(ch)
                }
            })
        })

        // Search in keywords
        if (journal?.keywords) {
            const keywords = journal.keywords.split(',').map(k => k.trim()).filter(Boolean)
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
    }, [searchQuery, sections, journal])

    return (
        <>
            <Head>
                <title>{title} | Journal</title>
            </Head>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box sx={{
                    width: '80%',
                    height: '2px',
                    background: 'linear-gradient(to right, transparent, #FF6B6B 20%, #FF8E53 80%, transparent)',
                    opacity: 0.4
                }} />
            </Box>
            <Container sx={{ py: 6 }}>
                <Grid container spacing={3} alignItems="center" sx={{ mb: 2 }}>
                    <Grid item xs={12} md={3.2} sx={{ pr: 3 }}>
                        <Box component="img" src={cover} alt={title} sx={{ width: '100%', borderRadius: 1 }} />
                    </Grid>
                    <Grid item xs={12} md={8.8}>
                        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#0A2540', fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: '-0.02em' }}>{title}</Typography>

                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                            <Chip
                                label="Journal"
                                size="small"
                                sx={{
                                    background: 'linear-gradient(to right, #FF6B6B, #FF8E53)',
                                    color: 'white',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontSize: '0.7rem',
                                    height: '24px'
                                }}
                            />
                            <Typography variant="body2" sx={{ color: '#94A3B8', fontFamily: 'SF Mono, monospace' }}>ISSN: {journal?.issn}</Typography>
                            <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: '#E2E8F0' }} />
                            <Tooltip title="Refer to Friend">
                                <IconButton onClick={handleReferFriend} size="small" sx={{ color: '#0A2540', '&:hover': { color: '#3B82F6', backgroundColor: '#F1F5F9' } }}><PersonAddAlt1Icon fontSize="small" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Recommend to Librarian">
                                <IconButton onClick={handleRecommendLibrarian} size="small" sx={{ color: '#0A2540', '&:hover': { color: '#3B82F6', backgroundColor: '#F1F5F9' } }}><SchoolIcon fontSize="small" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Share This Page">
                                <IconButton onClick={handleSharePage} size="small" sx={{ color: '#0A2540', '&:hover': { color: '#3B82F6', backgroundColor: '#F1F5F9' } }}><ShareIcon fontSize="small" /></IconButton>
                            </Tooltip>
                            <Tooltip title={favorite ? 'Remove from favourites' : 'Add to favourites'}>
                                <IconButton onClick={toggleFavorite} size="small" sx={{ color: favorite ? '#EF4444' : '#0A2540', '&:hover': { color: '#EF4444', backgroundColor: '#FEF2F2' } }}>
                                    {favorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                                </IconButton>
                            </Tooltip>
                        </Stack>

                        {journal?.description && (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.7 }}>
                                    <strong>Aims & Scope</strong>
                                    <br />
                                    Donald School Journal of Ultrasound in Obstetrics and Gynecology (DSJUOG) publishes...
                                    <Box
                                        component="span"
                                        onClick={() => setDescriptionModalOpen(true)}
                                        sx={{
                                            color: '#3B82F6',
                                            cursor: 'pointer',
                                            ml: 1,
                                            textDecoration: 'underline',
                                            '&:hover': { color: '#2563EB' }
                                        }}
                                    >
                                        Read more
                                    </Box>
                                </Typography>
                            </Box>
                        )}

                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Select
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                size="small"
                                sx={{ minWidth: 150, borderRadius: 2, backgroundColor: '#F8FAFC' }}
                            >
                                {Array.from({ length: 19 }, (_, i) => (
                                    <MenuItem key={i + 1} value={`Volume - ${i + 1}`}>
                                        Volume - {i + 1}
                                    </MenuItem>
                                ))}
                            </Select>

                            <Select
                                value={issue}
                                onChange={(e) => setIssue(e.target.value)}
                                size="small"
                                sx={{ minWidth: 150, borderRadius: 2, backgroundColor: '#F8FAFC' }}
                            >
                                {Array.from({ length: 4 }, (_, i) => (
                                    <MenuItem key={i + 1} value={`Issue - ${i + 1}`}>
                                        Issue - {i + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" sx={{ color: '#EF4444', fontWeight: 500, mb: 0.5 }}>
                                [ Please select above dropdown to change articles for the above volume and issue ]
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748B' }}>
                                Articles of the selected issue will be displayed in the article section below.
                            </Typography>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Box
                                onClick={() => setSearchDialogOpen(true)}
                                sx={{
                                    cursor: 'pointer',
                                    border: '1px solid',
                                    borderColor: '#E2E8F0',
                                    borderRadius: '2rem',
                                    px: 3,
                                    py: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    transition: 'all 0.2s',
                                    backgroundColor: '#F8FAFC',
                                    '&:hover': {
                                        borderColor: '#3B82F6',
                                        backgroundColor: '#ffffff',
                                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
                                    }
                                }}
                            >
                                <SearchIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.75 }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Search within {title}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    sx={{
                        mb: 4,
                        '& .MuiTab-root': {
                            fontWeight: 600,
                            color: '#64748B',
                            textTransform: 'none',
                            fontSize: '1rem',
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
                    <Tab label="Editorial Board" />
                    <Tab label="Articles" />
                </Tabs>

                {tab === 0 && (
                    <Box sx={{ p: 2, backgroundColor: 'background.paper', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                        <div className="editorial-info text-center" style={{ marginTop: '-24px' }}>
                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Editor-in-Chief&nbsp;</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Asim Kurjak </b><br />
                                Department of Obstetrics and Gynecology, Medical School University of Zagreb, Croatia, and Head of Doctoral Studies, Medical School, University Sarajevo School of Science and Technology, Bosnia and Herzegovina<br />
                                0000-0002-1680-3030<br />
                                <strong><a href="mailto:asim.kurjak@public.carnet.hr" style={{ color: '#3B82F6', textDecoration: 'none' }}>asim.kurjak@public.carnet.hr</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor-in-Chief</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Frank A. Chervenak </b><br />
                                Chair of Obstetrics &amp; Gynecology, Lenox Hill Hospital, New York, USA<br />
                                <strong><a href="mailto:fchervenak@northwell.edu" style={{ color: '#3B82F6', textDecoration: 'none' }}>fchervenak@northwell.edu</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Executive Editor</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Milan Stanojevic </b><br />
                                Department of Neonatology, Medical School University of Zagreb, Croatia<br />
                                0000-0002-3124-5575<br />
                                <strong><a href="mailto:mstanoje29@yahoo.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>mstanoje29@yahoo.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Scientific Editor</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Toshiyuki Hata </b><br />
                                Special Adviser, Department of Obstetrics and Gynecology, Miyake Clinic, 369-8 Ofuku, Minami-ku, Okayama 701-0204, Japan<br />
                                Professor Emeritus, Department of Perinatology and Gynecology, Kagawa University Graduate School of Medicine, 1750-1 Ikenobe, Miki, Kagawa 761-0793, Japan<br />
                                0000-0002-8835-8554<br />
                                <strong><a href="mailto:hata.toshiyuki@kagawa-u.ac.jp" style={{ color: '#3B82F6', textDecoration: 'none' }}>hata.toshiyuki@kagawa-u.ac.jp</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Editor</span>
                            </h5>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Sanja Kupesic Plavsic</b><br />
                                    Department of Obstetrics and Gynecology, Paul L. Foster School of Medicine, Texas Tech University Health Sciences Center El Paso, El Paso, Texas, USA<br />
                                    0000-0001-7780-8583<br />
                                    <strong><a href="mailto:sanja.kupesic@ttuhsc.edu" style={{ color: '#3B82F6', textDecoration: 'none' }}>sanja.kupesic@ttuhsc.edu</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Ritsuko K Pooh</b><br />
                                    CRIFM Clinical Research Institute of Fetal Medicine PMC, Osaka, Japan<br />
                                    0000-0002-1527-4595<br />
                                    <strong><a href="mailto:ritsuko.pooh.brain@fetal-medicine-pooh.jp" style={{ color: '#3B82F6', textDecoration: 'none' }}>ritsuko.pooh.brain@fetal-medicine-pooh.jp</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Ivica Zalud</b><br />
                                    Professor and Chair, Department of OB/GYN and Women’s Health, John A. Burns School of Medicine, University of Hawaii OB/GYN Department Chief, Hawai’i Pacific Health Medical Group Honolulu, USA<br />
                                    0000-0002-7294-3257<br />
                                    <strong><a href="mailto:ivica@hawaii.edu" style={{ color: '#3B82F6', textDecoration: 'none' }}>ivica@hawaii.edu</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Renato Augusto Moreira de Sa</b><br />
                                    Department of Maternal and Child), Federal Fluminense University; and Department of Clinical Research, Fernandes Figueira Institute - FIOCRUZ, Rio de Janeiro, Brazil<br />
                                    0000-0001-6357-7702<br />
                                    <strong><a href="mailto:renatosa.uff@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>renatosa.uff@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Panagiotis Antsaklis</b><br />
                                    Department of Obstetrics and Gynecology, Alexandra Maternity Hospital, Medical School University of Athens, Greece<br />
                                    <strong><a href="mailto:panosant@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>panosant@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Tuangsit Wataganara</b><br />
                                    Department of Obstetrics and Gynecology, Division of Maternal Fetal Medicine, Faculty of Medicine Siriraj Hospital, Bangkok, Thailand<br />
                                    <strong><a href="mailto:twataganara@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>twataganara@gmail.com</a></strong><br />
                                </Grid>
                            </Grid>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (History)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Kazuo Maeda </b><br />
                                Honorary Professor, Department of Obstetrics and Gynecology, Tottori University Medical School, Yonago, Japan<br />
                                <strong><a href="mailto:maedak@mocha.ocn.ne.jp" style={{ color: '#3B82F6', textDecoration: 'none' }}>maedak@mocha.ocn.ne.jp</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Obstetrics)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Ana Bianchi </b><br />
                                Chief of Perinatal Department, Pereira Rossell Hospital, Montevideo, Uruguay<br />
                                0000-0003-1045-1190<br />
                                <strong><a href="mailto:anabbianchi@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>anabbianchi@gmail.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Invasive diagnostic procedures)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Giovanni Monni </b><br />
                                Department of Obstetrics and Gynecology, Prenatal and Preimplantation Genetic Diagnosis, Fetal Therapy, Microcitemico Pediatric Hospital “A. Cao”, Cagliari, Sardinia, Italy<br />
                                0000-0002-7386-5967<br />
                                <strong><a href="mailto:prenatalgmonni@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>prenatalgmonni@gmail.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Prenatal diagnosis)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Zoltan Papp </b><br />
                                Department of Obstetrics and Gynecology, Semmelweis University, and Private Maternity Department of Obstetrics, Clinical Genetics and Gynecology, Budapest, Hungary<br />
                                0000-0002-7532-9763<br />
                                <strong><a href="mailto:pzorvosihetilap@maternity.hu" style={{ color: '#3B82F6', textDecoration: 'none' }}>pzorvosihetilap@maternity.hu</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Human reproduction)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Jaideep Malhotra </b><br />
                                Department of Reproductive Medicine &amp; Infertility, Managing Director, ART Rainbow IVF, Agra, India<br />
                                0000-0001-8348-3789<br />
                                <strong><a href="mailto:jaideepmalhotraagra@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>jaideepmalhotraagra@gmail.com</a></strong><br />
                                <br />
                                <b>Erden Radončić </b><br />
                                Repromed, Polyclinic for gynecology and reproductive medicine, Human reproduction, Zagreb, Croatia<br />
                                0000-0003-1848-1597<br />
                                <strong><a href="mailto:erden.radoncic@zg.t-com.hr" style={{ color: '#3B82F6', textDecoration: 'none' }}>erden.radoncic@zg.t-com.hr</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Education)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Miroslaw Wielgos </b><br />
                                1st Chair and Department of Obstetrics and Gynecology, Medical University of Warsaw, Poland<br />
                                <strong><a href="mailto:miroslaw.wielgos@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>miroslaw.wielgos@gmail.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Gynecology)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Radu Vladareanu </b><br />
                                Department of Obstetrics and Gynecology, Carol Davila University of Medicine and Pharmacy, ELIAS University Emergency Hospital, Bucharest, Romania<br />
                                0000-0001-9512-2673<br />
                                <strong><a href="mailto:vladareanu@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>vladareanu@gmail.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Neonatology)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Marina Degtyareva </b><br />
                                Department of Neonatology, Pirogov Russian National Research Medical University, Moscow, Russia<br />
                                <strong><a href="mailto:mvdegtyareva@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>mvdegtyareva@gmail.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Developing countries)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Narendra Malhotra </b><br />
                                <strong><a href="mailto:mnmhagra3@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>mnmhagra3@gmail.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Noninvasive prenatal diagnostics)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Carmina Comas </b><br />
                                Chief of Obstetric’s Service. Hospital Germans Trias i Pujol, Badalona, Barcelona, Spain. Associated Professor in Obstetrics and Gynecology at Autonomic University of Barcelona<br />
                                0000-0001-6631-0165<br />
                                <strong><a href="mailto:minacomas.germanstrias@gencat.cat" style={{ color: '#3B82F6', textDecoration: 'none' }}>minacomas.germanstrias@gencat.cat</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Twins)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Aris Antsaklis </b><br />
                                Department of Obstetrics and Gynecology, Medical School University of Athens, Greece<br />
                                0000-0002-3855-5496<br />
                                <strong><a href="mailto:arisants@otenet.gr" style={{ color: '#3B82F6', textDecoration: 'none' }}>arisants@otenet.gr</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Urogynecology)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Ashok Khurana </b><br />
                                The Ultrasound Lab, Urogynecology, New Delhi, India<br />
                                <strong><a href="mailto:ashokkhurana@doctor.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>ashokkhurana@doctor.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (1st trimester screening)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Waldo Sepulveda </b><br />
                                FETALMED—Maternal-Fetal Diagnostic Center, Santiago, Chile<br />
                                <strong><a href="mailto:waldosepulveda@fetalmed.cl" style={{ color: '#3B82F6', textDecoration: 'none' }}>waldosepulveda@fetalmed.cl</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Functional studies of the fetus)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Lara Spalldi Barisic </b><br />
                                Health Center Zadar, Zadar Croatia<br />
                                <strong><a href="mailto:spalldi@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>spalldi@gmail.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Cognitive functions of fetus)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Miro Jakovljevic </b><br />
                                Professor Emeritus, Department of Phychiatry, School of Medicine, University of Zagreb, Croatia<br />
                                <strong><a href="mailto:jakovljevic.miro@yahoo.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>jakovljevic.miro@yahoo.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Fetal physiology)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Aida Salihagić Kadić </b><br />
                                Department of Physiology and Immunology, School of Medicine, University of Zagreb<br />
                                Zagreb Croatia<br />
                                <strong><a href="mailto:aida.salihagic@mef.hr" style={{ color: '#3B82F6', textDecoration: 'none' }}>aida.salihagic@mef.hr</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Fellowship programs)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Ulrich Honemeyer </b><br />
                                Department of Obstetrics and Gynecology, Fetal Medicine, King’s College Hospital Dubai; Royal Hospital NMC, Sharjah, UAE<br />
                                <strong><a href="mailto:dr.ulrich.ho@hotmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>dr.ulrich.ho@hotmail.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Co-Editor (Fetal behavioural science and 3D/4D ultrasound)</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Mohamed Ahmed Mostafa AboEllail </b><br />
                                Department of Obstetrics and Gynecology, Faculty of Medicine, Sohag University, Sohag, Egypt<br />
                                <strong><a href="mailto:midolailo@yahoo.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>midolailo@yahoo.com</a></strong><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>International Editorial Board Member</span>
                            </h5>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Abdallah Adra</b><br />
                                    Department of Obstetrics and Gynecology, Division of Maternal Fetal Medicine, American University of Beirut, Beirut, Lebanon<br />
                                    <strong><a href="mailto:adramfm@inco.com.lb" style={{ color: '#3B82F6', textDecoration: 'none' }}>adramfm@inco.com.lb</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Abdal-Latif Ashmaig Khalifa</b><br />
                                    The National Ribat University, Khartoum, Sudan<br />
                                    <strong><a href="mailto:profashmaig@hotmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>profashmaig@hotmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Alaa Ebrashy</b><br />
                                    Department of Obstetrics and Gynecology, Materno-fetal Unit, Kasr El Aini Hospital, Cairo University, Egypt<br />
                                    0000-0003-2118-0445<br />
                                    <strong><a href="mailto:ebrashy63@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>ebrashy63@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Aleksandar Ljubic</b><br />
                                    Department of Obstetrics and Gynaecology, BioCell Hospital, Belgrade, Serbia; Vincula Biotech Group; DIU Libertas, Dubrovnik, Croatia<br />
                                    0000-0003-0647-316X<br />
                                    <strong><a href="mailto:aleksljubicpriv@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>aleksljubicpriv@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Alexandra Matias</b><br />
                                    Department of Obstetrics and Gynecology, Porto University Centro Hospitalar Universitário S. João, Porto, Portugal<br />
                                    https://orcid.org/0000-0002-2967-5365<br />
                                    <strong><a href="mailto:matiasalexand@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>matiasalexand@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Aliyu Labaran Dayyabu</b><br />
                                    Department of Obstetrics and Gynecology, Fetal Medicine Unit, Bayero University, Kano, Nigeria<br />
                                    0000-0001-6132-5050<br />
                                    <strong><a href="mailto:zainalabidinaliyu@yahoo.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>zainalabidinaliyu@yahoo.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Azen Salim</b><br />
                                    Department of Obstetrics and Gynecology, Rumah Sakit Pondok Indah Hospital, Jakarta, Indonesia<br />
                                    <strong><a href="mailto:azen364@msn.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>azen364@msn.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Elsa Viora</b><br />
                                    Department of Obstetrics and Gynecology Ultrasound and Prenatal Diagnosis S. Anna Hospital, Turin, Italy<br />
                                    <strong><a href="mailto:viora.elsa@yahoo.it" style={{ color: '#3B82F6', textDecoration: 'none' }}>viora.elsa@yahoo.it</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Erasmo Huertas Tacchino</b><br />
                                    Associate Professor, San Marcos National University, Lima, Peru<br />
                                    0000-0002-9851-8419<br />
                                    <strong><a href="mailto:erasmohuertas@hotmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>erasmohuertas@hotmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Fida Mahmoud Ahmad Thekrallah</b><br />
                                    Department of Obstetrics and Gynecology, University of Jordan, Amman, Jordan<br />
                                    <strong><a href="mailto:fidaaymen@hotmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>fidaaymen@hotmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Gordana Adamova</b><br />
                                    Department of Perinatology, Sante Plus Hospital, Skopje, North Macedonia<br />
                                    <strong><a href="mailto:gadamova@hotmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>gadamova@hotmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Gwang Jun Kim</b><br />
                                    Department of Obstetrics and Gynecology, Chung-Ang University Hospital, Seoul, Korea<br />
                                    0000-0002-5347-4088<br />
                                    <strong><a href="mailto:gjkim@cau.ac.kr" style={{ color: '#3B82F6', textDecoration: 'none' }}>gjkim@cau.ac.kr</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Hari Kishor Shrestha</b><br />
                                    Department of Radiology and IVF Centre, Om Hospital &amp; Research Centre Pvt Ltd, Kathmandu, Nepal<br />
                                    0000-0003-0726-2591<br />
                                    <strong><a href="mailto:harishrestha340@hotmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>harishrestha340@hotmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Hisham Arab</b><br />
                                    Program Director, Maternal and Fetal Health Program, Dr. Arab Medical Center, Jeddah, Saudi Arabia<br />
                                    0000-0001-8267-5906<br />
                                    <strong><a href="mailto:arab123@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>arab123@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Jure Knez</b><br />
                                    Department of Obstetrics and Gynecology, University Medical Centre Maribor, Maribor, Slovenia<br />
                                    <strong><a href="mailto:knez.jure@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>knez.jure@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Liliana Voto</b><br />
                                    School of Medicine, Buenos Aires University, Buenos, Aires, Argentina<br />
                                    <strong><a href="mailto:lvoto@intramed.net" style={{ color: '#3B82F6', textDecoration: 'none' }}>lvoto@intramed.net</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Mohamed S Elmahaishi</b><br />
                                    Lamis IVF Center, Misurata, Libya<br />
                                    <strong><a href="mailto:elmahaishi@elmahaishi.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>elmahaishi@elmahaishi.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Nelson Aguilar</b><br />
                                    Maternal-fetal Medicine Unit – Clinica Chicamocha, Bucaramanga, Colombia<br />
                                    <strong><a href="mailto:nelsonyesid@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>nelsonyesid@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Orion Gliozheni</b><br />
                                    Head of Department of Obstetrics and Gynecology, University of Medicine of Tirana, Albania<br />
                                    0000-0002-2556-1782<br />
                                    <strong><a href="mailto:gliozheniorion@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>gliozheniorion@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Taib Delic</b><br />
                                    Director Polyclinic Agram, Sarajevo, Bosnia and Herzegovina<br />
                                    0000-0003-1405-0669<br />
                                    <strong><a href="mailto:taib.delic@poliklinika-agram.ba" style={{ color: '#3B82F6', textDecoration: 'none' }}>taib.delic@poliklinika-agram.ba</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Junichi Hasegawa</b><br />
                                    Department of Obstetrics and Gynecology, St. Marianna University School of Medicine, Kawasaki, Kanagawa, Japan<br />
                                    0000-0002-5789-1022<br />
                                    <strong><a href="mailto:hasejun@marianna-u.ac.jp" style={{ color: '#3B82F6', textDecoration: 'none' }}>hasejun@marianna-u.ac.jp</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Syed Amir Gilani</b><br />
                                    Pro-Rector, Faculty of Allied Health Sciences; Director, Directorate of International Linkages, University of Lahore, Lahore, Pakistan<br />
                                    0000-0002-2996-0764<br />
                                    <strong><a href="mailto:profgilani@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>profgilani@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Vincenzo D’ Addario</b><br />
                                    Department of Gynecology and Obstetrics, University of Bari, Italy<br />
                                    0000-0001-7515-2541<br />
                                    <strong><a href="mailto:daddariov@alice.it" style={{ color: '#3B82F6', textDecoration: 'none' }}>daddariov@alice.it</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Yaron Zalel</b><br />
                                    Sackler School of Medicine Tel Aviv University, Israel<br />
                                    <strong><a href="mailto:zalel1954@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>zalel1954@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Sertaç Esin</b><br />
                                    Department of Perinatology, Baskent University, Ankara, Turkey<br />
                                    0000-0001-9577-4946<br />
                                    <strong><a href="mailto:sertacesin@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>sertacesin@gmail.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Zorancho Petanovski</b><br />
                                    Department of Gynecology and Obstetrics, IVF Centre, Re-Medika, Skopje, Republic of North Macedonia; and Faculty of Medical Sciences, Goce Delchev University, Shtip, Republic of North Macedonia<br />
                                    0000-0001-9273-3559<br />
                                    <strong><a href="mailto:zpetanovski@yahoo.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>zpetanovski@yahoo.com</a></strong><br />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ mb: 3 }}>
                                    <b>Edin Medjedovic</b><br />
                                    Clinic of Gynecology and Obstetrics, Clinical Center University of Sarajevo, Sarajevo, Bosnia and Herzegovina; and Department of Gynecology, Obstetrics and Reproductive Medicine, School of Medicine, Sarajevo School of Science and Technology, Sarajevo, Bosnia and Herzegovina<br />
                                    0000-0003-2357-9580<br />
                                    <strong><a href="mailto:medjedovic.e@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>medjedovic.e@gmail.com</a></strong><br />
                                </Grid>
                            </Grid>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Managing Editor</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Prashant Kaushik </b><br />
                            </p>

                            <h5 className="editorialSubhead" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                <span>Secretary of the Journal</span>
                            </h5>
                            <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                                <b>Jadranka Cerovec </b><br />
                                <strong><a href="mailto:jadranka.cerovec@yahoo.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>jadranka.cerovec@yahoo.com</a></strong><br />
                            </p>
                        </div>
                    </Box>
                )}

                {tab === 1 && (
                    <Box>
                        {/* Table Header */}
                        <Box sx={{ display: 'flex', px: 2, py: 1.5, mb: 1, backgroundColor: '#F8FAFC', borderRadius: 1, border: '1px solid #E2E8F0' }}>
                            <Typography variant="subtitle2" sx={{ flex: 1, fontWeight: 600, color: '#64748B' }}>Article Name</Typography>
                            <Typography variant="subtitle2" sx={{ width: '100px', textAlign: 'center', fontWeight: 600, color: '#64748B' }}>Pages</Typography>
                            <Typography variant="subtitle2" sx={{ width: '80px', textAlign: 'center', fontWeight: 600, color: '#64748B' }}>Action</Typography>
                        </Box>

                        {filteredSections.map((sec, sIdx) => (
                            <Box key={sIdx}>
                                {sec.chapters.map((ch, idx) => {
                                    // Determine if this chapter should be locked
                                    const shouldShowLock = isLocked && (
                                        (ch.id != null && ch.id >= 2) // Lock from 2nd article onwards based on ID/sequence
                                    )
                                    const shouldShowUnlock = !shouldShowLock

                                    return (
                                        <Box
                                            key={`${sec.title}-${idx}`}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                px: 2,
                                                py: 2,
                                                mb: 1,
                                                borderRadius: 1,
                                                border: '1px solid #F1F5F9',
                                                '&:hover': { backgroundColor: '#F8FAFC' }
                                            }}
                                        >
                                            {/* Article Name with Lock Icon */}
                                            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1.5, pr: 2 }}>
                                                {shouldShowLock && (
                                                    <Tooltip title="Premium content - Login required">
                                                        <LockIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
                                                    </Tooltip>
                                                )}
                                                {shouldShowUnlock && (
                                                    <Tooltip title="Unlocked content">
                                                        <LockOpenIcon sx={{ fontSize: 18, color: 'success.main', flexShrink: 0 }} />
                                                    </Tooltip>
                                                )}

                                                {ch.slug ? (
                                                    <NextLink href={ch.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <Typography sx={{
                                                            color: '#334155',
                                                            fontWeight: 500,
                                                            transition: 'color 0.2s',
                                                            '&:hover': { color: '#3B82F6' }
                                                        }}>
                                                            {ch.title}
                                                        </Typography>
                                                    </NextLink>
                                                ) : (
                                                    <Typography sx={{ color: '#334155', fontWeight: 500 }}>
                                                        {ch.title}
                                                    </Typography>
                                                )}
                                            </Box>

                                            {/* Pages */}
                                            <Typography variant="body2" sx={{ width: '100px', textAlign: 'center', color: '#64748B', fontFamily: 'SF Mono, monospace' }}>
                                                {ch.pages || '-'}
                                            </Typography>

                                            {/* Action (PDF Download) */}
                                            <Box sx={{ width: '80px', display: 'flex', justifyContent: 'center' }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDownloadPdf(ch.slug)}
                                                    sx={{
                                                        color: '#FF6B6B',
                                                        '&:hover': {
                                                            backgroundColor: '#FEF2F2',
                                                            color: '#FF5252'
                                                        }
                                                    }}
                                                >
                                                    <PictureAsPdfIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                        ))}
                    </Box>
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
                        {/* Title and ISSN */}
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
                                ID <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                size="small"
                                value={libIssn}
                                onChange={(e) => setLibIssn(e.target.value)}
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
                                        const isKeyword = (ch as any).isKeyword
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
                                    No results found for "{searchQuery}"
                                </Typography>
                            )}
                        </Box>
                    )}
                </DialogContent>
            </Dialog>

            {/* Snackbar for notifications */}
            {/* Description Modal */}
            <Dialog
                open={descriptionModalOpen}
                onClose={() => setDescriptionModalOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        maxHeight: '90vh'
                    }
                }}
            >
                <DialogTitle sx={{ borderBottom: '1px solid #E2E8F0', pb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#0A2540' }}>
                            About the Journal
                        </Typography>
                        <IconButton onClick={() => setDescriptionModalOpen(false)} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ pt: 3, overflowY: 'auto', maxHeight: 'calc(90vh - 100px)' }}>
                    <Box 
                        sx={{ 
                            '& h5': { fontSize: '1.25rem', fontWeight: 600, color: '#0A2540', mt: 3, mb: 2 },
                            '& h6': { fontSize: '1rem', fontWeight: 600, color: '#0A2540', mt: 2, mb: 1 },
                            '& p': { color: '#475569', lineHeight: 1.7, mb: 2 },
                            '& ul': { ml: 3, mb: 2 },
                            '& ol': { ml: 3, mb: 2 },
                            '& li': { mb: 1, color: '#475569' },
                            '& a': { color: '#8e44ad', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
                            '& table': { width: '100%', mb: 3 },
                            '& td': { padding: '8px', verticalAlign: 'top' },
                            '& tbody': { width: '100%' },
                            '& tr': { width: '100%' },
                            '& span': { display: 'block', textAlign: 'center', fontSize: '20px', color: 'black', fontWeight: 'bold' }
                        }}
                        dangerouslySetInnerHTML={{ 
                            __html: `
                                <span style="text-align: center; font-size: 20px; color: black; font-weight: bold;">
                                    Donald School Journal of Ultrasound in Obstetrics and Gynecology
                                </span><br>
                                <p></p>
                                <table style="width:100%;" width="70%">
                                    <tbody>
                                        <tr>
                                            <td valign="top" width="50%">
                                                <ul style="margin-left: 20px;">
                                                    <li><strong><a href="#1"><span style="color:#8e44ad;">Aims &amp; Scope</span></a></strong></li>
                                                    <li><strong><a href="#2"><span style="color:#8e44ad;">Ownership and Management</span></a></strong>
                                                        <ul>
                                                            <li><strong><a href="#2a"><span style="color:#8e44ad;">About the Society</span></a></strong></li>
                                                            <li><strong><a href="#2b"><span style="color:#8e44ad;">About the Publisher</span></a></strong></li>
                                                        </ul>
                                                    </li>
                                                    <li><strong><a href="#4"><span style="color:#8e44ad;">Publication frequency</span></a></strong></li>
                                                    <li><strong><a href="#5"><span style="color:#8e44ad;">Digital Preservation / Archiving</span></a></strong></li>
                                                </ul>
                                            </td>
                                            <td style="width: 100%;" valign="top">
                                                <ul style="margin-left: 20px;">
                                                    <li><strong><a href="#6"><span style="color:#8e44ad;">Copyright and Licensing</span></a></strong></li>
                                                    <li><strong><a href="#7"><span style="color:#8e44ad;">Open Access Policy</span></a></strong></li>
                                                    <li><strong><a href="#8"><span style="color:#8e44ad;">Self-Archiving Policy for Authors</span></a></strong></li>
                                                    <li><strong><a href="#9"><span style="color:#8e44ad;">Publication Ethics and Malpractice Statement</span></a></strong></li>
                                                    <li><strong><a href="#10"><span style="color:#8e44ad;">Advertisement policy</span></a></strong></li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h5>Aims &amp; Scope</h5>
                                <p id="2"><strong>Donald School Journal of Ultrasound in Obstetrics and Gynecology (DSJUOG) publishes </strong>quality review articles covering all aspects of ultrasound as it impacts diagnosis and management in the field. As the technology and its applications are constantly improving, there is a need for lifelong learning for all sonologists so that they can optimize their care for gynecologic, maternal and fetal patients on an ongoing basis. The Ian Donald Inter-University School of Medical Ultrasound with its 50 active member nations is proud to support the DSJUOG and provide continuing medical education to sonologists throughout the world.</p>

                                <h5 id="2a">Ownership and Management</h5>
                                <p>Donald School Journal of Ultrasound in Obstetrics and Gynecology (DSJUOG) is owned and managed under the auspices of DSJUOG Press, and Jaypee Brothers Medical Publishers (P) Ltd is the publisher.</p>

                                <h6>About the Society</h6>
                                <h6>About the Publisher</h6>
                                <p id="4">Jaypee Brothers Medical Publishers (P) Ltd is committed to supporting health, medical and dental research communities across continents. Jaypee Journals, a division of Jaypee Brothers Medical Publishers is one of the largest medical publishers in the world and provides high-quality open-access journals that are trustworthy, authoritative, and accessible to researchers. We provide high-quality support at all stages of the publishing cycle so that we can help researchers publish their work. We are the partners of success for researchers through global standard publishing as well as open access. We are the partners of success for researchers through global standard publishing as well as open access.</p>

                                <h5 id="5">Publication Frequency</h5>
                                <p>Donald School Journal of Ultrasound in Obstetrics and Gynecology (DSJUOG) publishes Quarterly issues focussing on all aspects of ultrasound as it impacts diagnosis and management in the field.</p>

                                <h5>Digital Preservation / Archiving:</h5>
                                <p id="6">Donald School Journal of Ultrasound in Obstetrics and Gynecology provides for long-term digital preservation through PORTICO.</p>
                                <p>Portico is a leading digital preservation service worldwide. The content is preserved as an archival version and is not publically accessible via Portico, but is provided when required under specific conditions, such as discontinuation of the collection or catastrophic failure of the website.</p>

                                <h5>Copyright and Licensing</h5>
                                <p>Under Creative Commons the Authors retain ownership/ copyright of their content. The authors assign exclusive commercial re-use rights of the article to the Publisher.&nbsp;</p>
                                <p>All open access articles published are distributed under the terms of the CC BY-NC 4.0 license (Creative Commons Attribution-Non-Commercial 4.0 International Public License as currently displayed at <strong><a href="http://creativecommons.org/licenses/by-nc/4.0/legalcode" rel="noreferrer noopener" target="_blank">http://creativecommons.org/licenses/by-nc/4.0/legalcode</a></strong>) which permits unrestricted use, distribution, and reproduction in any medium, for non-commercial purposes, provided the original work is properly cited.&nbsp;</p>
                                <p>Authors have to mandatorily submit the <strong><a href="https://d45jl3w9libvn.cloudfront.net/jaypee/static/journals/DSJUOG/supp/OA_License_Agreement.docx" rel="noreferrer noopener" target="_blank">Open Access License Agreement Form</a></strong> when submitting the manuscript.&nbsp;</p>
                                <p>Articles published under this arrangement are made freely available online upon publication without subscription barriers to access. Users of such published articles are entitled to use, reproduce, disseminate, or display these articles for personal, research and educational use provided that:&nbsp;</p>

                                <ul>
                                    <li><p>The original authorship is properly and fully attributed.&nbsp;</p></li>
                                    <li><p>The journal and publisher are attributed as the original place of publication with correct citation details given.&nbsp;</p></li>
                                    <li><p>If an original work is subsequently reproduced or disseminated not in its entirety but only in part or as a derivative work, this is clearly indicated.&nbsp;</p></li>
                                    <li><p id="7">No articles are reproduced for commercial use without the prior consent of the Publisher. All the licensing requests and permissions for commercial use of the article will be managed by the Publisher. For re-use of the content for other purposes that are not covered by the CC BY-NC license, please contact <strong><a href="http://journals.permissions@jaypeebrothers.com/" rel="noreferrer noopener" target="_blank">journals.permissions@jaypeebrothers.com</a>&nbsp;</strong></p></li>
                                    <li><p>Authors are also entitled to deposit the final electronic version of the article into an institutional or centrally organized subject repository upon publication. They should include a link to the published version of the article on the journal's web site, and the journal and publisher should be attributed as the original place of publication, with correct citations given.&nbsp;</p></li>
                                </ul>

                                <h5>Open Access Policy</h5>
                                <p><b>A comprehensive outlook on open access policy that we follow:</b></p>
                                <p>Open access refers to the practice of making peer-reviewed scholarly research and literature freely available online to anyone interested in reading it at no cost and with limited restrictions with regards to reuse.&nbsp; Open access publications are freely and permanently available online to anyone with an internet access. The journal allows unrestricted use, distribution and reproduction in any medium (which is non-commercial), provided the article is properly attributed. All the articles are published, without any technical, financial, gender limitations, in an agreed format on the journal website and deposited in archive and indexing databases as applicable to the journal. All articles are assigned a Digital Object Identifier (DOI), thereby making it fully citable and searchable by title, author name(s) and the full text.&nbsp;&nbsp;</p>

                                <p><b>Why open access publishing?</b></p>
                                <p id="8">Restricted access to scientific research and advancements through subscription pay wall hinders communication within the scientific community. Moreover, restricted access can also hinder the education and dissemination of scientific knowledge to the aspiring younger generations who are keen to pursue a career in science. Increased productivity and development of science can only be achieved by diffusing knowledge and providing the facilities for creating permanent repositories such as Open Access.&nbsp;</p>
                                <p>The use of a Creative Commons 4.0 License (CC-BY-NC 4.0) enables user/reader/peer to use the content with clear permission in a way that it can be reused and redistributed as long as the article source is appropriately given credit for non-commercial purpose.&nbsp;</p>

                                <h5><strong>Self-Archiving Policy for Authors</strong></h5>
                                <p>The Donald School Journal of Ultrasound in Obstetrics and Gynecology upholds a Repository Policy and is listed in <a href="https://v2.sherpa.ac.uk/id/publication/45012?template=romeo"><strong>Sherpa Romeo</strong></a> for compliance with self-archiving regulations. Authors are encouraged to deposit the final published PDF in their institutional repository or any suitable subject repository (according to the end-user license of the article, i.e., strictly for non-commercial re-use) immediately upon publication. The deposited version should contain the URL and link to the online published version on the publisher's website to clearly identify it as the definitive version of record.</p>

                                <p><b>Abstract and Citation information</b></p>
                                <p>Authors can share the Abstract and "How to cite" information (e.g., Title, Author name, Publication dates) of their article anywhere at any time including social media such as Facebook, blogs and Twitter, with proper attribution to the original source (the Publisher website) or include the DOI number in the social media post that links it to the published article on the Journal website.</p>

                                <p><b>Submitted Version</b></p>
                                <p>Submitted version (SV) or the preprint version is recognized as the author version of an article before submission to a journal for peer review. The author accepts full responsibility for the article, and the content and layout are set out by the author.&nbsp;</p>
                                <p>Authors can post their preprint version on preprint servers of the authors' choice, authors' or institutional websites, preprint servers or preprint commenting platforms, intended for non-commercial use. When submitting the manuscript to the journal, authors must disclose all pertinent information regarding preprint publication, such as the DOI and licencing terms. The author must make sure that the preprint record is updated with a publication reference after it is published, including the DOI and a URL link to the journal website where the paper has been published.&nbsp;</p>

                                <p><b>Accepted Manuscript</b></p>
                                <p>The accepted manuscript (AM) is the peer reviewed version (not the final published version) as accepted for publication by the journal that includes modifications based on reviewers' suggestions. This version excludes copy editing and type setting changes.&nbsp;&nbsp;</p>
                                <p>The journal does not recommend the authors to upload AM to their personal website/ institutional or other non-commercial subject-based repositories.&nbsp;</p>

                                <p><b>Published Version</b></p>
                                <p>Published Version (PV) is defined as the final version of the article that has been made available by the Publisher on the respective journal website by formally and exclusively putting the article either in 'online first' or releasing it as a part of the complete issue of that journal. This is the final, definitive, citable version of your paper, which has been copyedited, typeset, has metadata applied, and has been allocated a DOI.&nbsp;</p>
                                <p id="9">Authors may share the PV with private groups within their institution or through private groups on non-commercial repositories that are signatories to the STM Voluntary principles for article sharing on Scholarly Collaboration Networks (SCN). The PV may not be uploaded or shared on commercial websites or repositories unless the website or repository has signed an agreement with the publisher permitting such uploading or sharing.&nbsp;</p>

                                <h5 id="10">Publication Ethics and Malpractice Statement</h5>
                                <p>This Publication Ethics and Malpractice Statement is based on the Code of Conduct and Best Practice Guidelines for Journal Editors as per Committee on Publication Ethics, ICMJE &amp; WAME. Please visit&nbsp;<strong><a href="https://www.dsjuog.com/journal/DSJUOG/page/policy">Policy</a>&nbsp;</strong>page for more details.&nbsp;</p>

                                <h5>Advertisement Policy</h5>
                                <ol>
                                    <li><p>Journals carry advertisements both digitally and in print. All these commercially sponsored advertisements are independent of editorial decisions.&nbsp;</p></li>
                                    <li><p>Journal and the Publisher do not endorse any product or service marked as an advertisement or promoted by a sponsor in any of our publications. Editorial content is not compromised by commercial or financial interests, or by any specific arrangements with advertising clients or sponsors.&nbsp;</p></li>
                                    <li><p>Journal and the Publisher reserves the right to decline any type of advertising that is damaging to the brand or is inappropriate to the content or deceptive or misleading. The content in the advertisements should be verifiable.&nbsp;&nbsp;</p></li>
                                    <li><p>Advertisements will not be accepted if they appear to be indecent or offensive in either text or artwork, or if they are discriminatory in terms of personal, racial, ethnic, sexual orientation, or religious nature.&nbsp;</p></li>
                                    <li><p>Journal and the Publisher will not accept advertising for products or services known to be harmful to health (e.g., tobacco and alcohol products).&nbsp;</p></li>
                                    <li><p>Even if the advertisement has been implemented online, it will be withdrawn from the journal site at any time if the Journal and the Publisher feel it is inappropriate.&nbsp;</p></li>
                                    <li><p>The product advertorial will not allow any treatment-specific or drug-specific campaign to be targeted to a specific article(s) on any page where content related to the product(s) is being advertised.&nbsp;</p></li>
                                    <li><p>Advertisers should make available to the Publisher, the marketing authorization and summary of product characteristics when submitting their advertisement. In the case of drug advertisements, the full generic name of each active ingredient should be clearly stated.&nbsp;</p></li>
                                    <li><p>Editorial decisions will not be influenced by current or potential sponsors and advertisers and will not be influenced by marketing decisions.&nbsp;</p></li>
                                    <li><p>Information about complaints concerning advertisements will be included in the Advertisements page in Print copies only.</p></li>
                                </ol>
                                <p></p>
                            ` 
                        }}
                    />
                </DialogContent>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const { id } = ctx.query
    const idStr = String(id || '')

    // HARDCODED DATA - Replace this with your actual data later
    const journal: Journal = {
        id: 1,
        issn: '0973-614X',
        title: 'Donald School Journal of Ultrasound in Obstetrics and Gynecology',
        coverImage: '/images/jaypee-DSJUOG-1761321552656.jpg',
        description: 'This is a placeholder description for the journal. Replace this with actual journal description.',
        keywords: 'medical, research, healthcare, clinical studies, academic',
    }

    // HARDCODED SECTIONS - Replace with actual data
    const sections: Section[] = [
        {
            title: 'Articles',
            chapters: [
                { id: 1, number: 1, title: 'The Use of 3D/4D Ultrasound in Clinical Practice', pages: '0-0', slug: null, chapterType: 'chapter' },
                { id: 2, number: 2, title: '13-week Pulmonary Sonoangiogram by 3D HDlive Flow', pages: '355-356', slug: null, chapterType: 'chapter' },
                { id: 3, number: 3, title: 'How to increase the Impact Factor of a Scientific Journal?', pages: '357-360', slug: null, chapterType: 'chapter' },
                { id: 4, number: 4, title: 'First Trimester Scan by 3D, 3D HDlive and HDlive Silhouette/Flow Ultrasound Imaging', pages: '361-371', slug: null, chapterType: 'chapter' },
                { id: 5, number: 5, title: 'Second Trimester Anomaly Scan using 3D/4D Ultrasound', pages: '372-381', slug: null, chapterType: 'chapter' },
                { id: 6, number: 6, title: '4D Fetal Echocardiography in Clinical Practice', pages: '382-396', slug: null, chapterType: 'chapter' },
                { id: 7, number: 7, title: 'Fetal Organ Volume Measurements by Three-dimensional Ultrasonography in Clinical Practice', pages: '397-407', slug: null, chapterType: 'chapter' },
                { id: 8, number: 8, title: 'Placental Volume Measurement in Clinical Practice', pages: '408-412', slug: null, chapterType: 'chapter' },
                { id: 9, number: 9, title: 'Fetal HDlive Silhouette Mode in Clinical Practice', pages: '413-419', slug: null, chapterType: 'chapter' },
                { id: 10, number: 10, title: 'Recent Results of the Clinical Application of Kanet Test', pages: '420-425', slug: null, chapterType: 'chapter' },
                { id: 11, number: 11, title: 'The Potential Use of the Fetal Observable Movement System in Clinical Practice', pages: '426-433', slug: null, chapterType: 'chapter' },
                { id: 12, number: 12, title: 'The New Three-dimensional Ultrasound Modes allow a Better Polycystic Ovary Syndrome Ultrasound Diagnosis beyond the Rotterdam Criteria', pages: '434-445', slug: null, chapterType: 'chapter' },
                { id: 13, number: 13, title: 'Role of the State-of-the-Art Three-dimensional Ultrasound in the Differentiation of Benign and Malignant Ovarian Masses', pages: '446-461', slug: null, chapterType: 'chapter' },
                { id: 14, number: 14, title: 'HDliveFlow in the Assessment of Fetal Circulation', pages: '462-470', slug: null, chapterType: 'chapter' },
                { id: 15, number: 15, title: 'Fetal Consciousness: Four-dimensional Ultrasound Study', pages: '471-474', slug: null, chapterType: 'chapter' },
            ]
        }
    ]



    return {
        props: {
            id: idStr,
            journal,
            sections,
            journalPdfUrl: null,
            videosCount: 0,
            reviewsCount: 0
        }
    }
}

JournalDetailPage.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default JournalDetailPage
