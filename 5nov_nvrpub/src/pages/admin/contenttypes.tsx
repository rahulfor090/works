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
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

type Contenttype = {
  id?: number
  title: string
  description: string
  icon: string
  displayOrder: number
  ishomepage: boolean
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

const AdminContenttypes = () => {
  const [contenttypes, setContenttypes] = useState<Contenttype[]>([])
  const [form, setForm] = useState<Contenttype>({ 
    title: '', 
    description: '', 
    icon: 'LocalLibraryIcon', 
    displayOrder: 0, 
    ishomepage: true, 
    isActive: true 
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  })

  const load = async () => {
    try {
      // Fetch from API endpoint instead of sample data
      const response = await fetch('/api/contenttypes')
      if (response.ok) {
        const data = await response.json()
        // Convert database boolean values (0/1) to JavaScript booleans
        const mappedData = data.map((ct: any) => ({
          ...ct,
          ishomepage: Boolean(ct.ishomepage),
          isActive: Boolean(ct.isActive)
        }))
        setContenttypes(mappedData)
      } else {
        throw new Error('Failed to fetch content types')
      }
    } catch (error) {
      console.error('Failed to load contenttypes:', error)
      setSnackbar({
        open: true,
        message: 'Failed to load content types',
        severity: 'error'
      })
    }
  }

  useEffect(() => { load() }, [])

  const submit = async () => {
    try {
      if (editingId) {
        // Update existing content type via API
        const response = await fetch(`/api/contenttypes/${editingId}`, {
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
            message: 'Content type updated successfully',
            severity: 'success'
          })
        } else {
          throw new Error('Failed to update content type')
        }
      } else {
        // Add new content type via API
        const response = await fetch('/api/contenttypes', {
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
            message: 'Content type created successfully',
            severity: 'success'
          })
        } else {
          throw new Error('Failed to create content type')
        }
      }
      
      setForm({ 
        title: '', 
        description: '', 
        icon: 'LocalLibraryIcon', 
        displayOrder: 0, 
        ishomepage: true, 
        isActive: true 
      })
      setEditingId(null)
    } catch (error) {
      console.error('Error saving content type:', error)
      setSnackbar({
        open: true,
        message: 'Failed to save content type',
        severity: 'error'
      })
    }
  }

  const edit = (contenttype: Contenttype) => {
    setEditingId(contenttype.id!)
    setForm({ 
      title: contenttype.title, 
      description: contenttype.description, 
      icon: contenttype.icon, 
      displayOrder: contenttype.displayOrder, 
      ishomepage: contenttype.ishomepage, 
      isActive: contenttype.isActive 
    })
  }

  const remove = async (id: number) => {
    try {
      const response = await fetch(`/api/contenttypes/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        // Reload data from server
        await load()
        setSnackbar({
          open: true,
          message: 'Content type deleted successfully',
          severity: 'success'
        })
      } else {
        throw new Error('Failed to delete content type')
      }
    } catch (error) {
      console.error('Error deleting content type:', error)
      setSnackbar({
        open: true,
        message: 'Failed to delete content type',
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
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Manage Content Types</Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editingId ? 'Edit Content Type' : 'Add New Content Type'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Title" 
                value={form.title} 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                required
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField 
                fullWidth 
                label="Icon" 
                value={form.icon} 
                onChange={(e) => setForm({ ...form, icon: e.target.value })} 
                helperText="Material-UI icon name"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField 
                type="number" 
                fullWidth 
                label="Display Order" 
                value={form.displayOrder} 
                onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                multiline
                rows={3}
                label="Description" 
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.ishomepage}
                    onChange={(e) => setForm({ ...form, ishomepage: e.target.checked })}
                  />
                }
                label="Show on Homepage"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={submit} size="large">
                {editingId ? 'Update Content Type' : 'Create Content Type'}
              </Button>
              {editingId && (
                <Button 
                  variant="outlined" 
                  onClick={() => {
                    setEditingId(null)
                    setForm({ 
                      title: '', 
                      description: '', 
                      icon: 'LocalLibraryIcon', 
                      displayOrder: 0, 
                      ishomepage: true, 
                      isActive: true 
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
          <Typography variant="h6" sx={{ mb: 2 }}>Content Types List</Typography>
          {contenttypes.length === 0 ? (
            <Typography color="text.secondary">No content types found. Create your first content type!</Typography>
          ) : (
            contenttypes.map((contenttype) => (
              <Box 
                key={contenttype.id} 
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {contenttype.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({contenttype.icon})
                    </Typography>
                    {contenttype.ishomepage && (
                      <Chip label="Homepage" size="small" color="primary" />
                    )}
                    {!contenttype.isActive && (
                      <Chip label="Inactive" size="small" color="error" />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {contenttype.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Display Order: {contenttype.displayOrder}
                    {contenttype.createdAt && (
                      <> | Created: {new Date(contenttype.createdAt).toLocaleDateString()}</>
                    )}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => edit(contenttype)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => remove(contenttype.id!)}>
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

AdminContenttypes.getLayout = (page: React.ReactElement) => <AdminLayout title="Manage Content Types" breadcrumbs={[{ label: 'Content Types' }]}>{page}</AdminLayout>

export default AdminContenttypes