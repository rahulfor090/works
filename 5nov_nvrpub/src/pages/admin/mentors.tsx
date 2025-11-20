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

interface Mentor {
  id: number
  name: string
  speciality: string
  hospital: string
  photo_url: string
  company_logo_url: string
  description: string
  order: number
  active: boolean
  rating: number
}

const AdminMentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [form, setForm] = useState({
    name: '',
    speciality: 'Cardiology',
    hospital: '',
    photo_url: '',
    company_logo_url: '',
    description: '',
    order: 1,
    active: true,
    rating: 0,
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  })
  const [openDialog, setOpenDialog] = useState(false)

  const specialties = [
    'Cardiology',
    'Pediatrics',
    'Orthopedics',
    'Gynecology',
    'Neurology',
    'Dermatology',
    'Ophthalmology',
    'ENT',
    'Gastroenterology',
    'Urology',
  ]

  const load = async () => {
    try {
      const response = await fetch('/api/admin/mentors')
      if (!response.ok) {
        throw new Error('Failed to fetch mentors')
      }
      const data = await response.json()
      setMentors(data)
    } catch (error) {
      console.error('Failed to load mentors:', error)
      setSnackbar({
        open: true,
        message: 'Failed to load mentors',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleOpenDialog = (mentor?: Mentor) => {
    if (mentor) {
      setEditingId(mentor.id)
      setForm({
        name: mentor.name,
        speciality: mentor.speciality,
        hospital: mentor.hospital,
        photo_url: mentor.photo_url,
        company_logo_url: mentor.company_logo_url,
        description: mentor.description,
        order: mentor.order,
        active: mentor.active,
        rating: mentor.rating || 0,
      })
    } else {
      setEditingId(null)
      setForm({
        name: '',
        speciality: 'Cardiology',
        hospital: '',
        photo_url: '',
        company_logo_url: '',
        description: '',
        order: mentors.length + 1,
        active: true,
        rating: 0,
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
      if (!form.name || !form.speciality || !form.hospital) {
        setSnackbar({
          open: true,
          message: 'Please fill in all required fields',
          severity: 'error',
        })
        return
      }

      if (editingId) {
        const response = await fetch(`/api/admin/mentors/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })

        if (!response.ok) {
          throw new Error('Failed to update mentor')
        }

        setSnackbar({
          open: true,
          message: 'Mentor updated successfully',
          severity: 'success',
        })
      } else {
        const response = await fetch('/api/admin/mentors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })

        if (!response.ok) {
          throw new Error('Failed to create mentor')
        }

        setSnackbar({
          open: true,
          message: 'Mentor created successfully',
          severity: 'success',
        })
      }

      load()
      handleCloseDialog()
    } catch (error: any) {
      console.error('Error submitting mentor:', error)
      setSnackbar({
        open: true,
        message: error.message || 'Failed to save mentor',
        severity: 'error',
      })
    }
  }

  const deleteMentor = async (id: number) => {
    if (!confirm('Are you sure you want to delete this mentor?')) return

    try {
      const response = await fetch(`/api/admin/mentors/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete mentor')
      }

      setSnackbar({
        open: true,
        message: 'Mentor deleted successfully',
        severity: 'success',
      })
      load()
    } catch (error: any) {
      console.error('Error deleting mentor:', error)
      setSnackbar({
        open: true,
        message: error.message || 'Failed to delete mentor',
        severity: 'error',
      })
    }
  }

  const toggleActive = async (mentor: Mentor) => {
    try {
      const response = await fetch(`/api/admin/mentors/${mentor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mentor, active: !mentor.active }),
      })

      if (!response.ok) {
        throw new Error('Failed to update mentor status')
      }

      load()
    } catch (error) {
      console.error('Error toggling mentor:', error)
      setSnackbar({
        open: true,
        message: 'Failed to update mentor status',
        severity: 'error',
      })
    }
  }

  return (
    <AdminLayout title="Manage Mentors">
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              👨‍⚕️ Mentor Management
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
              Add Mentor
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Speciality</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Hospital</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Order</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Rating</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                    Active
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mentors.map(mentor => (
                  <TableRow key={mentor.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{mentor.name}</TableCell>
                    <TableCell>{mentor.speciality}</TableCell>
                    <TableCell>{mentor.hospital}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'inline-block', px: 2, py: 1, background: '#f5f5f5', borderRadius: 2 }}>
                        {mentor.order}
                      </Box>
                    </TableCell>
                    <TableCell>{typeof mentor.rating === 'number' && !isNaN(mentor.rating) ? mentor.rating.toFixed(1) : '-'}</TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={mentor.active}
                        onChange={() => toggleActive(mentor)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(mentor)}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deleteMentor(mentor.id)}
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

          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              {editingId ? '✏️ Edit Mentor' : '➕ Add New Mentor'}
            </DialogTitle>
            <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                fullWidth
                required
              />

              <TextField
                select
                label="Speciality / Field of Work"
                value={form.speciality}
                onChange={e => setForm({ ...form, speciality: e.target.value })}
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                {specialties.map(spec => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </TextField>

              <TextField
                label="Hospital / Institution"
                value={form.hospital}
                onChange={e => setForm({ ...form, hospital: e.target.value })}
                fullWidth
                required
              />

              <TextField
                label="Photo URL"
                value={form.photo_url}
                onChange={e => setForm({ ...form, photo_url: e.target.value })}
                fullWidth
              />

              <TextField
                label="Company Logo URL"
                value={form.company_logo_url}
                onChange={e => setForm({ ...form, company_logo_url: e.target.value })}
                fullWidth
              />

              <TextField
                label="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                fullWidth
                multiline
                rows={3}
              />

              <TextField
                type="number"
                label="Order"
                value={form.order}
                onChange={e => setForm({ ...form, order: parseInt(e.target.value) })}
                fullWidth
              />

              <TextField
                type="number"
                label="Rating (e.g. 4.9)"
                value={form.rating}
                onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) })}
                fullWidth
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                required
              />

              <FormControlLabel
                control={<Switch checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />}
                label="Active"
              />
            </DialogContent>
            <DialogActions sx={{ p: 2, gap: 1 }}>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                onClick={submit}
                variant="contained"
                sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                {editingId ? 'Update' : 'Create'}
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

export default AdminMentors
