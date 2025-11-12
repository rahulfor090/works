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
import Rating from '@mui/material/Rating'
import AddIcon from '@mui/icons-material/Add'

interface MentorRating {
  id: number | string
  mentorId: number
  mentorName: string
  rating: number
  reviewCount: number
  filledStars: number
  isActive: boolean
}

const AdminRatings = () => {
  const [ratings, setRatings] = useState<MentorRating[]>([])
  const [form, setForm] = useState({
    mentorId: 1,
    mentorName: '',
    rating: 4.5,
    reviewCount: 100,
    filledStars: 5,
    isActive: true,
  })
  const [editingId, setEditingId] = useState<number | string | null>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  })
  const [openDialog, setOpenDialog] = useState(false)

  const mentors = [
    { id: 1, name: 'Dr. Rajesh Kumar' },
    { id: 2, name: 'Dr. Priya Sharma' },
    { id: 3, name: 'Dr. Amit Patel' },
    { id: 4, name: 'Dr. Sunita Gupta' },
  ]

  const load = async () => {
    try {
      const response = await fetch('/api/admin/ratings')
      if (!response.ok) {
        throw new Error('Failed to fetch ratings')
      }
      const data = await response.json()
      setRatings(data)
    } catch (error) {
      console.error('Failed to load ratings:', error)
      setSnackbar({
        open: true,
        message: 'Failed to load ratings',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleOpenDialog = (rating?: MentorRating) => {
    if (rating) {
      setEditingId(rating.id)
      setForm({
        mentorId: rating.mentorId,
        mentorName: rating.mentorName,
        rating: rating.rating,
        reviewCount: rating.reviewCount,
        filledStars: rating.filledStars,
        isActive: rating.isActive,
      })
    } else {
      setEditingId(null)
      setForm({
        mentorId: 1,
        mentorName: mentors[0].name,
        rating: 4.5,
        reviewCount: 100,
        filledStars: 5,
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
      if (!form.mentorName) {
        setSnackbar({
          open: true,
          message: 'Please select a mentor',
          severity: 'error',
        })
        return
      }

      if (editingId) {
        const response = await fetch(`/api/admin/ratings/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })

        if (!response.ok) {
          throw new Error('Failed to update rating')
        }

        setSnackbar({
          open: true,
          message: 'Rating updated successfully',
          severity: 'success',
        })
      } else {
        const response = await fetch('/api/admin/ratings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })

        if (!response.ok) {
          throw new Error('Failed to create rating')
        }

        setSnackbar({
          open: true,
          message: 'Rating created successfully',
          severity: 'success',
        })
      }

      load()
      handleCloseDialog()
    } catch (error: any) {
      console.error('Error submitting rating:', error)
      setSnackbar({
        open: true,
        message: error.message || 'Failed to save rating',
        severity: 'error',
      })
    }
  }

  const deleteRating = async (id: number | string) => {
    if (!confirm('Are you sure you want to delete this rating?')) return

    try {
      const response = await fetch(`/api/admin/ratings/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete rating')
      }

      setSnackbar({
        open: true,
        message: 'Rating deleted successfully',
        severity: 'success',
      })
      load()
    } catch (error: any) {
      console.error('Error deleting rating:', error)
      setSnackbar({
        open: true,
        message: error.message || 'Failed to delete rating',
        severity: 'error',
      })
    }
  }

  const toggleActive = async (rating: MentorRating) => {
    try {
      const response = await fetch(`/api/admin/ratings/${rating.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...rating, isActive: !rating.isActive }),
      })

      if (!response.ok) {
        throw new Error('Failed to update rating status')
      }

      load()
    } catch (error) {
      console.error('Error toggling rating:', error)
      setSnackbar({
        open: true,
        message: 'Failed to update rating status',
        severity: 'error',
      })
    }
  }

  return (
    <AdminLayout title="Manage Ratings">
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              ⭐ Mentor Ratings Management
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
              Add Rating
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Mentor Name</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                    Rating
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                    Stars
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                    Reviews
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                    Active
                  </TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ratings.map(rating => (
                  <TableRow key={rating.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{rating.mentorName}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'inline-block', px: 2, py: 1, background: '#f5f5f5', borderRadius: 2 }}>
                        {rating.rating.toFixed(1)}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Rating value={rating.filledStars} readOnly size="small" sx={{ color: '#FFD700' }} />
                    </TableCell>
                    <TableCell align="center">{rating.reviewCount}+</TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={rating.isActive}
                        onChange={() => toggleActive(rating)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(rating)}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deleteRating(rating.id)}
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
              {editingId ? '✏️ Edit Rating' : '➕ Add New Rating'}
            </DialogTitle>
            <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                select
                label="Mentor"
                value={form.mentorId}
                onChange={e => {
                  const mentorId = parseInt(e.target.value)
                  const mentor = mentors.find(m => m.id === mentorId)
                  setForm({
                    ...form,
                    mentorId,
                    mentorName: mentor?.name || '',
                  })
                }}
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                {mentors.map(mentor => (
                  <option key={mentor.id} value={mentor.id}>
                    {mentor.name}
                  </option>
                ))}
              </TextField>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Rating: {form.rating.toFixed(1)}
                </Typography>
                <TextField
                  type="number"
                  label="Rating (0-5)"
                  value={form.rating}
                  onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) })}
                  inputProps={{ step: 0.1, min: 0, max: 5 }}
                  fullWidth
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Filled Stars: {form.filledStars}
                </Typography>
                <Rating
                  value={form.filledStars}
                  onChange={(_, value) => setForm({ ...form, filledStars: value || 0 })}
                  sx={{ color: '#FFD700' }}
                />
              </Box>

              <TextField
                type="number"
                label="Review Count"
                value={form.reviewCount}
                onChange={e => setForm({ ...form, reviewCount: parseInt(e.target.value) })}
                fullWidth
              />

              <FormControlLabel
                control={<Switch checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />}
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

export default AdminRatings
