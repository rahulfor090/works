import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'

const HiddenFileInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

type SlideButton = {
  label: string
  variant?: 'contained' | 'outlined'
  icon?: boolean
  scrollTo?: string
}

type HomepageSlide = {
  id?: number
  title: string
  highlightedWord: string
  subtitle: string
  image: string
  displayOrder: number
  buttons?: SlideButton[]
  isActive?: boolean | number
  createdAt?: string
}

const AdminHomepageSlides = (): React.ReactElement => {
  const [slides, setSlides] = useState<HomepageSlide[]>([])
  const [form, setForm] = useState<HomepageSlide>({ 
    title: '', 
    highlightedWord: '', 
    subtitle: '', 
    image: '', 
    displayOrder: 0 
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  })

  const load = async (): Promise<void> => {
    try {
      const response = await fetch('/api/slides')
      if (!response.ok) {
        throw new Error('Failed to fetch slides')
      }
      const data = await response.json()
      setSlides(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load homepage slides:', error)
      setSnackbar({
        open: true,
        message: 'Failed to load homepage slides',
        severity: 'error'
      })
    }
  }

  useEffect(() => { 
    void load()
  }, [])

  const submit = async (): Promise<void> => {
    let imagePath = form.image

    if (selectedFile) {
      try {
        const formData = new FormData()
        formData.append('file', selectedFile)

        const response = await fetch('/api/upload/slider-image', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('Failed to upload image')
        }

        const result = await response.json()
        imagePath = result.filename
      } catch (error) {
        console.error('Image upload failed:', error)
        setSnackbar({
          open: true,
          message: 'Image upload failed. Please try again.',
          severity: 'error'
        })
        return
      }
    }

    const baseButtons = editingId
      ? slides.find(slide => slide.id === editingId)?.buttons ?? []
      : []

    const payload = {
      title: form.title,
      highlightedWord: form.highlightedWord,
      subtitle: form.subtitle,
      image: imagePath,
      displayOrder: form.displayOrder || 0,
      buttons: baseButtons,
      isActive: true
    }

    try {
      if (editingId) {
        const response = await fetch(`/api/slides/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error('Failed to update slide')
        }

        setSlides(prev =>
          prev.map(slide =>
            slide.id === editingId ? { ...slide, ...payload, id: editingId } : slide
          )
        )
        setSnackbar({
          open: true,
          message: 'Homepage slide updated successfully',
          severity: 'success'
        })
      } else {
        const response = await fetch('/api/slides', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error('Failed to create slide')
        }

        const result = await response.json()
        setSlides(prev => [...prev, { ...payload, id: result.id, createdAt: new Date().toISOString() }])
        setSnackbar({
          open: true,
          message: 'Homepage slide created successfully',
          severity: 'success'
        })
      }

      setForm({ 
        title: '', 
        highlightedWord: '', 
        subtitle: '', 
        image: '', 
        displayOrder: 0 
      })
      setEditingId(null)
      setSelectedFile(null)
      setImagePreview('')
    } catch (error) {
      console.error('Error saving homepage slide:', error)
      setSnackbar({
        open: true,
        message: 'Failed to save homepage slide',
        severity: 'error'
      })
    }
  }

  const edit = (slide: HomepageSlide): void => {
    if (!slide.id) {
      return
    }
    setEditingId(slide.id)
    setForm({ 
      title: slide.title, 
      highlightedWord: slide.highlightedWord, 
      subtitle: slide.subtitle, 
      image: slide.image, 
      displayOrder: slide.displayOrder ?? 0 
    })
    setSelectedFile(null)
    setImagePreview(
      slide.image
        ? (slide.image.startsWith('http') ? slide.image : `/images/sliders/${slide.image}`)
        : ''
    )
  }

  const remove = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`/api/slides/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete slide')
      }
      setSlides(prev => prev.filter(slide => slide.id !== id))
      setSnackbar({
        open: true,
        message: 'Homepage slide deleted successfully',
        severity: 'success'
      })
    } catch (error) {
      console.error('Error deleting homepage slide:', error)
      setSnackbar({
        open: true,
        message: 'Failed to delete homepage slide',
        severity: 'error'
      })
    }
  }

  const handleCloseSnackbar = (): void => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Manage Homepage Slides</Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editingId ? 'Edit Homepage Slide' : 'Add New Homepage Slide'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Title" 
                value={form.title} 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                required
                helperText="Main title text (e.g., 'Welcome to')"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Highlighted Word" 
                value={form.highlightedWord} 
                onChange={(e) => setForm({ ...form, highlightedWord: e.target.value })} 
                required
                                        helperText="Word or phrase to highlight (e.g., 'NRV Publication')"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Subtitle" 
                value={form.subtitle} 
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })} 
                required
                helperText="Descriptive subtitle text"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Image URL" 
                value={form.image} 
                onChange={(e) => setForm({ ...form, image: e.target.value })} 
                required
                helperText="URL or path to the slide background image"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ height: '100%' }}
              >
                Upload Image
                <HiddenFileInput
                  type="file"
                  accept="image/*"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0]
                    if (file) {
                      setSelectedFile(file)
                      const reader = new FileReader()
                      reader.onloadend = () => setImagePreview(reader.result as string)
                      reader.readAsDataURL(file)
                    }
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField 
                type="number" 
                fullWidth 
                label="Display Order" 
                value={form.displayOrder} 
                onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })} 
                helperText="Display order (lower numbers first)"
              />
            </Grid>
            {imagePreview && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px dashed',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                  }}
                >
                  <Typography variant="subtitle2">Preview</Typography>
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Slide preview"
                    sx={{ width: '100%', maxHeight: 250, objectFit: 'cover', borderRadius: 1 }}
                  />
                  {selectedFile && (
                    <Typography variant="caption" color="text.secondary">
                      {selectedFile.name} • {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  )}
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button variant="contained" onClick={submit} size="large">
                {editingId ? 'Update Slide' : 'Create Slide'}
              </Button>
              {editingId && (
                <Button 
                  variant="outlined" 
                  onClick={() => {
                    setEditingId(null)
                    setForm({ 
                      title: '', 
                      highlightedWord: '', 
                      subtitle: '', 
                      image: '', 
                      displayOrder: 0 
                    })
                    setSelectedFile(null)
                    setImagePreview('')
                  }}
                  sx={{ ml: 2 }}
                >
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Homepage Slides</Typography>
          {slides.length === 0 ? (
            <Typography color="text.secondary">No homepage slides found. Create your first slide!</Typography>
          ) : (
            <Grid container spacing={3}>
              {slides
                .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                .map((slide) => (
                <Grid item xs={12} md={6} lg={4} key={slide.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        slide.image
                          ? (slide.image.startsWith('http') ? slide.image : `/images/sliders/${slide.image}`)
                          : ''
                      }
                      alt={slide.title}
                      sx={{ objectFit: 'cover' }}
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {slide.title} <span style={{ color: 'primary.main', fontWeight: 'bold' }}>{slide.highlightedWord}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {slide.subtitle}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <Chip 
                            label={`Order: ${slide.displayOrder ?? 0}`} 
                            size="small" 
                            variant="outlined" 
                          />
                          {slide.createdAt && (
                            <Chip 
                              label={`Created: ${new Date(slide.createdAt).toLocaleDateString()}`} 
                              size="small" 
                              variant="outlined" 
                            />
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <IconButton onClick={() => edit(slide)} color="primary" size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => {
                            if (slide.id) {
                              void remove(slide.id)
                            }
                          }} 
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}

AdminHomepageSlides.getLayout = (page: React.ReactElement) => <AdminLayout title="Manage Homepage Slides" breadcrumbs={[{ label: 'Homepage Slides' }]}>{page}</AdminLayout>

export default AdminHomepageSlides