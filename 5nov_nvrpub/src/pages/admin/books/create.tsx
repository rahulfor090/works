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
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
  ListItemText
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
import RichTextEditor from '@/components/common/RichTextEditor'
import { useAuth } from '@/utils/auth'

interface BookFormData {
  isbn: string
  book_title: string
  book_subtitle: string
  doi: string
  category_id: number | string
  subject_ids: number[]
  society: string
  access_type: string
  book_content_type: string
  edition: string
  book_type: string
  book_bisac: string
  publishing_year: number | string
  publish_status: string
  no_of_chapters: number | string
  no_of_pages: number | string
  no_of_volumes: number | string
  featured: boolean
  status: string
  download_enable: boolean
  rating: number | string
  book_cover_image: string
  book_overview: string
  supplementary_information: string
  authors: string
}

interface Category {
  id: number
  name: string
}

interface Subject {
  id: number
  subject: string
}

const CreateEditBookPage = () => {
  useAuth() // Protect this route

  const router = useRouter()
  const { id } = router.query
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState<BookFormData>({
    isbn: '',
    book_title: '',
    book_subtitle: '',
    doi: '',
    category_id: '',
    subject_ids: [],
    society: '',
    access_type: 'Paid',
    book_content_type: 'Book',
    edition: '',
    book_type: '',
    book_bisac: '',
    publishing_year: '',
    publish_status: 'Staging',
    no_of_chapters: '',
    no_of_pages: '',
    no_of_volumes: 1,
    featured: false,
    status: 'Active',
    download_enable: false,
    rating: '',
    book_cover_image: '',
    book_overview: '',
    supplementary_information: '',
    authors: ''
  })

  useEffect(() => {
    if (isEdit && id) {
      fetchBook(id as string)
    }
  }, [id, isEdit])

  useEffect(() => {
    fetchCategories()
    fetchSubjects()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      const data = await response.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (err: any) {
      console.error('Failed to fetch categories:', err)
    }
  }

  const fetchSubjects = async () => {
    try {
      const response = await fetch('/api/admin/subjects')
      const data = await response.json()
      if (data.success) {
        setSubjects(data.data)
      }
    } catch (err: any) {
      console.error('Failed to fetch subjects:', err)
    }
  }

  const fetchBook = async (bookId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/books/${bookId}`)
      const data = await response.json()

      if (data.success) {
        setFormData({
          ...data.data,
          publishing_year: data.data.publishing_year || '',
          no_of_chapters: data.data.no_of_chapters || '',
          no_of_pages: data.data.no_of_pages || '',
          no_of_volumes: data.data.no_of_volumes || 1,
          rating: data.data.rating || '',
          category_id: data.data.category_id || '',
          subject_ids: data.data.subject_ids || [],
          status: data.data.status || 'Active',
          authors: data.data.authors || ''
        })
      } else {
        setError(data.message || 'Failed to fetch book')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof BookFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG, JPEG, and PNG files are allowed')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload-book-cover', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.filename) {
        // Save only the filename to the database
        handleInputChange('book_cover_image', data.filename)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(data.message || 'Upload failed')
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (saveAndContinue = false) => {
    // Save current scroll position
    const scrollPosition = window.scrollY || window.pageYOffset

    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      const url = isEdit ? `/api/admin/books/${id}` : '/api/admin/books'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        // Restore scroll position after state update
        setTimeout(() => window.scrollTo(0, scrollPosition), 0)

        if (saveAndContinue) {
          setTimeout(() => router.push('/admin/books'), 1500)
        }
      } else {
        setError(data.message || 'Failed to save book')
        // Restore scroll position after state update
        setTimeout(() => window.scrollTo(0, scrollPosition), 0)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      // Restore scroll position after state update
      setTimeout(() => window.scrollTo(0, scrollPosition), 0)
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return (
      <AdminLayout title={isEdit ? 'Edit Book' : 'Create Book'}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isEdit ? 'Edit Book' : 'Create Book'}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {isEdit ? 'Edit Book' : 'Create Book'}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/admin/books')}
        >
          Back
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Access Type *</InputLabel>
              <Select
                value={formData.access_type}
                onChange={(e) => handleInputChange('access_type', e.target.value)}
                label="Access Type *"
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Free">Free</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Book Content Type *</InputLabel>
              <Select
                value={formData.book_content_type}
                onChange={(e) => handleInputChange('book_content_type', e.target.value)}
                label="Book Content Type *"
              >
                <MenuItem value="Book">Book</MenuItem>
                <MenuItem value="Video Atlas">Video Atlas</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Category *</InputLabel>
              <Select
                value={formData.category_id}
                onChange={(e) => handleInputChange('category_id', e.target.value)}
                label="Category *"
              >
                <MenuItem value="">Select category</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Subjects *</InputLabel>
              <Select
                multiple
                value={formData.subject_ids}
                onChange={(e) => handleInputChange('subject_ids', e.target.value)}
                label="Subjects *"
                renderValue={(selected) => {
                  const selectedNames = (selected as number[]).map(id => {
                    const subject = subjects.find(s => s.id === id)
                    return subject?.subject || ''
                  }).filter(Boolean)
                  return selectedNames.join(', ')
                }}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    <Checkbox checked={formData.subject_ids.indexOf(subject.id) > -1} />
                    {subject.subject}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Society"
              value={formData.society}
              onChange={(e) => handleInputChange('society', e.target.value)}
              placeholder="Enter society"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ISBN *"
              value={formData.isbn}
              onChange={(e) => handleInputChange('isbn', e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Book title *"
              value={formData.book_title}
              onChange={(e) => handleInputChange('book_title', e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Book Subtitle"
              value={formData.book_subtitle}
              onChange={(e) => handleInputChange('book_subtitle', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Authors"
              value={formData.authors}
              onChange={(e) => handleInputChange('authors', e.target.value)}
              placeholder="Enter authors"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="DOI"
              value={formData.doi}
              onChange={(e) => handleInputChange('doi', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Book Cover Image
            </Typography>
            <Button
              variant="outlined"
              component="label"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Browse...'}
              <input
                type="file"
                hidden
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileUpload}
              />
            </Button>
            {formData.book_cover_image && (
              <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
                Selected: {formData.book_cover_image}
              </Typography>
            )}
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              (Allowed formats: .jpg, .jpeg or .png. Recommend pixel size:[370,50])
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Edition"
              value={formData.edition}
              onChange={(e) => handleInputChange('edition', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                  />
                }
                label="Featured"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.status === 'Active'}
                    onChange={(e) =>
                      handleInputChange('status', e.target.checked ? 'Active' : 'Inactive')
                    }
                  />
                }
                label="Active"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="No Of Chapters"
              type="number"
              value={formData.no_of_chapters}
              onChange={(e) => handleInputChange('no_of_chapters', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Publishing Year *"
              type="number"
              value={formData.publishing_year}
              onChange={(e) => handleInputChange('publishing_year', e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="No Of Pages"
              type="number"
              value={formData.no_of_pages}
              onChange={(e) => handleInputChange('no_of_pages', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="No Of Volumes"
              type="number"
              value={formData.no_of_volumes}
              onChange={(e) => handleInputChange('no_of_volumes', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Book Type</InputLabel>
              <Select
                value={formData.book_type}
                onChange={(e) => handleInputChange('book_type', e.target.value)}
                label="Book Type"
              >
                <MenuItem value="">Select book type</MenuItem>
                <MenuItem value="Reference">Reference</MenuItem>
                <MenuItem value="Professional">Professional</MenuItem>
                <MenuItem value="Textbook">Textbook</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Book Bisac"
              value={formData.book_bisac}
              onChange={(e) => handleInputChange('book_bisac', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Publish Status *</InputLabel>
              <Select
                value={formData.publish_status}
                onChange={(e) => handleInputChange('publish_status', e.target.value)}
                label="Publish Status *"
              >
                <MenuItem value="Staging">Staging</MenuItem>
                <MenuItem value="Live">Live</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', e.target.value)}
                label="Rating"
              >
                <MenuItem value="">Select rating</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.download_enable}
                  onChange={(e) => handleInputChange('download_enable', e.target.checked)}
                />
              }
              label="Download Enable"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Book Overview
            </Typography>
            <RichTextEditor
              value={formData.book_overview}
              onChange={(value) => handleInputChange('book_overview', value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Supplementary Information
            </Typography>
            <RichTextEditor
              value={formData.supplementary_information}
              onChange={(value) => handleInputChange('supplementary_information', value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Created Date"
              value={new Date().toLocaleDateString()}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Updated Date"
              value={new Date().toLocaleDateString()}
              disabled
            />
          </Grid>
        </Grid>

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
              router.push('/admin/books')
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
            Book {isEdit ? 'updated' : 'created'} successfully!
          </Alert>
        )}
      </Paper>
    </AdminLayout>
  )
}

export default CreateEditBookPage
