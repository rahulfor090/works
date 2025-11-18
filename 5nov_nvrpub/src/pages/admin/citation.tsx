import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import {
  Container,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Checkbox,
  Link,
  IconButton,
  TablePagination,
  Box,
  TableFooter,
  Snackbar,
  Alert,
  Grid
} from '@mui/material'
import { Add, Edit, Delete, Close } from '@mui/icons-material'

interface Citation {
  id: number
  title: string
  url: string
  logo?: string
  isPublished: boolean
}

const AdminCitations = () => {
  const [citations, setCitations] = useState<Citation[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [currentCitation, setCurrentCitation] = useState<Partial<Citation>>({})
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    // load from API
    const load = async () => {
      try {
        const res = await fetch('/api/citations')
        if (!res.ok) throw new Error('Failed to load citations')
        const data = await res.json()
        setCitations(Array.isArray(data) ? data.map((d: any) => ({
          id: Number(d.id),
          title: d.title,
          url: d.url,
          logo: d.logo,
          isPublished: Boolean(d.isPublished)
        })) : [])
      } catch (err) {
        console.error(err)
        showSnackbar('Failed to load citations', 'error')
      }
    }

    load()
  }, [])

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity })
  }
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false })

  const filtered = citations.filter(c => {
    if (!searchTerm) return true
    return c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.url.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleOpenCreate = () => {
    setCurrentCitation({ title: '', url: '', logo: '', isPublished: true })
    setUploadFile(null)
    setEditing(false)
    setOpen(true)
  }

  const handleEdit = (c: Citation) => {
    setCurrentCitation(c)
    setUploadFile(null)
    setEditing(true)
    setOpen(true)
  }

  const handleDelete = (id: number) => {
    if (!confirm('Are you sure you want to delete this citation?')) return
    ;(async () => {
      try {
        const res = await fetch(`/api/citations/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Delete failed')
        setCitations(prev => prev.filter(p => p.id !== id))
        showSnackbar('Citation deleted successfully', 'success')
      } catch (err) {
        console.error(err)
        showSnackbar('Failed to delete citation', 'error')
      }
    })()
  }

  const handleSubmit = () => {
    ;(async () => {
      try {
        const payload = {
          title: currentCitation.title || '',
          url: currentCitation.url || '',
          logo: uploadFile ? uploadFile.name : (currentCitation.logo || ''),
          isPublished: currentCitation.isPublished ?? true
        }

        if (editing && currentCitation.id) {
          const res = await fetch(`/api/citations/${currentCitation.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          if (!res.ok) throw new Error('Update failed')
          setCitations(prev => prev.map(p => (p.id === currentCitation.id ? { ...(p as any), ...payload, id: currentCitation.id } as Citation : p)))
          showSnackbar('Citation updated successfully', 'success')
        } else {
          const res = await fetch('/api/citations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          if (!res.ok) throw new Error('Create failed')
          const data = await res.json()
          const newC: Citation = { id: Number(data.id), title: payload.title, url: payload.url, logo: payload.logo, isPublished: payload.isPublished }
          setCitations(prev => [newC, ...prev])
          showSnackbar('Citation created successfully', 'success')
        }
      } catch (err) {
        console.error(err)
        showSnackbar('Failed to save citation', 'error')
      } finally {
        setOpen(false)
        setUploadFile(null)
      }
    })()
  }

  return (
    <AdminLayout title="Citation Management" breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Citation' }] }>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="h5">Search Citation</Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate}>Create Citation</Button>
              </Box>

              <Box display="flex" gap={2} alignItems="center" mb={2}>
                <TextField size="small" placeholder="Citation Type" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Button variant="contained" onClick={() => {}}>Search</Button>
                <Button variant="outlined" onClick={() => { setSearchTerm('') }}>Clear</Button>
              </Box>

              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox"><Checkbox disabled /></TableCell>
                      <TableCell>Citation Type</TableCell>
                      <TableCell>Citation Url</TableCell>
                      <TableCell>Logo</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginated.map(c => (
                      <TableRow key={c.id} hover>
                        <TableCell padding="checkbox"><Checkbox /></TableCell>
                        <TableCell>{c.title}</TableCell>
                        <TableCell>
                          <Link href={c.url} target="_blank" rel="noopener noreferrer">{c.url}</Link>
                        </TableCell>
                        <TableCell>{c.logo ? <Link href={c.logo} target="_blank" rel="noopener noreferrer">{c.logo}</Link> : '-'}</TableCell>
                        <TableCell><Chip label={c.isPublished ? 'Active' : 'Inactive'} color={c.isPublished ? 'success' : 'default'} size="small"/></TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => handleEdit(c)}><Edit fontSize="small"/></IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(c.id)}><Delete fontSize="small"/></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                          <Typography variant="caption">Showing {paginated.length} of {filtered.length} entries</Typography>
                          <TablePagination
                            rowsPerPageOptions={[5,10,25]}
                            component="div"
                            count={filtered.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(_, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(e) => { setRowsPerPage(Number((e.target as HTMLInputElement).value)); setPage(0) }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Create / Edit Dialog (popup) */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>{editing ? 'Edit Citation' : 'Create Citation'}
            <IconButton aria-label="close" onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: '30%', bgcolor: 'grey.100' }}>Citation Type *</TableCell>
                    <TableCell>
                      <TextField fullWidth variant="standard" placeholder="Citation Name" value={currentCitation.title || ''} onChange={(e) => setCurrentCitation({...currentCitation, title: e.target.value})} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ bgcolor: 'grey.100' }}>Base Url *</TableCell>
                    <TableCell>
                      <TextField fullWidth variant="standard" placeholder="Url" value={currentCitation.url || ''} onChange={(e) => setCurrentCitation({...currentCitation, url: e.target.value})} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ bgcolor: 'grey.100' }}>Upload File</TableCell>
                    <TableCell>
                      <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
                      <div style={{ marginTop: 8, color: '#666' }}>((Allowed formats: .jpg, .jpeg or .png; ))</div>
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)} sx={{ bgcolor: '#222', color: 'white', '&:hover': { bgcolor: '#444' } }}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">{editing ? 'Update' : 'Save'}</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
        </Snackbar>

      </Container>
    </AdminLayout>
  )
}

AdminCitations.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default AdminCitations