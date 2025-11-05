import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Collapse,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
  InputAdornment,
  SelectChangeEvent
} from '@mui/material'
import {
  Search as SearchIcon,
  Help as HelpIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material'
import { useRouter } from 'next/router'

interface SubjectCategory {
  id: number
  name: string
  slug: string
  ishomepage: number
}

interface AdvancedSearchSliderProps {
  onSearch?: (query: string, type: string, categories: string[]) => void
}

const AdvancedSearchSlider: React.FC<AdvancedSearchSliderProps> = ({ onSearch }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [contentType, setContentType] = useState('all')
  const [showBrowseContent, setShowBrowseContent] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [subjectCategories, setSubjectCategories] = useState<SubjectCategory[]>([])

  // Content types for dropdown
  const contentTypes = [
    { value: 'all', label: 'All Content' },
    { value: 'books', label: 'Books' },
    { value: 'journals', label: 'Journals' },
    { value: 'videos', label: 'Videos' },
    { value: 'cases', label: 'Cases' },
    { value: 'mcqs', label: 'MCQs' }
  ]

  // Load subject categories (ishomepage=1)
  useEffect(() => {
    // For now, using static data based on the codebase analysis
    // In a real implementation, this would fetch from an API
    const homepageCategories: SubjectCategory[] = [
      { id: 1, name: 'Medicine', slug: 'medicine', ishomepage: 1 },
      { id: 2, name: 'Dentistry', slug: 'dentistry', ishomepage: 1 },
      { id: 3, name: 'Nursing', slug: 'nursing', ishomepage: 1 },
      { id: 4, name: 'Surgery', slug: 'surgery', ishomepage: 1 },
      { id: 5, name: 'Pediatrics', slug: 'pediatrics', ishomepage: 1 },
      { id: 6, name: 'Cardiology', slug: 'cardiology', ishomepage: 1 }
    ]
    setSubjectCategories(homepageCategories)
  }, [])

  const handleContentTypeChange = (event: SelectChangeEvent) => {
    setContentType(event.target.value)
  }

  const handleCategoryToggle = (categorySlug: string) => {
    setSelectedCategories(prev => 
      prev.includes(categorySlug)
        ? prev.filter(cat => cat !== categorySlug)
        : [...prev, categorySlug]
    )
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, contentType, selectedCategories)
    } else {
      // Default behavior: navigate to search page
      const params = new URLSearchParams()
      if (searchQuery) params.set('q', searchQuery)
      if (contentType !== 'all') params.set('type', contentType)
      if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','))
      
      router.push(`/search?${params.toString()}`)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        maxWidth: 800,
        mx: 'auto',
        mt: 4
      }}
    >
      {/* Main Search Row */}
      <Grid container spacing={2} alignItems="center">
        {/* Content Type Dropdown */}
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Content Type</InputLabel>
            <Select
              value={contentType}
              label="Content Type"
              onChange={handleContentTypeChange}
              sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            >
              {contentTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Search Input */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search for any subject, author, or key word..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              }
            }}
          />
        </Grid>

        {/* Search Button and Help */}
        <Grid item xs={12} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                }
              }}
            >
              Search
            </Button>
            
            <Tooltip 
              title="Search results are shown in relevancy order and all results from a particular book are grouped together by default so that only the top result from each book displays initially."
              arrow
              placement="top"
            >
              <IconButton
                size="small"
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                  }
                }}
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>

      {/* Browse Content By Toggle */}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="text"
          onClick={() => setShowBrowseContent(!showBrowseContent)}
          startIcon={<FilterListIcon />}
          endIcon={showBrowseContent ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'primary.light',
              color: 'white',
            }
          }}
        >
          Browse Content by
        </Button>
      </Box>

      {/* Subject Categories */}
      <Collapse in={showBrowseContent}>
        <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
            Select subject categories to filter content:
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {subjectCategories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                onClick={() => handleCategoryToggle(category.slug)}
                color={selectedCategories.includes(category.slug) ? 'primary' : 'default'}
                variant={selectedCategories.includes(category.slug) ? 'filled' : 'outlined'}
                sx={{
                  '&:hover': {
                    backgroundColor: selectedCategories.includes(category.slug) 
                      ? 'primary.dark' 
                      : 'primary.light',
                    color: 'white',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              />
            ))}
          </Box>

          {selectedCategories.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Selected: {selectedCategories.length} categories
              </Typography>
              <Button
                size="small"
                onClick={() => setSelectedCategories([])}
                sx={{ ml: 2, minWidth: 'auto' }}
              >
                Clear All
              </Button>
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  )
}

export default AdvancedSearchSlider