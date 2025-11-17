import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Typography,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'
import RichTextEditor from '@/components/common/RichTextEditor'
import { useAuth } from '@/utils/auth'

interface ChapterFormData {
  book_id: string
  book_isbn: string
  chapter_number: string
  sequence_number: string
  chapter_title: string
  doi: string
  first_page: string
  last_page: string
  access_type: string
  keywords: string[]
  description: string
}

interface Book {
  id: number
  isbn: string
  book_title: string
}

const CreateEditChapterPage = () => {
  useAuth() // Protect this route
  
  const router = useRouter()
  const { id } = router.query
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [books, setBooks] = useState<Book[]>([])

  const [formData, setFormData] = useState<ChapterFormData>({
    book_id: '',
    book_isbn: '',
    chapter_number: '',
    sequence_number: '',
    chapter_title: '',
    doi: '',
    first_page: '',
    last_page: '',
    access_type: 'Paid',
    keywords: [''],
    description: ''
  })

  useEffect(() => {
    fetchBooks()
    if (isEdit && id) {
      fetchChapter(id as string)
    }
  }, [id, isEdit])

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/admin/books')
      const data = await response.json()
      if (data.success) {
        setBooks(data.data)
      }
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const fetchChapter = async (chapterId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/chapters/${chapterId}`)
      const data = await response.json()

      if (data.success) {
        const chapter = data.data
        setFormData({
          book_id: chapter.book_id?.toString() || '',
          book_isbn: chapter.book_isbn || '',
          chapter_number: chapter.chapter_number || '',
          sequence_number: chapter.sequence_number?.toString() || '',
          chapter_title: chapter.chapter_title || '',
          doi: chapter.doi || '',
          first_page: chapter.first_page?.toString() || '',
          last_page: chapter.last_page?.toString() || '',
          access_type: chapter.access_type || 'Paid',
          keywords: chapter.keywords ? chapter.keywords.split(',').map((k: string) => k.trim()) : [''],
          description: chapter.description || ''
        })
      } else {
        setError(data.message || 'Failed to fetch chapter')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof ChapterFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Auto-fill book_isbn when book is selected
    if (field === 'book_id') {
      const selectedBook = books.find(b => b.id.toString() === value)
      if (selectedBook) {
        setFormData(prev => ({ ...prev, book_isbn: selectedBook.isbn }))
      }
    }
  }

  const handleAddKeyword = () => {
    setFormData(prev => ({ ...prev, keywords: [...prev.keywords, ''] }))
  }

  const handleRemoveKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }))
  }

  const handleKeywordChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.map((k, i) => (i === index ? value : k))
    }))
  }

  const handleSubmit = async (saveAndContinue = false) => {
    const scrollPosition = window.scrollY || window.pageYOffset
    
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const url = isEdit ? `/api/admin/chapters/${id}` : '/api/admin/chapters'
      const method = isEdit ? 'PUT' : 'POST'

      // Prepare data with keywords as comma-separated string
      const submitData = {
        ...formData,
        keywords: formData.keywords.filter(k => k.trim()).join(', ')
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setTimeout(() => window.scrollTo(0, scrollPosition), 0)
        
        if (saveAndContinue) {
          setTimeout(() => router.push('/admin/chapters'), 1500)
        }
      } else {
        setError(data.message || 'Failed to save chapter')
        setTimeout(() => window.scrollTo(0, scrollPosition), 0)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setTimeout(() => window.scrollTo(0, scrollPosition), 0)
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return (
      <AdminLayout title={isEdit ? 'Edit Chapter' : 'Create Chapter'}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Book Chapter' : 'Create Book Chapter'}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {isEdit ? 'Edit Book Chapter' : 'Create Book Chapter'}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/admin/chapters')}
        >
          Back
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        {/* Create Chapter Form */}
        <Box sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Book</InputLabel>
                <Select
                  value={formData.book_id}
                  onChange={(e) => handleInputChange('book_id', e.target.value)}
                  label="Book"
                >
                  {books.map((book) => (
                    <MenuItem key={book.id} value={book.id.toString()}>
                      {book.book_title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Access Type</InputLabel>
                <Select
                  value={formData.access_type}
                  onChange={(e) => handleInputChange('access_type', e.target.value)}
                  label="Access Type"
                >
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Free">Free</MenuItem>
                  <MenuItem value="Open">Open</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="DOI"
                value={formData.doi}
                onChange={(e) => handleInputChange('doi', e.target.value)}
                placeholder="Enter DOI"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Chapter Number"
                value={formData.chapter_number}
                onChange={(e) => handleInputChange('chapter_number', e.target.value)}
                required
                placeholder="Enter chapter number"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Sequence Number"
                type="number"
                value={formData.sequence_number}
                onChange={(e) => handleInputChange('sequence_number', e.target.value)}
                placeholder="Enter sequence number"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Chapter Title"
                value={formData.chapter_title}
                onChange={(e) => handleInputChange('chapter_title', e.target.value)}
                required
                placeholder="Enter chapter title"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Page"
                type="number"
                value={formData.first_page}
                onChange={(e) => handleInputChange('first_page', e.target.value)}
                placeholder="Enter first page"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Page"
                type="number"
                value={formData.last_page}
                onChange={(e) => handleInputChange('last_page', e.target.value)}
                placeholder="Enter last page"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1">Keywords</Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleAddKeyword}
                >
                  Add More
                </Button>
              </Box>
              {formData.keywords.map((keyword, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Keywords"
                    value={keyword}
                    onChange={(e) => handleKeywordChange(index, e.target.value)}
                    placeholder="Enter keyword"
                  />
                  {formData.keywords.length > 1 && (
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveKeyword(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Description
              </Typography>
              <RichTextEditor
                value={formData.description}
                onChange={(value) => handleInputChange('description', value)}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            type="button"
            variant="contained"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleSubmit(false)
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleSubmit(true)
            }}
            disabled={loading}
          >
            Save & Continue
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push('/admin/chapters')
            }}
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>

        {/* Success/Error Messages Below Buttons */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }} onClose={() => setSuccess(false)}>
            Chapter {isEdit ? 'updated' : 'created'} successfully!
          </Alert>
        )}
      </Paper>
    </AdminLayout>
  )
}

export default CreateEditChapterPage
