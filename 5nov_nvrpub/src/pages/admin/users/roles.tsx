import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAuth, usePermissions, hasPermission } from '@/utils/auth';

interface Role {
  role_id: number;
  role_name: string;
  role_code: string;
  status: string;
}

const RolesPage = () => {
  useAuth(); // Protect this route
  const { permissions, loading: permissionsLoading } = usePermissions();
  
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  // Check permissions for Role resource
  const canView = hasPermission(permissions, 'ROLE_ROLE', 'view') || hasPermission(permissions, 'Role', 'view');
  const canAdd = hasPermission(permissions, 'ROLE_ROLE', 'add') || hasPermission(permissions, 'Role', 'add');
  const canEdit = hasPermission(permissions, 'ROLE_ROLE', 'edit') || hasPermission(permissions, 'Role', 'edit');
  const canDelete = hasPermission(permissions, 'ROLE_ROLE', 'delete') || hasPermission(permissions, 'Role', 'delete');
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    role_name: '',
    role_code: '',
    status: 'Active',
  });

  const [editFormData, setEditFormData] = useState({
    role_id: 0,
    role_name: '',
    role_code: '',
    status: 'Active',
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/roles');
      const result = await response.json();
      
      if (result.success) {
        setRoles(result.data);
      } else {
        setError('Failed to fetch roles');
      }
    } catch (err) {
      setError('Error loading roles');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setError(null);
    setSuccess(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      role_name: '',
      role_code: '',
      status: 'Active',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenEditDialog = (role: Role) => {
    setEditingRole(role);
    setEditFormData({
      role_id: role.role_id,
      role_name: role.role_name,
      role_code: role.role_code,
      status: role.status,
    });
    setOpenEditDialog(true);
    setError(null);
    setSuccess(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingRole(null);
  };

  const handleEditSubmit = async () => {
    try {
      setError(null);
      
      if (!editFormData.role_name || !editFormData.role_code) {
        setError('Role name and role code are required');
        return;
      }

      const response = await fetch('/api/admin/roles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Role updated successfully');
        handleCloseEditDialog();
        fetchRoles();
      } else {
        setError(result.message || 'Failed to update role');
      }
    } catch (err) {
      setError('Error updating role');
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      
      if (!formData.role_name || !formData.role_code) {
        setError('Role name and role code are required');
        return;
      }

      const response = await fetch('/api/admin/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Role created successfully');
        handleCloseDialog();
        fetchRoles();
      } else {
        setError(result.message || 'Failed to create role');
      }
    } catch (err) {
      setError('Error creating role');
      console.error(err);
    }
  };

  const handleDelete = async (roleId: number) => {
    if (!confirm('Are you sure you want to delete this role?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/roles', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role_id: roleId }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Role deleted successfully');
        fetchRoles();
      } else {
        setError(result.message || 'Failed to delete role');
      }
    } catch (err) {
      setError('Error deleting role');
      console.error(err);
    }
  };

  return (
    <AdminLayout title="Roles Management">
      <Box sx={{ mb: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        {permissionsLoading || loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : !canView ? (
          <Alert severity="warning" sx={{ mt: 2 }}>
            You do not have permission to view this page. Please contact your administrator.
          </Alert>
        ) : (
          <>
            {canAdd && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                sx={{ mb: 2 }}
              >
                Create Role
              </Button>
            )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Role Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Role Code</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : roles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No roles found
                  </TableCell>
                </TableRow>
              ) : (
                roles.map((role) => (
                  <TableRow key={role.role_id} hover>
                    <TableCell>{role.role_name}</TableCell>
                    <TableCell>{role.role_code}</TableCell>
                    <TableCell>
                      <Chip
                        label={role.status === 'Active' ? 'Active' : 'Inactive'}
                        color={role.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {canEdit && (
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenEditDialog(role)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {canDelete && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(role.role_id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                      {!canEdit && !canDelete && '-'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
          </>
        )}
      </Box>

      {/* Create Role Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Role</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Role Name"
              name="role_name"
              value={formData.role_name}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Role Code"
              name="role_code"
              value={formData.role_code}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleSelectChange}
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Create Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Role Name"
              name="role_name"
              value={editFormData.role_name}
              onChange={handleEditInputChange}
              required
              fullWidth
            />
            <TextField
              label="Role Code"
              name="role_code"
              value={editFormData.role_code}
              onChange={handleEditInputChange}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={editFormData.status}
                onChange={handleEditSelectChange}
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Update Role
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default RolesPage;
