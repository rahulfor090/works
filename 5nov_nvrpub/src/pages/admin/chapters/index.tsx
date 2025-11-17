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
  Alert
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
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

  // Debug: Log permissions
  useEffect(() => {
    if (!permissionsLoading) {
      console.log('Loaded permissions:', permissions)
      console.log('Available resources:', Object.keys(permissions))
    }
  }, [permissions, permissionsLoading])

  // Check permissions for Chapter resource (try multiple variations)
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
      fetchChapters()
    } else if (!permissionsLoading && !canView) {
      setLoading(false)
    }
  }, [permissionsLoading, canView])

  const fetchChapters = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/chapters')
      const data = await response.json()
      
      console.log('Chapters API response:', data)
      
      if (data.success) {
        // Filter out any invalid/empty entries
        const validChapters = (data.data || []).filter((chapter: any) => 
          chapter && chapter.id
        )
        console.log('Valid chapters:', validChapters)
        setChapters(validChapters)
      }
    } catch (error) {
      console.error('Error fetching chapters:', error)
    } finally {
      setLoading(false)
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
        fetchChapters()
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/admin/chapters/create')}
          >
            Create Chapter
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
      </TableContainer>
      )}
    </AdminLayout>
  )
}

export default ChaptersPage
