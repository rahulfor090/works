import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControlLabel,
  Switch,
  Stack,
  Alert,
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

interface MenuItem {
  id: string
  label: string
  path: string
  isActive: boolean
  order: number
}

interface AlertState {
  type: 'success' | 'error' | 'warning'
  message: string
}

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    label: '',
    path: '',
    isActive: true,
  })
  const [alert, setAlert] = useState<AlertState | null>(null)

  const showAlert = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setAlert({ message, type })
    setTimeout(() => setAlert(null), 4000)
  }

  // Load menu items
  useEffect(() => {
    loadMenuItems()
  }, [])

  const loadMenuItems = async () => {
    try {
      const response = await fetch('/api/admin/menus')
      if (response.ok) {
        const data = await response.json()
        setMenuItems(data)
      } else {
        // Fallback to default navigation
        const defaultItems: MenuItem[] = [
          { id: '1', label: 'Books', path: '/contenttypes/books', isActive: true, order: 1 },
          { id: '2', label: 'Videos', path: '/contenttypes/videos', isActive: true, order: 2 },
          { id: '3', label: 'Journals', path: '/contenttypes/journals', isActive: true, order: 3 },
          { id: '4', label: 'Cases', path: '/contenttypes/cases', isActive: true, order: 4 },
          { id: '5', label: 'MCQs', path: '/contenttypes/mcqs', isActive: true, order: 5 },
          { id: '6', label: 'Reviews', path: '/contenttypes/reviews', isActive: true, order: 6 },
        ]
        setMenuItems(defaultItems)
      }
    } catch (error) {
      console.error('Failed to load menu items:', error)
      showAlert('Failed to load menu items', 'error')
    }
  }

  const handleOpenDialog = (item?: MenuItem) => {
    if (item) {
      setEditingId(item.id)
      setFormData({
        label: item.label,
        path: item.path,
        isActive: item.isActive,
      })
    } else {
      setEditingId(null)
      setFormData({
        label: '',
        path: '',
        isActive: true,
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingId(null)
    setFormData({
      label: '',
      path: '',
      isActive: true,
    })
  }

  const handleSave = async () => {
    if (!formData.label.trim() || !formData.path.trim()) {
      showAlert('Please fill in all fields', 'warning')
      return
    }

    try {
      const url = editingId ? `/api/admin/menus/${editingId}` : '/api/admin/menus'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await loadMenuItems()
        handleCloseDialog()
        showAlert(editingId ? 'Menu item updated' : 'Menu item added', 'success')
      } else {
        showAlert('Failed to save menu item', 'error')
      }
    } catch (error) {
      console.error('Failed to save menu item:', error)
      showAlert('Error saving menu item', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return

    try {
      const response = await fetch(`/api/admin/menus/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await loadMenuItems()
        showAlert('Menu item deleted', 'success')
      } else {
        showAlert('Failed to delete menu item', 'error')
      }
    } catch (error) {
      console.error('Failed to delete menu item:', error)
      showAlert('Error deleting menu item', 'error')
    }
  }

  const handleToggleActive = async (item: MenuItem) => {
    try {
      const response = await fetch(`/api/admin/menus/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          isActive: !item.isActive,
        }),
      })

      if (response.ok) {
        await loadMenuItems()
        showAlert(item.isActive ? 'Menu item disabled' : 'Menu item enabled', 'success')
      }
    } catch (error) {
      console.error('Failed to toggle menu item:', error)
      showAlert('Error updating menu item', 'error')
    }
  }

  return (
    <AdminLayout title="Menu Management">
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          {alert && (
            <Alert
              severity={alert.type}
              onClose={() => setAlert(null)}
              sx={{ mb: 3 }}
            >
              {alert.message}
            </Alert>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Menu Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                },
              }}
            >
              Add Menu Item
            </Button>
          </Box>

          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Manage the top navigation menu items. Edit names, paths, and visibility without modifying code.
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Order</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Label</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Path</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">
                    Active
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography color="textSecondary">No menu items found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  menuItems.map((item, index) => (
                    <TableRow key={item.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{item.label}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{item.path}</TableCell>
                      <TableCell align="center">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={item.isActive}
                              onChange={() => handleToggleActive(item)}
                              size="small"
                            />
                          }
                          label=""
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(item)}
                            title="Edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(item.id)}
                            title="Delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* Edit/Add Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Label"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            placeholder="e.g., Books"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Path"
            value={formData.path}
            onChange={(e) => setFormData({ ...formData, path: e.target.value })}
            placeholder="e.g., /contenttypes/books"
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
            }
            label="Active"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  )
}

export default MenuManagement
