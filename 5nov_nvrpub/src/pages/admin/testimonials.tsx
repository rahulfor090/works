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
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import LinkIcon from '@mui/icons-material/Link'

type Testimonial = {
  id?: number
  title: string
  content: string
  userName: string
  professional: string
  photo: string
  createdAt?: string
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [form, setForm] = useState({ 
    title: '', 
    content: '', 
    userName: '', 
    professional: '', 
    photo: '' 
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' 
  })
  const [photoInputType, setPhotoInputType] = useState<'url' | 'upload'>('url')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string>('')

  const load = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials')
      }
      const data = await response.json()
      setTestimonials(data)
    } catch (error) {
      console.error('Failed to load testimonials:', error)
      setSnackbar({
        open: true,
        message: 'Failed to load testimonials',
        severity: 'error'
      })
    }
  }

  useEffect(() => { 
    load()
  }, [])

  const submit = async () => {
    try {
      let photoUrl = form.photo

      // Handle file upload if a file is selected
      if (selectedFile && photoInputType === 'upload') {
        setUploading(true)
        const formData = new FormData()
        formData.append('photo', selectedFile)

        const uploadResponse = await fetch('/api/upload/testimonial-photo', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload photo')
        }

        const uploadResult = await uploadResponse.json()
        photoUrl = uploadResult.photoUrl
        setUploading(false)
      }

      const testimonialData = {
        ...form,
        photo: photoUrl
      }

      if (editingId) {
        // Update existing testimonial
        const response = await fetch(`/api/testimonials/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testimonialData),
        })
        
        const result = await response.json()
        
        if (!response.ok) {
          throw new Error(result.message || 'Failed to update testimonial')
        }
        
        setSnackbar({
          open: true,
          message: 'Testimonial updated successfully',
          severity: 'success'
        })
      } else {
        // Add new testimonial
        const response = await fetch('/api/testimonials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testimonialData),
        })
        
        if (!response.ok) {
          throw new Error('Failed to create testimonial')
        }
        
        setSnackbar({
          open: true,
          message: 'Testimonial created successfully',
          severity: 'success'
        })
      }
      
      // Reset form and reload data
      setForm({ 
        title: '', 
        content: '', 
        userName: '', 
        professional: '', 
        photo: '' 
      })
      setEditingId(null)
      setSelectedFile(null)
      setPhotoPreview('')
      await load() // Reload testimonials from API
    } catch (error) {
      console.error('Error saving testimonial:', error)
      setSnackbar({
        open: true,
        message: 'Failed to save testimonial',
        severity: 'error'
      })
    } finally {
      setUploading(false)
    }
  }

  const edit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id!)
    setForm({ 
      title: testimonial.title, 
      content: testimonial.content, 
      userName: testimonial.userName, 
      professional: testimonial.professional, 
      photo: testimonial.photo 
    })
    setPhotoPreview(testimonial.photo)
    setSelectedFile(null)
    setPhotoInputType('url')
  }

  const remove = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete testimonial')
      }
      
      setSnackbar({
        open: true,
        message: 'Testimonial deleted successfully',
        severity: 'success'
      })
      
      await load() // Reload testimonials from API
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      setSnackbar({
        open: true,
        message: 'Failed to delete testimonial',
        severity: 'error'
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Manage Testimonials</Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Title" 
                value={form.title} 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                required
                helperText="A brief title for the testimonial"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                multiline
                rows={4}
                label="Content" 
                value={form.content} 
                onChange={(e) => setForm({ ...form, content: e.target.value })} 
                required
                helperText="The testimonial content/review"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="User Name" 
                value={form.userName} 
                onChange={(e) => setForm({ ...form, userName: e.target.value })} 
                required
                helperText="Name of the person giving the testimonial"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Professional Title" 
                value={form.professional} 
                onChange={(e) => setForm({ ...form, professional: e.target.value })} 
                required
                helperText="Job title or profession (e.g., 'Software Engineer')"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Photo</Typography>
                <Tabs 
                  value={photoInputType} 
                  onChange={(_, newValue) => {
                    setPhotoInputType(newValue)
                    setSelectedFile(null)
                    setPhotoPreview('')
                    if (newValue === 'url') {
                      setForm({ ...form, photo: '' })
                    }
                  }}
                  sx={{ mb: 2 }}
                >
                  <Tab 
                    icon={<LinkIcon />} 
                    label="URL" 
                    value="url" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<CloudUploadIcon />} 
                    label="Upload File" 
                    value="upload" 
                    iconPosition="start"
                  />
                </Tabs>

                {photoInputType === 'url' ? (
                  <TextField 
                    fullWidth 
                    label="Photo URL" 
                    value={form.photo} 
                    onChange={(e) => {
                      setForm({ ...form, photo: e.target.value })
                      setPhotoPreview(e.target.value)
                    }}
                    required
                    helperText="Enter the URL of the person's photo"
                  />
                ) : (
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="photo-upload"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setSelectedFile(file)
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            setPhotoPreview(event.target?.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    <label htmlFor="photo-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        sx={{ mb: 1 }}
                      >
                        {selectedFile ? selectedFile.name : 'Choose Photo File'}
                      </Button>
                    </label>
                    {selectedFile && (
                      <Typography variant="body2" color="text.secondary">
                        Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </Typography>
                    )}
                  </Box>
                )}

                {/* Photo Preview */}
                {photoPreview && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Preview:</Typography>
                    <Avatar
                      src={photoPreview}
                      alt="Photo preview"
                      sx={{ width: 80, height: 80, mx: 'auto' }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                onClick={submit} 
                size="large"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : (editingId ? 'Update Testimonial' : 'Create Testimonial')}
              </Button>
              {editingId && (
                <Button 
                  variant="outlined" 
                  onClick={() => {
                    setEditingId(null)
                    setForm({ 
                      title: '', 
                      content: '', 
                      userName: '', 
                      professional: '', 
                      photo: '' 
                    })
                    setSelectedFile(null)
                    setPhotoPreview('')
                    setPhotoInputType('url')
                  }}
                  sx={{ ml: 2 }}
                  disabled={uploading}
                >
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Testimonials</Typography>
          {testimonials.length === 0 ? (
            <Typography color="text.secondary">No testimonials found. Create your first testimonial!</Typography>
          ) : (
            <Grid container spacing={3}>
              {testimonials.map((testimonial) => (
                <Grid item xs={12} md={6} key={testimonial.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                          src={testimonial.photo} 
                          alt={testimonial.userName}
                          sx={{ width: 56, height: 56, mr: 2 }}
                          onError={(e) => {
                            // Fallback to initials if photo fails to load
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        >
                          {testimonial.userName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {testimonial.userName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.professional}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {testimonial.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                        "{testimonial.content}"
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          {testimonial.createdAt && (
                            <Chip 
                              label={`Created: ${new Date(testimonial.createdAt).toLocaleDateString()}`} 
                              size="small" 
                              variant="outlined" 
                            />
                          )}
                        </Box>
                        <Box>
                          <IconButton onClick={() => edit(testimonial)} color="primary" size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => remove(testimonial.id!)} size="small">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
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

AdminTestimonials.getLayout = (page: React.ReactElement) => <AdminLayout title="Manage Testimonials" breadcrumbs={[{ label: 'Testimonials' }]}>{page}</AdminLayout>

export default AdminTestimonials