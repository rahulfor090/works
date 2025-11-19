import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/components/layout/AdminLayout'
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { fetchApiAuthentications, deleteApiAuthentication, createApiAuthentication, updateApiAuthentication, fetchApiAuthentication } from '@/services/apiAuthServices'
import { ApiAuthentication } from '@/types/api'

const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

const WebApiPage = () => {
  const router = useRouter()
  const [rows, setRows] = useState<ApiAuthentication[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'All' | 'Active' | 'Inactive'>('All')
  const [letter, setLetter] = useState<string>('All')
  const [pageSize, setPageSize] = useState(10)
  const [bulk, setBulk] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [authToDelete, setAuthToDelete] = useState<number | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [createFormData, setCreateFormData] = useState({
    username: '',
    auth_method: 'None' as 'IP-Based' | 'None',
  })
  const [createErrors, setCreateErrors] = useState<{ [key: string]: string }>({})
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [editSaving, setEditSaving] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editFormData, setEditFormData] = useState({
    username: '',
    auth_method: 'None' as 'IP-Based' | 'None',
    status: 'Active' as 'Active' | 'Inactive',
  })
  const [editErrors, setEditErrors] = useState<{ [key: string]: string }>({})
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [viewLoading, setViewLoading] = useState(false)
  const [viewingAuth, setViewingAuth] = useState<ApiAuthentication | null>(null)
  const [showToken, setShowToken] = useState(false)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })

  const loadAuthentications = async () => {
    try {
      setLoading(true)
      const data = await fetchApiAuthentications({
        search: query || undefined,
        status: status !== 'All' ? status : undefined,
        startsWith: letter !== 'All' ? letter : undefined,
        page: 1,
        limit: 1000, // Load all for client-side filtering
      })
      setRows(data.items)
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to load API authentications',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAuthentications()
  }, [])

  const filtered = useMemo(() => {
    return rows.filter(r => {
      const matchText = query ? r.username.toLowerCase().includes(query.toLowerCase()) : true
      const matchStatus = status === 'All' ? true : r.status === status
      const matchLetter = letter === 'All' ? true : r.username.toUpperCase().startsWith(letter)
      return matchText && matchStatus && matchLetter
    })
  }, [rows, query, status, letter])

  const onSearch = () => {
    loadAuthentications()
  }

  const onClear = () => {
    setQuery('')
    setStatus('All')
    setLetter('All')
    loadAuthentications()
  }

  const handleCreate = () => {
    setCreateFormData({ username: '', auth_method: 'None' })
    setCreateErrors({})
    setCreateDialogOpen(true)
  }

  const handleCreateFormChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const name = e.target.name as string
    const value = e.target.value
    
    setCreateFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear error when user starts typing
    if (createErrors[name]) {
      setCreateErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateCreateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!createFormData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (createFormData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    setCreateErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateSubmit = async () => {
    if (!validateCreateForm()) {
      return
    }

    try {
      setCreateLoading(true)
      await createApiAuthentication({
        username: createFormData.username.trim(),
        auth_method: createFormData.auth_method,
      })
      
      setSnackbar({
        open: true,
        message: 'API authentication created successfully',
        severity: 'success',
      })
      
      setCreateDialogOpen(false)
      setCreateFormData({ username: '', auth_method: 'None' })
      loadAuthentications()
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to create API authentication'
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      })
    } finally {
      setCreateLoading(false)
    }
  }


  const handleView = async (id: number) => {
    try {
      setViewLoading(true)
      setShowToken(false)
      const auth = await fetchApiAuthentication(id)
      setViewingAuth(auth)
      setViewDialogOpen(true)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to load API authentication'
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      })
    } finally {
      setViewLoading(false)
    }
  }

  const handleCopyToken = () => {
    if (viewingAuth?.token_value) {
      navigator.clipboard.writeText(viewingAuth.token_value)
      setSnackbar({
        open: true,
        message: 'Token copied to clipboard',
        severity: 'success',
      })
    }
  }

  const handleEdit = async (id: number) => {
    try {
      setEditLoading(true)
      setEditingId(id)
      const auth = await fetchApiAuthentication(id)
      setEditFormData({
        username: auth.username,
        auth_method: auth.auth_method,
        status: auth.status,
      })
      setEditErrors({})
      setEditDialogOpen(true)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to load API authentication'
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      })
    } finally {
      setEditLoading(false)
    }
  }

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const name = e.target.name as string
    const value = e.target.value
    
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear error when user starts typing
    if (editErrors[name]) {
      setEditErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateEditForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!editFormData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (editFormData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    setEditErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEditSubmit = async () => {
    if (!editingId || !validateEditForm()) {
      return
    }

    try {
      setEditSaving(true)
      await updateApiAuthentication(editingId, {
        username: editFormData.username.trim(),
        auth_method: editFormData.auth_method,
        status: editFormData.status,
      })
      
      setSnackbar({
        open: true,
        message: 'API authentication updated successfully',
        severity: 'success',
      })
      
      setEditDialogOpen(false)
      setEditingId(null)
      setEditFormData({ username: '', auth_method: 'None', status: 'Active' })
      loadAuthentications()
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to update API authentication'
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      })
    } finally {
      setEditSaving(false)
    }
  }

  const handleDeleteClick = (id: number) => {
    setAuthToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!authToDelete) return

    try {
      await deleteApiAuthentication(authToDelete)
      setSnackbar({
        open: true,
        message: 'API authentication deleted successfully',
        severity: 'success',
      })
      loadAuthentications()
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to delete API authentication',
        severity: 'error',
      })
    } finally {
      setDeleteDialogOpen(false)
      setAuthToDelete(null)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <AdminLayout title="API Authentication" breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'WebAPI' }] }>
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Search API Authentication</Typography>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField fullWidth size="small" label="User" value={query} onChange={(e) => setQuery(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select fullWidth size="small" value={status} onChange={(e) => setStatus(e.target.value as any)}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button variant="contained" startIcon={<SearchIcon />} onClick={onSearch}>Search</Button>
                <Button variant="contained" color="inherit" startIcon={<ClearIcon />} onClick={onClear}>Clear</Button>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {alphabet.map(ch => (
              <Chip key={ch} label={ch} variant={letter === ch ? 'filled' : 'outlined'} onClick={() => setLetter(ch)} />
            ))}
            <Chip label="All" color={letter === 'All' ? 'primary' : 'default'} onClick={() => setLetter('All')} sx={{ ml: 0.5 }} />
          </Box>
        </Paper>

        <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">Bulk Action</Typography>
                <Select size="small" value={bulk} onChange={(e) => setBulk(e.target.value)} sx={{ minWidth: 160 }}>
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="activate">Activate</MenuItem>
                  <MenuItem value="deactivate">Deactivate</MenuItem>
                  <MenuItem value="delete">Delete</MenuItem>
                </Select>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">Show</Typography>
                <Select size="small" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} sx={{ minWidth: 80 }}>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
                <Typography variant="body2">entries</Typography>
              </Box>
            </Box>
            <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleCreate}>
              Create Authentication
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Auth Method</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.slice(0, pageSize).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                        No API authentications found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.slice(0, pageSize).map(row => (
                      <TableRow key={row.id} hover>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.auth_method}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            color={row.status === 'Active' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => handleView(row.id)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleEdit(row.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDeleteClick(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Showing {Math.min(filtered.length, pageSize)} of {filtered.length} entries
              </Typography>
            </>
          )}
        </Paper>
      </Container>

      {/* Create Authentication Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => !createLoading && setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create API Authentication</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={createFormData.username}
              onChange={handleCreateFormChange}
              error={!!createErrors.username}
              helperText={createErrors.username}
              required
              sx={{ mb: 3 }}
              disabled={createLoading}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Authentication Method</InputLabel>
              <Select
                name="auth_method"
                value={createFormData.auth_method}
                onChange={handleCreateFormChange}
                label="Authentication Method"
                disabled={createLoading}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="IP-Based">IP-Based</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCreateDialogOpen(false)}
            disabled={createLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateSubmit}
            variant="contained"
            disabled={createLoading}
            startIcon={createLoading ? <CircularProgress size={20} /> : <AddCircleIcon />}
          >
            {createLoading ? 'Creating...' : 'Create Authentication'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Authentication Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => !editSaving && !editLoading && setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit API Authentication</DialogTitle>
        <DialogContent>
          {editLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={editFormData.username}
                onChange={handleEditFormChange}
                error={!!editErrors.username}
                helperText={editErrors.username}
                required
                sx={{ mb: 3 }}
                disabled={editSaving}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Authentication Method</InputLabel>
                <Select
                  name="auth_method"
                  value={editFormData.auth_method}
                  onChange={handleEditFormChange}
                  label="Authentication Method"
                  disabled={editSaving}
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="IP-Based">IP-Based</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditFormChange}
                  label="Status"
                  disabled={editSaving}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditDialogOpen(false)}
            disabled={editSaving || editLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            disabled={editSaving || editLoading}
            startIcon={editSaving ? <CircularProgress size={20} /> : <EditIcon />}
          >
            {editSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Authentication Details Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => !viewLoading && setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>API Authentication Details</DialogTitle>
        <DialogContent>
          {viewLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : viewingAuth ? (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Username
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {viewingAuth.username}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Authentication Method
                  </Typography>
                  <Chip
                    label={viewingAuth.auth_method}
                    color={viewingAuth.auth_method === 'IP-Based' ? 'primary' : 'default'}
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Status
                  </Typography>
                  <Chip
                    label={viewingAuth.status}
                    color={viewingAuth.status === 'Active' ? 'success' : 'default'}
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Created At
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {new Date(viewingAuth.created_at).toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Token Value
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => setShowToken(!showToken)}
                      sx={{ ml: 1 }}
                    >
                      {showToken ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={handleCopyToken}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      bgcolor: 'grey.50',
                      fontFamily: 'monospace',
                      wordBreak: 'break-all',
                      position: 'relative',
                    }}
                  >
                    {showToken ? (
                      <Typography variant="body2">{viewingAuth.token_value}</Typography>
                    ) : (
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setViewDialogOpen(false)}
            disabled={viewLoading}
          >
            Close
          </Button>
          {viewingAuth && (
            <Button
              onClick={() => {
                setViewDialogOpen(false)
                handleEdit(viewingAuth.id)
              }}
              variant="contained"
              startIcon={<EditIcon />}
              disabled={viewLoading}
            >
              Edit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this API authentication? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  )
}

export default WebApiPage