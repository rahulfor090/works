import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  TablePagination
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SyncIcon from '@mui/icons-material/Sync'
import { useRouter } from 'next/router'
import { useAuth, usePermissions, hasPermission } from '@/utils/auth'

interface Chapter {
  id: number
  book_id: number
  book_title: string
  book_isbn: string
  chapter_number: string
  sequence_number: number
  chapter_title: string
  status: string
}

const ChaptersPage = () => {
  useAuth() // Protect this route
  const { permissions, loading: permissionsLoading } = usePermissions()

  const router = useRouter()
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [syncing, setSyncing] = useState(false)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' }>({
    open: false,
    message: '',
    severity: 'info'
  })

  // Check permissions for Chapter resource
  const canView = hasPermission(permissions, 'ROLE_BOOK_CHAPTER', 'view') ||
    hasPermission(permissions, 'Chapter', 'view') ||
    hasPermission(permissions, 'ROLE_CHAPTER', 'view') ||
    hasPermission(permissions, 'Chapters', 'view') ||
    hasPermission(permissions, 'chapters', 'view')
  const canAdd = hasPermission(permissions, 'ROLE_BOOK_CHAPTER', 'add') ||
    hasPermission(permissions, 'Chapter', 'add') ||
    hasPermission(permissions, 'ROLE_CHAPTER', 'add') ||
    hasPermission(permissions, 'Chapters', 'add') ||
    hasPermission(permissions, 'chapters', 'add')
  const canEdit = hasPermission(permissions, 'ROLE_BOOK_CHAPTER', 'edit') ||
    hasPermission(permissions, 'Chapter', 'edit') ||
    hasPermission(permissions, 'ROLE_CHAPTER', 'edit') ||
    hasPermission(permissions, 'Chapters', 'edit') ||
    hasPermission(permissions, 'chapters', 'edit')
  const canDelete = hasPermission(permissions, 'ROLE_BOOK_CHAPTER', 'delete') ||
    hasPermission(permissions, 'Chapter', 'delete') ||
    hasPermission(permissions, 'ROLE_CHAPTER', 'delete') ||
    hasPermission(permissions, 'Chapters', 'delete') ||
    hasPermission(permissions, 'chapters', 'delete')

  useEffect(() => {
    if (!permissionsLoading && canView) {
      fetchChapters(page, rowsPerPage)
    } else if (!permissionsLoading && !canView) {
      setLoading(false)
    }
  }, [permissionsLoading, canView, page, rowsPerPage])

  const fetchChapters = async (pageNo: number, limit: number) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/chapters?page=${pageNo + 1}&limit=${limit}`)
      const data = await response.json()

      if (data.success) {
        // Filter out any invalid/empty entries
        const validChapters = (data.data || []).filter((chapter: any) =>
          chapter && chapter.id
        )
        setChapters(validChapters)
        setTotalCount(data.pagination?.total || 0)
      }
    } catch (error) {
      console.error('Error fetching chapters:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSync = async () => {
    try {
      setSyncing(true)
      const response = await fetch('/api/admin/chapters/sync')
      const data = await response.json()

      if (data.success) {
        const stats = data.stats
        setSnackbar({
          open: true,
          message: `Sync complete: ${stats.added} added, ${stats.updated} updated.`,
          severity: 'success'
        })
        fetchChapters(page, rowsPerPage)
      } else {
        setSnackbar({
          open: true,
          message: data.message || 'Sync failed',
          severity: 'error'
        })
      }
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err.message || 'Sync error',
        severity: 'error'
      })
    } finally {
      setSyncing(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this chapter?')) return

    try {
      const response = await fetch(`/api/admin/chapters/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()

      if (data.success) {
        fetchChapters(page, rowsPerPage)
      } else {
        alert(data.message || 'Failed to delete chapter')
      }
    } catch (error) {
      console.error('Error deleting chapter:', error)
      alert('An error occurred')
    }
  }

  return (
    <AdminLayout title="Chapters">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Chapters
        </Typography>
        {canAdd && (
          <Box>
            <Button
              variant="outlined"
              startIcon={syncing ? <CircularProgress size={20} /> : <SyncIcon />}
              onClick={handleSync}
              disabled={syncing}
              sx={{ mr: 2 }}
            >
              {syncing ? 'Syncing...' : 'Sync Chapters'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/admin/chapters/create')}
            >
              Create Chapter
            </Button>
          </Box>
        )}
      </Box>

      {permissionsLoading || loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : !canView ? (
        <Alert severity="warning" sx={{ mt: 2 }}>
          You do not have permission to view this page. Please contact your administrator.
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Chapter Title (Book Name)</strong></TableCell>
                <TableCell><strong>Chapter No (Sequence No.)</strong></TableCell>
                <TableCell><strong>Book Isbn</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chapters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No chapters found
                  </TableCell>
                </TableRow>
              ) : (
                chapters.map((chapter) => (
                  <TableRow key={chapter.id}>
                    <TableCell>
                      {chapter.chapter_title}
                      <br />
                      <Typography variant="caption" color="textSecondary">
                        ({chapter.book_title})
                      </Typography>
                    </TableCell>
                    <TableCell>{chapter.sequence_number || chapter.chapter_number}</TableCell>
                    <TableCell>{chapter.book_isbn}</TableCell>
                    <TableCell>
                      <Chip
                        label={chapter.status}
                        color={chapter.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {canEdit && (
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => router.push(`/admin/chapters/edit/${chapter.id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {canDelete && (
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDelete(chapter.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                      {!canEdit && !canDelete && (
                        <Typography variant="caption" color="text.secondary">
                          No actions
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  )
}

export default ChaptersPage
