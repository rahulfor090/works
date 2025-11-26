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
  Snackbar,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { Add, Edit, Delete, Close } from '@mui/icons-material'

interface Citation {
  id: number
  title: string
  url: string
  logo?: string
  location?: string
  page_location?: string
  isPublished: boolean
}

const alphabetFilters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const AdminCitations = () => {
  const [citations, setCitations] = useState<Citation[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [currentCitation, setCurrentCitation] = useState<Partial<Citation>>({})
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLetter, setSelectedLetter] = useState('ALL')
  const [locationFilter, setLocationFilter] = useState('ALL')
  const [bulkAction, setBulkAction] = useState('')
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
          location: d.location ?? 'header',
          page_location: d.page_location ?? 'home',
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
    const title = c.title || ''
    const url = c.url || ''
    const matchesSearch = searchTerm
      ? title.toLowerCase().includes(searchTerm.toLowerCase()) || url.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    const matchesLocation = locationFilter === 'ALL' ? true : (c.location || 'header') === locationFilter
    const matchesLetter = selectedLetter === 'ALL' ? true : title.charAt(0).toUpperCase() === selectedLetter
    return matchesSearch && matchesLocation && matchesLetter
  })

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleSearch = () => setPage(0)
  const handleClear = () => {
    setSearchTerm('')
    setSelectedLetter('ALL')
    setLocationFilter('ALL')
    setPage(0)
  }
  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter)
    setPage(0)
  }
  const handleLocationChange = (value: string) => {
    setLocationFilter(value)
    setPage(0)
  }

  const handleOpenCreate = () => {
    setCurrentCitation({ title: '', url: '', logo: '', location: 'header', page_location: 'home', isPublished: true })
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

  const handleToggleActive = (citation: Citation) => {
    ;(async () => {
      try {
        const updatedStatus = !citation.isPublished
        const res = await fetch(`/api/citations/${citation.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: citation.title,
            url: citation.url,
            logo: citation.logo || '',
            location: citation.location || 'header',
            page_location: citation.page_location || 'home',
            isPublished: updatedStatus
          })
        })
        if (!res.ok) throw new Error('Update failed')
        setCitations(prev => prev.map(c => c.id === citation.id ? { ...c, isPublished: updatedStatus } : c))
        showSnackbar(`Citation ${updatedStatus ? 'activated' : 'deactivated'} successfully`, 'success')
      } catch (err) {
        console.error(err)
        showSnackbar('Failed to update citation status', 'error')
      }
    })()
  }

  const handleSubmit = () => {
    (async () => {
      try {
        const payload = {
          title: currentCitation.title || '',
          url: currentCitation.url || '',
          logo: uploadFile ? uploadFile.name : (currentCitation.logo || ''),
          location: currentCitation.location || 'header',
          page_location: currentCitation.page_location || 'home',
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
          const newC: Citation = { id: Number(data.id), title: payload.title, url: payload.url, logo: payload.logo, location: payload.location, page_location: payload.page_location, isPublished: payload.isPublished }
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
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Citation Management
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Search Citations
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Citation"
                placeholder="User"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSearch()
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="location-filter-label">Location</InputLabel>
                <Select
                  labelId="location-filter-label"
                  value={locationFilter}
                  label="Location"
                  onChange={(e) => handleLocationChange(String(e.target.value))}
                >
                  <MenuItem value="ALL">All</MenuItem>
                  <MenuItem value="header">Header</MenuItem>
                  <MenuItem value="footer">Footer</MenuItem>
                  <MenuItem value="left">Left</MenuItem>
                  <MenuItem value="right">Right</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box display="flex" gap={1}>
                <Button fullWidth variant="contained" onClick={handleSearch}>
                  Search
                </Button>
                <Button fullWidth variant="outlined" onClick={handleClear}>
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
            <Button
              size="small"
              variant={selectedLetter === 'ALL' ? 'contained' : 'outlined'}
              onClick={() => handleLetterSelect('ALL')}
            >
              All
            </Button>
            {alphabetFilters.map(letter => (
              <Button
                key={letter}
                size="small"
                variant={selectedLetter === letter ? 'contained' : 'outlined'}
                onClick={() => handleLetterSelect(letter)}
              >
                {letter}
              </Button>
            ))}
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2
            }}
          >
            <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel id="bulk-action-label">Bulk Action</InputLabel>
                <Select
                  labelId="bulk-action-label"
                  label="Bulk Action"
                  value={bulkAction}
                  onChange={(e) => setBulkAction(String(e.target.value))}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="activate">Activate</MenuItem>
                  <MenuItem value="deactivate">Deactivate</MenuItem>
                  <MenuItem value="delete">Delete</MenuItem>
                </Select>
              </FormControl>

              <Box display="flex" alignItems="center" gap={1}>
                <FormControl size="small">
                  <InputLabel id="show-entries-label">Show</InputLabel>
                  <Select
                    labelId="show-entries-label"
                    label="Show"
                    value={rowsPerPage.toString()}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value))
                      setPage(0)
                    }}
                  >
                    {[5, 10, 25].map(count => (
                      <MenuItem key={count} value={count.toString()}>
                        {count}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="body2" color="text.secondary">
                  entries
                </Typography>
              </Box>
            </Box>

            <Button onClick={handleOpenCreate} startIcon={<Add />} variant="contained">
              Create Citation
            </Button>
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>Citation</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Page</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body2" color="text.secondary">
                        No citations match the filters.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                {paginated.map(c => (
                  <TableRow key={c.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {c.title}
                    </TableCell>
                    <TableCell>
                      <Link href={c.url} target="_blank" rel="noopener noreferrer">
                        {c.url}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{c.location || '-'}</TableCell>
                    <TableCell align="center">
                      <Chip label={c.page_location || 'home'} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={c.isPublished ? 'Active' : 'Inactive'}
                        color={c.isPublished ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => handleEdit(c)}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(c.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mt={2}>
            <Typography variant="body2" color="text.secondary">
              Showing {paginated.length} of {filtered.length} entries
            </Typography>
            <TablePagination
              component="div"
              count={filtered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(Number(e.target.value))
                setPage(0)
              }}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Box>
        </Paper>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pr: 6 }}>
          {editing ? 'Edit Citation' : 'Create Citation'}
          <IconButton aria-label="close" onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 12, top: 12 }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: '30%', fontWeight: 600 }}>
                    Citation Type *
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      placeholder="Citation Name"
                      value={currentCitation.title || ''}
                      onChange={(e) => setCurrentCitation({...currentCitation, title: e.target.value})}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Base Url *</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      placeholder="https://"
                      value={currentCitation.url || ''}
                      onChange={(e) => setCurrentCitation({...currentCitation, url: e.target.value})}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                  <TableCell>
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="location-label">Location</InputLabel>
                      <Select
                        labelId="location-label"
                        value={currentCitation.location || 'header'}
                        onChange={(e) => setCurrentCitation({...currentCitation, location: String(e.target.value)})}
                      >
                        <MenuItem value="header">Header</MenuItem>
                        <MenuItem value="footer">Footer</MenuItem>
                        <MenuItem value="left">Left</MenuItem>
                        <MenuItem value="right">Right</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Page Location</TableCell>
                  <TableCell>
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="page-location-label">Page Location</InputLabel>
                      <Select
                        labelId="page-location-label"
                        value={currentCitation.page_location || 'home'}
                        onChange={(e) => setCurrentCitation({...currentCitation, page_location: String(e.target.value)})}
                      >
                        <MenuItem value="home">Home</MenuItem>
                        <MenuItem value="inner">Inner</MenuItem>
                        <MenuItem value="both">Both</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Upload File</TableCell>
                  <TableCell>
                    <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
                    <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                      Allowed formats: .jpg, .jpeg or .png
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Active</TableCell>
                  <TableCell>
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="active-label">Status</InputLabel>
                      <Select
                        labelId="active-label"
                        value={currentCitation.isPublished ? 'active' : 'inactive'}
                        onChange={(e) => setCurrentCitation({...currentCitation, isPublished: e.target.value === 'active'})}
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1.5 }}>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            {editing ? 'Update citation' : 'Save citation'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  )
}

AdminCitations.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AdminLayout title="Citation Management" breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Citation' }]}>
      {page}
    </AdminLayout>
  )
}

export default AdminCitations