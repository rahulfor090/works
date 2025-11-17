import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import AddIcon from '@mui/icons-material/Add'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Divider from '@mui/material/Divider'

interface StaticPage {
  id: number
  page_for: string
  page_name: string
  page_content: string
  page_status: string
  created_at?: string
  updated_at?: string
}

const AdminStaticPages = () => {
  const [pages, setPages] = useState<StaticPage[]>([])
  const [form, setForm] = useState({
    page_for: '',
    page_name: '',
    page_content: '',
    page_status: 'Active',
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  })
  const [openDialog, setOpenDialog] = useState(false)

  const pageForOptions = ['Home', 'Journal', 'Product', 'About', 'Contact']
  const statusOptions = ['Active', 'Inactive']

  const load = async () => {
    try {
      const response = await fetch('/api/admin/static-pages')
      if (!response.ok) {
        throw new Error('Failed to fetch static pages')
      }
      const data = await response.json()
      setPages(data)
    } catch (error) {
      console.error('Failed to load static pages:', error)
      setSnackbar({
        open: true,
        message: 'Failed to load static pages',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleOpenDialog = (page?: StaticPage) => {
    if (page) {
      setEditingId(page.id)
      setForm({
        page_for: page.page_for,
        page_name: page.page_name,
        page_content: page.page_content,
        page_status: page.page_status,
      })
    } else {
      setEditingId(null)
      setForm({
        page_for: '',
        page_name: '',
        page_content: '',
        page_status: 'Active',
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingId(null)
  }

  const submit = async () => {
    try {
      if (!form.page_for || !form.page_name) {
        setSnackbar({
          open: true,
          message: 'Please fill in all required fields',
          severity: 'error',
        })
        return
      }

      if (editingId) {
        const response = await fetch(`/api/admin/static-pages/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })

        if (!response.ok) {
          throw new Error('Failed to update static page')
        }

        setSnackbar({
          open: true,
          message: 'Static page updated successfully',
          severity: 'success',
        })
      } else {
        const response = await fetch('/api/admin/static-pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })

        if (!response.ok) {
          throw new Error('Failed to create static page')
        }

        setSnackbar({
          open: true,
          message: 'Static page created successfully',
          severity: 'success',
        })
      }

      load()
      handleCloseDialog()
    } catch (error: any) {
      console.error('Error submitting static page:', error)
      setSnackbar({
        open: true,
        message: error.message || 'Failed to save static page',
        severity: 'error',
      })
    }
  }

  const deletePage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this page?')) return

    try {
      const response = await fetch(`/api/admin/static-pages/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete static page')
      }

      setSnackbar({
        open: true,
        message: 'Static page deleted successfully',
        severity: 'success',
      })
      load()
    } catch (error: any) {
      console.error('Error deleting static page:', error)
      setSnackbar({
        open: true,
        message: error.message || 'Failed to delete static page',
        severity: 'error',
      })
    }
  }

  return (
    <AdminLayout title="Manage Static Pages">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={700}>
            Static Pages Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2,
              boxShadow: '0 12px 24px rgba(37, 99, 235, 0.18)'
            }}
          >
            Create Static Page
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Page For</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Page Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Page Content</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Page Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id} hover>
                  <TableCell>{page.page_for}</TableCell>
                  <TableCell>{page.page_name}</TableCell>
                  <TableCell sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {page.page_content}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: page.page_status === 'Active' ? '#e8f5e9' : '#ffebee',
                        color: page.page_status === 'Active' ? '#2e7d32' : '#c62828',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      {page.page_status}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(page)}
                      sx={{ color: 'primary.main' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => deletePage(page.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: '0 32px 60px rgba(15, 23, 42, 0.2)'
            }
          }}
        >
          <DialogTitle sx={{ px: 4, pt: 4, pb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              {editingId ? 'Edit Static Page' : 'Add Static Page'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Provide contextual copy for the sections of the site selected below.
            </Typography>
          </DialogTitle>
          <Divider sx={{ mx: 4 }} />
          <DialogContent
            sx={{
              px: 4,
              pt: 3,
              pb: 1,
              maxHeight: 'calc(100vh - 240px)',
              overflowY: 'auto'
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Page For*</InputLabel>
                  <Select
                    label="Page For*"
                    value={form.page_for}
                    onChange={e => setForm({ ...form, page_for: e.target.value })}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Page For</em>
                    </MenuItem>
                    {pageForOptions.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Page Name*"
                  value={form.page_name}
                  onChange={e => setForm({ ...form, page_name: e.target.value })}
                  fullWidth
                  required
                  placeholder="e.g., About Us"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Page Content"
                  value={form.page_content}
                  onChange={e => setForm({ ...form, page_content: e.target.value })}
                  fullWidth
                  multiline
                  minRows={6}
                  placeholder="Enter page content"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1,
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Page Status</InputLabel>
                  <Select
                    label="Page Status"
                    value={form.page_status}
                    onChange={e => setForm({ ...form, page_status: e.target.value })}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      }
                    }}
                  >
                    {statusOptions.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 4, py: 3, gap: 1.5, backgroundColor: 'rgba(241, 245, 249, 0.6)' }}>
            <Button onClick={handleCloseDialog} color="inherit">
              Cancel
            </Button>
            <Button onClick={submit} variant="contained" sx={{ px: 3 }}>
              {editingId ? 'Update Page' : 'Create Page'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </AdminLayout>
  )
}

export default AdminStaticPages
