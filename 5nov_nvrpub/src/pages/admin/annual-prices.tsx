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
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import AddIcon from '@mui/icons-material/Add'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

interface AnnualPrice {
  id: number
  code: string
  title: string
  description: string
  category: string
  type: string
  journal: string
  format: string
  region: string
  currency: string
  price: number
  discountPrice?: number
  isActive: boolean
  createdAt?: string
}

const AdminAnnualPrices = () => {
  const [prices, setPrices] = useState<AnnualPrice[]>([])
  const [form, setForm] = useState({
    code: '',
    title: '',
    description: '',
    category: 'Individual',
    type: '',
    journal: '',
    format: '',
    region: 'India',
    currency: 'INR',
    price: 0,
    discountPrice: 0,
    isActive: true,
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  })
  const [openDialog, setOpenDialog] = useState(false)

  const categories = ['Individual', 'Institution']
  const types = ['Pay per view', 'Period based',]
  const journals = ['All Journals', 'Journal A', 'Journal B', 'Journal C', 'Journal D']
  const formats = ['Print', 'Digital + Print', 'Digital',]
  const regions = ['India', 'International', 'Asia', 'Europe', 'America']
  const currencies = ['INR', 'USD', 'EUR', 'GBP', 'AUD']

  const load = async () => {
    try {
      const response = await fetch('/api/admin/annual-prices')
      if (!response.ok) {
        throw new Error('Failed to fetch annual prices')
      }
      const data = await response.json()
      setPrices(data)
    } catch (error) {
      console.error('Failed to load annual prices:', error)
      setSnackbar({
        open: true,
        message: 'Failed to load annual prices',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleOpenDialog = (price?: AnnualPrice) => {
    if (price) {
      setEditingId(price.id)
      setForm({
        code: price.code,
        title: price.title,
        description: price.description,
        category: price.category,
        type: price.type,
        journal: price.journal,
        format: price.format,
        region: price.region,
        currency: price.currency,
        price: price.price,
        discountPrice: price.discountPrice || 0,
        isActive: price.isActive,
      })
    } else {
      setEditingId(null)
      setForm({
        code: '',
        title: '',
        description: '',
        category: 'Individual',
        type: '',
        journal: '',
        format: '',
        region: 'India',
        currency: 'INR',
        price: 0,
        discountPrice: 0,
        isActive: true,
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
      if (!form.code || !form.title || !form.category || !form.type || !form.journal || !form.format) {
        setSnackbar({
          open: true,
          message: 'Please fill in all required fields',
          severity: 'error',
        })
        return
      }

      if (editingId) {
        const response = await fetch(`/api/admin/annual-prices/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })

        if (!response.ok) {
          throw new Error('Failed to update annual price')
        }

        setSnackbar({
          open: true,
          message: 'Annual Price updated successfully',
          severity: 'success',
        })
      } else {
        const response = await fetch('/api/admin/annual-prices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })

        if (!response.ok) {
          throw new Error('Failed to create annual price')
        }

        setSnackbar({
          open: true,
          message: 'Annual Price created successfully',
          severity: 'success',
        })
      }

      load()
      handleCloseDialog()
    } catch (error: any) {
      console.error('Error submitting annual price:', error)
      setSnackbar({
        open: true,
        message: error.message || 'Failed to save annual price',
        severity: 'error',
      })
    }
  }

  const deletePrice = async (id: number) => {
    if (!confirm('Are you sure you want to delete this annual price?')) return

    try {
      const response = await fetch(`/api/admin/annual-prices/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete annual price')
      }

      setSnackbar({
        open: true,
        message: 'Annual Price deleted successfully',
        severity: 'success',
      })
      load()
    } catch (error: any) {
      console.error('Error deleting annual price:', error)
      setSnackbar({
        open: true,
        message: error.message || 'Failed to delete annual price',
        severity: 'error',
      })
    }
  }

  const toggleActive = async (price: AnnualPrice) => {
    try {
      const response = await fetch(`/api/admin/annual-prices/${price.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...price, isActive: !price.isActive }),
      })

      if (!response.ok) {
        throw new Error('Failed to update annual price status')
      }

      load()
    } catch (error) {
      console.error('Error toggling annual price:', error)
      setSnackbar({
        open: true,
        message: 'Failed to update annual price status',
        severity: 'error',
      })
    }
  }

  return (
    <AdminLayout title="Manage Annual Prices">
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              💰 Annual Prices Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)' },
              }}
            >
              Add Annual Price
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Code</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Title</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Category</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Price</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Region</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                    Active
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prices.map(price => (
                  <TableRow key={price.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{price.code}</TableCell>
                    <TableCell>{price.title}</TableCell>
                    <TableCell>{price.category}</TableCell>
                    <TableCell>{price.type}</TableCell>
                    <TableCell>
                      <Box sx={{ fontWeight: 600 }}>
                        {price.currency} {price.price}
                        {price.discountPrice && <Box sx={{ fontSize: '0.85rem', color: 'green' }}>💚 {price.currency} {price.discountPrice}</Box>}
                      </Box>
                    </TableCell>
                    <TableCell>{price.region}</TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={price.isActive}
                        onChange={() => toggleActive(price)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(price)}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deletePrice(price.id)}
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
                borderRadius: 2,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              }
            }}
          >
            <DialogTitle 
              sx={{ 
                fontWeight: 700, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white',
                fontSize: '1.25rem',
                py: 2,
                pb: 3,
              }}
            >
              {editingId ? '✏️ Edit Annual Price' : '➕ Add New Annual Price'}
            </DialogTitle>
            <DialogContent 
              sx={{ 
                pt: 3, 
                pb: 3,
                px: 4,
                display: 'flex',
                flexDirection: 'column',
                maxHeight: 'calc(100vh - 200px)',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '10px',
                  '&:hover': {
                    background: '#555',
                  },
                },
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Annual Price Code*"
                    value={form.code}
                    onChange={e => setForm({ ...form, code: e.target.value })}
                    fullWidth
                    required
                    placeholder="e.g., AP001"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Annual Price Title*"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    fullWidth
                    required
                    placeholder="e.g., Individual Annual Subscription"
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
                    label="Description"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Enter detailed description"
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
                    <InputLabel>Annual Price Category*</InputLabel>
                    <Select
                      label="Annual Price Category*"
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                        }
                      }}
                    >
                      {categories.map(cat => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Annual Price Type*</InputLabel>
                    <Select
                      label="Annual Price Type*"
                      value={form.type}
                      onChange={e => setForm({ ...form, type: e.target.value })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                        }
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Annual Price Type</em>
                      </MenuItem>
                      {types.map(t => (
                        <MenuItem key={t} value={t}>
                          {t}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Journal*</InputLabel>
                    <Select
                      label="Journal*"
                      value={form.journal}
                      onChange={e => setForm({ ...form, journal: e.target.value })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                        }
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Journal</em>
                      </MenuItem>
                      {journals.map(j => (
                        <MenuItem key={j} value={j}>
                          {j}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Format*</InputLabel>
                    <Select
                      label="Format*"
                      value={form.format}
                      onChange={e => setForm({ ...form, format: e.target.value })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                        }
                      }}
                    >
                      <MenuItem value="">
                        <em>None selected</em>
                      </MenuItem>
                      {formats.map(f => (
                        <MenuItem key={f} value={f}>
                          {f}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Region</InputLabel>
                    <Select
                      label="Region"
                      value={form.region}
                      onChange={e => setForm({ ...form, region: e.target.value })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                        }
                      }}
                    >
                      {regions.map(r => (
                        <MenuItem key={r} value={r}>
                          {r}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Currency</InputLabel>
                    <Select
                      label="Currency"
                      value={form.currency}
                      onChange={e => setForm({ ...form, currency: e.target.value })}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                        }
                      }}
                    >
                      {currencies.map(c => (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    type="number"
                    label="Price"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })}
                    fullWidth
                    inputProps={{ step: '0.01' }}
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    label="Discount Price (Optional)"
                    value={form.discountPrice}
                    onChange={e => setForm({ ...form, discountPrice: parseFloat(e.target.value) })}
                    fullWidth
                    inputProps={{ step: '0.01' }}
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <FormControlLabel
                      control={<Switch checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />}
                      label="Active"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 2, borderTop: '1px solid #e0e0e0' }}>
              <Button 
                onClick={handleCloseDialog}
                sx={{ color: 'text.secondary' }}
              >
                Cancel
              </Button>
              <Button
                onClick={submit}
                variant="contained"
                sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  px: 3,
                }}
              >
                {editingId ? 'Update Price' : 'Create Price'}
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </AdminLayout>
  )
}

export default AdminAnnualPrices
