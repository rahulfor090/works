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
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

type SubjectCategory = {
  id?: number
  name: string
  slug: string
  description: string
  sortOrder: number
  isHomepage: number
  isSlider: number
  createdAt?: string
  updatedAt?: string
}

const AdminSubjectCategories = () => {
  const [subjectCategories, setSubjectCategories] = useState<SubjectCategory[]>([])
  const [form, setForm] = useState<SubjectCategory>({ 
    name: '',
    slug: '',
    description: '',
    sortOrder: 0,
    isHomepage: 0,
    isSlider: 0
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  })

  const load = async () => {
    try {
      // Fetch from API endpoint
      const response = await fetch('/api/subjectcategories')
      if (response.ok) {
        const data = await response.json()
        setSubjectCategories(data)
      } else {
        throw new Error('Failed to fetch subjects')
      }
    } catch (error) {
      console.error('Failed to load subjects:', error)
      setSnackbar({
        open: true,
        message: 'Failed to load subjects',
        severity: 'error'
      })
    }
  }

  useEffect(() => { 
    load()
  }, [])

  const submit = async () => {
    try {
      if (editingId) {
        // Update existing subject category via API
        const response = await fetch(`/api/subjectcategories/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        })
        
        if (response.ok) {
          // Reload data from server
          await load()
          setSnackbar({
            open: true,
            message: 'Subject category updated successfully',
            severity: 'success'
          })
        } else {
          throw new Error('Failed to update subject')
        }
      } else {
        // Add new subject via API
        const response = await fetch('/api/subjectcategories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        })
        
        if (response.ok) {
          // Reload data from server
          await load()
          setSnackbar({
            open: true,
            message: 'Subject created successfully',
            severity: 'success'
          })
        } else {
          throw new Error('Failed to create subject')
        }
      }
      
      setForm({ 
        name: '',
        slug: '',
        description: '',
        sortOrder: 0,
        isHomepage: 0,
        isSlider: 0
      })
      setEditingId(null)
    } catch (error) {
      console.error('Error saving subject:', error)
      setSnackbar({
        open: true,
        message: 'Failed to save subject',
        severity: 'error'
      })
    }
  }

  const edit = (subjectCategory: SubjectCategory) => {
    setEditingId(subjectCategory.id!)
    setForm({ 
      name: subjectCategory.name,
      slug: subjectCategory.slug,
      description: subjectCategory.description,
      sortOrder: subjectCategory.sortOrder,
      isHomepage: subjectCategory.isHomepage,
      isSlider: subjectCategory.isSlider
    })
  }

  const remove = async (id: number) => {
    try {
      const response = await fetch(`/api/subjectcategories/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        // Reload data from server
        await load()
        setSnackbar({
          open: true,
          message: 'Subject deleted successfully',
          severity: 'success'
        })
      } else {
        throw new Error('Failed to delete subject')
      }
    } catch (error) {
      console.error('Error deleting subject:', error)
      setSnackbar({
        open: true,
        message: 'Failed to delete subject',
        severity: 'error'
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setForm({ ...form, name, slug })
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Manage Subjects</Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editingId ? 'Edit Subject' : 'Add New Subject'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Subject Name" 
                value={form.name} 
                onChange={(e) => handleNameChange(e.target.value)} 
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Slug" 
                value={form.slug} 
                onChange={(e) => setForm({ ...form, slug: e.target.value })} 
                helperText="URL-friendly version (auto-generated)"
                required
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField 
                fullWidth 
                multiline
                rows={3}
                label="Description" 
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField 
                type="number" 
                fullWidth 
                label="Sort Order" 
                value={form.sortOrder} 
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} 
                helperText="Lower numbers appear first"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(form.isHomepage)}
                    onChange={(e) => setForm({ ...form, isHomepage: e.target.checked ? 1 : 0 })}
                  />
                }
                label="Show on Homepage"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(form.isSlider)}
                    onChange={(e) => setForm({ ...form, isSlider: e.target.checked ? 1 : 0 })}
                  />
                }
                label="Show in Slider"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={submit} size="large">
                {editingId ? 'Update Subject' : 'Create Subject'}
              </Button>
              {editingId && (
                <Button 
                  variant="outlined" 
                  onClick={() => {
                    setEditingId(null)
                    setForm({ 
                      name: '',
                      slug: '',
                      description: '',
                      sortOrder: 0,
                      isHomepage: 0,
                      isSlider: 0
                    })
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Subjects List</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button 
                variant="outlined" 
                size="small"
                onClick={async () => {
                  try {
                    await Promise.all(
                      subjectCategories.map(cat => 
                        fetch(`/api/subjectcategories/${cat.id}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ ...cat, isHomepage: 1 })
                        })
                      )
                    )
                    await load()
                    setSnackbar({ open: true, message: 'All subjects added to homepage', severity: 'success' })
                  } catch (error) {
                    setSnackbar({ open: true, message: 'Failed to update subjects', severity: 'error' })
                  }
                }}
              >
                Check All
              </Button>
              <Button 
                variant="outlined" 
                size="small"
                onClick={async () => {
                  try {
                    await Promise.all(
                      subjectCategories.map(cat => 
                        fetch(`/api/subjectcategories/${cat.id}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ ...cat, isHomepage: 0 })
                        })
                      )
                    )
                    await load()
                    setSnackbar({ open: true, message: 'All subjects removed from homepage', severity: 'success' })
                  } catch (error) {
                    setSnackbar({ open: true, message: 'Failed to update subjects', severity: 'error' })
                  }
                }}
              >
                Uncheck All
              </Button>
              <Typography variant="body2" color="text.secondary">
                On Homepage: {subjectCategories.filter(cat => cat.isHomepage === 1).length} | 
                In Slider: {subjectCategories.filter(cat => cat.isSlider === 1).length}
              </Typography>
            </Box>
          </Box>
          {subjectCategories.length === 0 ? (
            <Typography color="text.secondary">No subjects found. Create your first subject!</Typography>
          ) : (
            subjectCategories.map((subjectCategory) => (
              <Box 
                key={subjectCategory.id} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  py: 2, 
                  borderBottom: '1px solid', 
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 'none' }
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {subjectCategory.name}
                    {subjectCategory.isHomepage === 1 && (
                      <Typography component="span" sx={{ ml: 1, px: 1, py: 0.5, bgcolor: 'primary.main', color: 'white', borderRadius: 1, fontSize: '0.7rem' }}>
                        Homepage
                      </Typography>
                    )}
                    {subjectCategory.isSlider === 1 && (
                      <Typography component="span" sx={{ ml: 1, px: 1, py: 0.5, bgcolor: 'secondary.main', color: 'white', borderRadius: 1, fontSize: '0.7rem' }}>
                        Slider
                      </Typography>
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Slug: {subjectCategory.slug} | Sort Order: {subjectCategory.sortOrder}
                  </Typography>
                  {subjectCategory.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {subjectCategory.description}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary">
                    {subjectCategory.createdAt && (
                      <>Created: {new Date(subjectCategory.createdAt).toLocaleDateString()}</>
                    )}
                    {subjectCategory.updatedAt && subjectCategory.createdAt !== subjectCategory.updatedAt && (
                      <> | Updated: {new Date(subjectCategory.updatedAt).toLocaleDateString()}</>
                    )}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Boolean(subjectCategory.isHomepage)}
                        onChange={async (e) => {
                          try {
                            const response = await fetch(`/api/subjectcategories/${subjectCategory.id}`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ 
                                ...subjectCategory, 
                                isHomepage: e.target.checked ? 1 : 0 
                              })
                            })
                            if (response.ok) {
                              await load()
                              setSnackbar({ 
                                open: true, 
                                message: e.target.checked ? 'Added to homepage' : 'Removed from homepage', 
                                severity: 'success' 
                              })
                            }
                          } catch (error) {
                            setSnackbar({ open: true, message: 'Failed to update', severity: 'error' })
                          }
                        }}
                      />
                    }
                    label="Add to Home"
                    labelPlacement="start"
                  />
                </Box>
                <Box>
                  <IconButton onClick={() => edit(subjectCategory)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => remove(subjectCategory.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))
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

AdminSubjectCategories.getLayout = (page: React.ReactElement) => <AdminLayout title="Manage Subjects" breadcrumbs={[{ label: 'Subjects' }]}>{page}</AdminLayout>

export default AdminSubjectCategories