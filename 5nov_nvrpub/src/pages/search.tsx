import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  IconButton,
  Divider,
  Badge,
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  BookmarkBorder as BookmarkIcon,
  Engineering as EngineeringIcon,
  Functions as FunctionsIcon,
  Assessment as AssessmentIcon,
  TableChart as TableChartIcon,
  BarChart as BarChartIcon,
  Save as SaveIcon,
} from '@mui/icons-material'
import Link from 'next/link'
import { MainLayout } from '@/components/layout'
import { Content } from '@/interfaces/content'

interface SearchPageProps {
  query: string
  type: string
  initialResults: any[]
  total: number
}

interface FilterState {
  subjects: string[]
  industries: string[]
  courses: string[]
  equations: string[]
  codesStandards: string[]
  bookTypes: string[]
  bookTitles: string[]
  bookAuthors: string[]
}

const SearchPage: React.FC<SearchPageProps> = ({ query, type, initialResults, total }) => {
  const [results, setResults] = useState<any[]>(initialResults)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [groupByBook, setGroupByBook] = useState(true)
  const [searchWithinFilters, setSearchWithinFilters] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    subjects: [],
    industries: [],
    courses: [],
    equations: [],
    codesStandards: [],
    bookTypes: [],
    bookTitles: [],
    bookAuthors: [],
  })

  // Sample data for filters
  const filterOptions = {
    subjects: ['Medicine', 'Dentistry', 'Nursing', 'Surgery', 'Pediatrics', 'Cardiology'],
    industries: ['Healthcare', 'Medical Devices', 'Pharmaceuticals', 'Biotechnology'],
    courses: ['MBBS', 'BDS', 'BSc Nursing', 'MD', 'MS', 'MDS'],
    equations: ['Mathematical', 'Chemical', 'Physical', 'Statistical'],
    codesStandards: ['ICD-10', 'CPT', 'SNOMED', 'HL7', 'DICOM'],
    bookTypes: ['Textbook', 'Reference', 'Handbook', 'Atlas', 'Review'],
    bookTitles: ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'Surgery'],
    bookAuthors: ['John H. Lau', 'Lydia Sloan Cline', 'Dr. Smith', 'Dr. Johnson'],
  }

  const contentTypeTabs = [
    { label: 'All', count: 405149, icon: null },
    { label: 'Book Content', count: 405149, icon: <BookmarkIcon /> },
    { label: 'Videos', count: 1430, icon: null },
    { label: 'Spreadsheets', count: 90, icon: <TableChartIcon /> },
    { label: 'Case Studies', count: 15, icon: <AssessmentIcon /> },
    { label: 'DataVis', count: 78, icon: <BarChartIcon /> },
  ]

  const includeOnlyOptions = [
    { label: 'Full Books', count: 672, icon: <BookmarkIcon /> },
    { label: 'Chapters', count: 161292, icon: null },
    { label: 'Solution Walkthroughs', count: 301, icon: <FunctionsIcon /> },
    { label: 'Figures', count: 182691, icon: null },
    { label: 'Graphs', count: 4098, icon: <BarChartIcon /> },
    { label: 'Tables', count: 60506, icon: <TableChartIcon /> },
    { label: 'Examples', count: 11379, icon: null },
  ]

  // Fallback sample search results data
  const sampleResults = [
    {
      id: 1,
      title: '3D IC Integration and Packaging, 1st Edition',
      author: 'John H. Lau, Ph.D.',
      year: 2016,
      description: 'A comprehensive guide to 3D IC integration and packaging technology.',
      image: '/images/book-cover-1.jpg',
      tags: ['Most Relevant', 'Book', 'Engineering Reference'],
      type: 'Book Content'
    },
    {
      id: 2,
      title: '3D Printer Projects for Makerspaces, 1st Edition',
      author: 'Lydia Sloan Cline',
      year: 2017,
      description: 'Learn to model and print 3D designs—no experience required!',
      image: '/images/book-cover-2.jpg',
      tags: ['Book', 'MakerSpace'],
      type: 'Book Content'
    }
  ]

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }))
  }

  const FilterSection = ({ title, options, category }: { title: string, options: string[], category: keyof FilterState }) => (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2" fontWeight={600}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  size="small"
                  checked={filters[category].includes(option)}
                  onChange={() => handleFilterChange(category, option)}
                />
              }
              label={<Typography variant="body2">{option}</Typography>}
              sx={{ display: 'block', mb: 0.5 }}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  )

  return (
    <MainLayout>
      <Head>
        <title>Search Results - Jaypee Digital</title>
        <meta name="description" content="Search results for medical and educational content" />
      </Head>
      
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', pt: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {/* Left Sidebar - Filters */}
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Apply Filters
                  </Typography>
                  <IconButton size="small" sx={{ ml: 'auto' }}>
                    <SaveIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search within applied filters"
                  value={searchWithinFilters}
                  onChange={(e) => setSearchWithinFilters(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <FilterSection title="Subject" options={filterOptions.subjects} category="subjects" />
                <FilterSection title="Industry" options={filterOptions.industries} category="industries" />
                <FilterSection title="Courses" options={filterOptions.courses} category="courses" />
                <FilterSection title="Equations" options={filterOptions.equations} category="equations" />
                <FilterSection title="Codes & Standards" options={filterOptions.codesStandards} category="codesStandards" />
                <FilterSection title="Book Type" options={filterOptions.bookTypes} category="bookTypes" />
                <FilterSection title="Book Title" options={filterOptions.bookTitles} category="bookTitles" />
                <FilterSection title="Book Author" options={filterOptions.bookAuthors} category="bookAuthors" />
              </Paper>
            </Grid>

            {/* Main Content Area */}
            <Grid item xs={12} md={9}>
              {/* Results Header */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Results sorted by relevancy
                </Typography>
                
                {/* Content Type Tabs */}
                <Paper sx={{ mb: 2 }}>
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                  >
                    {contentTypeTabs.map((tab, index) => (
                      <Tab
                        key={index}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {tab.icon}
                            <span>{tab.label}</span>
                            <Chip
                              label={tab.count.toLocaleString()}
                              size="small"
                              variant="outlined"
                              sx={{ ml: 1, fontSize: '0.75rem' }}
                            />
                          </Box>
                        }
                      />
                    ))}
                  </Tabs>
                </Paper>

                {/* Results Info and Controls */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">
                    Showing <strong>405149</strong> Book Content items
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={groupByBook}
                          onChange={(e) => setGroupByBook(e.target.checked)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">Grouped by Book (703)</Typography>}
                    />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">Items per page:</Typography>
                      <Select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        size="small"
                        sx={{ minWidth: 60 }}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                    </Box>
                  </Box>
                </Box>

                {/* Include Only Options */}
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                    Include only:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {includeOnlyOptions.map((option, index) => (
                      <Chip
                        key={index}
                        icon={option.icon ?? undefined}
                        label={`${option.label} (${option.count.toLocaleString()})`}
                        variant="outlined"
                        size="small"
                        clickable
                      />
                    ))}
                  </Box>
                </Paper>
              </Box>

              {/* Search Results */}
              <Box>
                {(results && results.length > 0 ? results : sampleResults).map((result, index) => (
                  <Paper key={result.id} sx={{ p: 3, mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Typography variant="h6" color="text.secondary" sx={{ minWidth: 20 }}>
                        {index + 1}.
                      </Typography>
                      
                      <Box sx={{ width: 80, flexShrink: 0 }}>
                        <Card sx={{ width: 80, height: 100 }}>
                          <CardMedia
                            component="img"
                            height="100"
                            image={result.coverImage || result.image || '/images/home-feature.jpg'}
                            alt={result.title || result.chapterTitle}
                            sx={{ objectFit: 'cover' }}
                          />
                        </Card>
                      </Box>
                      
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                          <Typography variant="h6" component="h3" sx={{ color: 'primary.main', fontWeight: 600 }}>
                            {result.title || result.chapterTitle}
                          </Typography>
                        </Box>
                        
                        {(result.author || result.bookTitle) && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {(result.author || result.bookTitle)}
                          </Typography>
                        )}
                        
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          {(result.type ? [result.type] : result.tags || []).map((tag: string, tagIndex: number) => (
                            <Chip
                              key={tagIndex}
                              label={tag}
                              size="small"
                              variant={tag === 'Most Relevant' ? 'filled' : 'outlined'}
                              color={tag === 'Most Relevant' ? 'primary' : 'default'}
                            />
                          ))}
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {result.description || ''}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="text"
                            size="small"
                            color="primary"
                            sx={{ textTransform: 'none' }}
                          >
                            Preview Next Relevant Items in this Book
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            color="primary"
                            sx={{ textTransform: 'none' }}
                          >
                            All Results in Book
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>

              {/* Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={Math.ceil((results && results.length ? total : 405149) / itemsPerPage)}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                  color="primary"
                  size="large"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query: q, type = 'all' } = context.query as Record<string, string>
  const proto = (context.req.headers['x-forwarded-proto'] as string) || 'http'
  const host = context.req.headers.host || 'localhost:3000'
  const base = `${proto}://${host}`
  let initialResults: any[] = []
  let total = 0
  try {
    const url = `${base}/api/search?q=${encodeURIComponent(String(q || ''))}&type=${encodeURIComponent(String(type || 'all'))}`
    const res = await fetch(url)
    if (res.ok) {
      const data = await res.json()
      initialResults = data.items || []
      total = data.total || 0
    }
  } catch {}

  return {
    props: {
      query: String(q || ''),
      type: String(type || 'all'),
      initialResults,
      total,
    },
  }
}

export default SearchPage
