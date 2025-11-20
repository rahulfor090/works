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
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Checkbox from '@mui/material/Checkbox'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

type SubjectCategory = {
  id?: number
  name: string
  slug: string
  description: string
  contentTypeId: number
  sortOrder: number
  createdAt?: string
  ishomepage?: number
  isslider?: number
}

const AdminSubjectCategories = () => {
  const [subjectCategories, setSubjectCategories] = useState<SubjectCategory[]>([])
  const [contentTypes, setContentTypes] = useState<{ id: number; title: string }[]>([])
  const [form, setForm] = useState<SubjectCategory>({ 
    name: '', 
    slug: '', 
    description: '', 
    contentTypeId: 0, 
    sortOrder: 0,
    ishomepage: 0,
    isslider: 0
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [pendingChanges, setPendingChanges] = useState<Set<number>>(new Set())
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  })

  const load = async () => {
    try {
      // Fetch from API endpoint instead of sample data
      const response = await fetch('/api/subjectcategories')
      if (response.ok) {
        const data = await response.json()
        setSubjectCategories(data)
      } else {
        throw new Error('Failed to fetch subject categories')
      }
    } catch (error) {
      console.error('Failed to load subject categories:', error)
      setSnackbar({
        open: true,
        message: 'Failed to load subject categories',
        severity: 'error'
      })
    }
  }

  const loadContentTypes = async () => {
    try {
      // Fetch content types from API endpoint
      const response = await fetch('/api/contenttypes')
      if (response.ok) {
        const data = await response.json()
        const mapped = data.map((ct: any) => ({ 
          id: ct.id, 
          title: ct.title 
        }))
        setContentTypes(mapped)
      } else {
        throw new Error('Failed to fetch content types')
      }
    } catch (error) {
      console.error('Failed to load content types:', error)
    }
  }

  useEffect(() => { 
    load()
    loadContentTypes()
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
          throw new Error('Failed to update subject category')
        }
      } else {
        // Add new subject category via API
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
            message: 'Subject category created successfully',
            severity: 'success'
          })
        } else {
          throw new Error('Failed to create subject category')
        }
      }
      
      setForm({ 
        name: '', 
        slug: '', 
        description: '', 
        contentTypeId: 0, 
        sortOrder: 0 
      })
      setEditingId(null)
    } catch (error) {
      console.error('Error saving subject category:', error)
      setSnackbar({
        open: true,
        message: 'Failed to save subject category',
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
      contentTypeId: subjectCategory.contentTypeId, 
      sortOrder: subjectCategory.sortOrder,
      ishomepage: subjectCategory.ishomepage ?? 0,
      isslider: subjectCategory.isslider ?? 0
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
          message: 'Subject category deleted successfully',
          severity: 'success'
        })
      } else {
        throw new Error('Failed to delete subject category')
      }
    } catch (error) {
      console.error('Error deleting subject category:', error)
      setSnackbar({
        open: true,
        message: 'Failed to delete subject category',
        severity: 'error'
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleHomepageToggle = async (id: number, currentValue: number) => {
    const newValue = currentValue ? 0 : 1
    
    // Optimistically update UI
    setSubjectCategories(prev => 
      prev.map(cat => cat.id === id ? { ...cat, ishomepage: newValue } : cat)
    )
    
    // Mark as pending
    setPendingChanges(prev => new Set(prev).add(id))
    
    try {
      const category = subjectCategories.find(cat => cat.id === id)
      if (!category) return

      const response = await fetch(`/api/subjectcategories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...category,
          ishomepage: newValue 
        })
      })

      if (response.ok) {
        setPendingChanges(prev => {
          const updated = new Set(prev)
          updated.delete(id)
          return updated
        })
        setSnackbar({
          open: true,
          message: `Homepage visibility ${newValue ? 'enabled' : 'disabled'} successfully`,
          severity: 'success'
        })
      } else {
        throw new Error('Failed to update')
      }
    } catch (error) {
      // Revert on error
      setSubjectCategories(prev => 
        prev.map(cat => cat.id === id ? { ...cat, ishomepage: currentValue } : cat)
      )
      setPendingChanges(prev => {
        const updated = new Set(prev)
        updated.delete(id)
        return updated
      })
      setSnackbar({
        open: true,
        message: 'Failed to update homepage visibility',
        severity: 'error'
      })
    }
  }

  const getContentTypeName = (id: number) => {
    const contentType = contentTypes.find(ct => ct.id === id)
    return contentType ? contentType.title : 'Unknown'
  }

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setForm({ ...form, name, slug })
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Manage Subject Categories</Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editingId ? 'Edit Subject Category' : 'Add New Subject Category'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Name" 
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
                helperText="URL-friendly version of the name"
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(form.ishomepage)}
                    onChange={(e) => setForm({ ...form, ishomepage: e.target.checked ? 1 : 0 })}
                  />
                }
                label="Show on Homepage"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(form.isslider)}
                    onChange={(e) => setForm({ ...form, isslider: e.target.checked ? 1 : 0 })}
                  />
                }
                label="Show in Slider"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Content Type</InputLabel>
                <Select
                  value={form.contentTypeId}
                  onChange={(e) => setForm({ ...form, contentTypeId: e.target.value as number })}
                  label="Content Type"
                >
                  <MenuItem value={0}><em>Select a content type</em></MenuItem>
                  {contentTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.title}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select the content type this category belongs to</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={submit} size="large">
                {editingId ? 'Update Subject Category' : 'Create Subject Category'}
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
                      contentTypeId: 0, 
                      sortOrder: 0,
                      ishomepage: 0,
                      isslider: 0
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
            <Typography variant="h6">Subject Categories List</Typography>
            <Typography variant="body2" color="text.secondary">
              Showing on Home: {subjectCategories.filter(cat => cat.ishomepage === 1).length}
            </Typography>
          </Box>
          {subjectCategories.length === 0 ? (
            <Typography color="text.secondary">No subject categories found. Create your first subject category!</Typography>
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
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Slug: {subjectCategory.slug} | Content Type: {getContentTypeName(subjectCategory.contentTypeId)}
                  </Typography>
                  {subjectCategory.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {subjectCategory.description}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary">
                    Sort Order: {subjectCategory.sortOrder}
                    {subjectCategory.createdAt && (
                      <> | Created: {new Date(subjectCategory.createdAt).toLocaleDateString()}</>
                    )}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                      Add to Home
                    </Typography>
                    <Checkbox
                      checked={Boolean(subjectCategory.ishomepage)}
                      onChange={() => handleHomepageToggle(subjectCategory.id!, subjectCategory.ishomepage ?? 0)}
                      disabled={pendingChanges.has(subjectCategory.id!)}
                      color="primary"
                    />
                    {pendingChanges.has(subjectCategory.id!) && (
                      <Typography variant="caption" color="warning.main" sx={{ fontSize: '0.65rem' }}>
                        Saving...
                      </Typography>
                    )}
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

AdminSubjectCategories.getLayout = (page: React.ReactElement) => <AdminLayout title="Manage Subject Categories" breadcrumbs={[{ label: 'Subject Categories' }]}>{page}</AdminLayout>

export default AdminSubjectCategories