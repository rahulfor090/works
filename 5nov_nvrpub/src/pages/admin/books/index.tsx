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
  IconButton,
  Chip,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'
import { useAuth, usePermissions, hasPermission } from '@/utils/auth'

interface Book {
  id: number
  isbn: string
  book_title: string
  book_content_type: string
  publish_status: string
  featured: boolean
  status: string
}

const BooksPage = () => {
  useAuth() // Protect this route
  const { permissions, loading: permissionsLoading } = usePermissions()
  
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check view permission
  const canView = hasPermission(permissions, 'Book', 'view') || hasPermission(permissions, 'ROLE_BOOK', 'view')
  const canAdd = hasPermission(permissions, 'Book', 'add') || hasPermission(permissions, 'ROLE_BOOK', 'add')
  const canEdit = hasPermission(permissions, 'Book', 'edit') || hasPermission(permissions, 'ROLE_BOOK', 'edit')
  const canDelete = hasPermission(permissions, 'Book', 'delete') || hasPermission(permissions, 'ROLE_BOOK', 'delete')

  useEffect(() => {
    if (!permissionsLoading && canView) {
      fetchBooks()
    } else if (!permissionsLoading && !canView) {
      setLoading(false)
    }
  }, [permissionsLoading, canView])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/books')
      const data = await response.json()

      if (data.success) {
        setBooks(data.data)
      } else {
        setError(data.message || 'Failed to fetch books')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (bookId: number) => {
    router.push(`/admin/books/edit/${bookId}`)
  }

  const handleDelete = async (bookId: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return

    try {
      const response = await fetch(`/api/admin/books/${bookId}`, {
        method: 'DELETE'
      })
      const data = await response.json()

      if (data.success) {
        fetchBooks() // Refresh the list
      } else {
        alert(data.message || 'Failed to delete book')
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'success'
      case 'Staging':
        return 'warning'
      case 'Draft':
        return 'info'
      case 'Archived':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <AdminLayout title="Books Management">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Books
        </Typography>
        {canAdd && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push('/admin/books/create')}
            sx={{
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
              },
            }}
          >
            Create Book
          </Button>
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
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Book Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>ISBN</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Content Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Publish Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Featured</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No books found. Create your first book!
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                books.map((book) => (
                  <TableRow key={book.id} hover>
                    <TableCell>{book.book_title}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.book_content_type}</TableCell>
                    <TableCell>
                      <Chip
                        label={book.publish_status}
                        color={getStatusColor(book.publish_status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={book.featured ? 'Yes' : 'No'}
                        color={book.featured ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={book.status}
                        color={book.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {canEdit && (
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(book.id)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}
                      {canDelete && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(book.id)}
                        >
                          <DeleteIcon fontSize="small" />
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
        </TableContainer>
      )}
    </AdminLayout>
  )
}

export default BooksPage
