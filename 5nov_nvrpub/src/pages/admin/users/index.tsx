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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAuth, usePermissions, hasPermission } from '@/utils/auth';

interface User {
  user_id: number;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  role_name: string | null;
  subscription_type: string | null;
  status: string;
}

interface Role {
  role_id: number;
  role_name: string;
  role_code: string;
  status: string;
}

const UsersPage = () => {
  useAuth(); // Protect this route
  const { permissions, loading: permissionsLoading } = usePermissions();
  
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  // Check permissions for User resource
  const canView = hasPermission(permissions, 'ROLE_USER', 'view') || hasPermission(permissions, 'User', 'view');
  const canAdd = hasPermission(permissions, 'ROLE_USER', 'add') || hasPermission(permissions, 'User', 'add');
  const canEdit = hasPermission(permissions, 'ROLE_USER', 'edit') || hasPermission(permissions, 'User', 'edit');
  const canDelete = hasPermission(permissions, 'ROLE_USER', 'delete') || hasPermission(permissions, 'User', 'delete');
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    subscription_type: '',
    role_id: '',
    status: 'Active',
  });

  const [editFormData, setEditFormData] = useState({
    user_id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    subscription_type: '',
    role_id: '',
    status: 'Active',
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      const result = await response.json();
      
      if (result.success) {
        setUsers(result.data);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('Error loading users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles');
      const result = await response.json();
      
      if (result.success) {
        setRoles(result.data);
      }
    } catch (err) {
      console.error('Error loading roles:', err);
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
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      subscription_type: '',
      role_id: '',
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

  const handleOpenEditDialog = (user: User) => {
    setEditingUser(user);
    setEditFormData({
      user_id: user.user_id,
      username: user.username,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email,
      subscription_type: user.subscription_type || '',
      role_id: user.role_name || '',
      status: user.status,
    });
    setOpenEditDialog(true);
    setError(null);
    setSuccess(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingUser(null);
  };

  const handleEditSubmit = async () => {
    try {
      setError(null);
      
      if (!editFormData.username || !editFormData.email) {
        setError('Username and email are required');
        return;
      }

      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('User updated successfully');
        handleCloseEditDialog();
        fetchUsers();
      } else {
        setError(result.message || 'Failed to update user');
      }
    } catch (err) {
      setError('Error updating user');
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      
      if (!formData.username || !formData.password || !formData.email) {
        setError('Username, password, and email are required');
        return;
      }

      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('User created successfully');
        handleCloseDialog();
        fetchUsers();
      } else {
        setError(result.message || 'Failed to create user');
      }
    } catch (err) {
      setError('Error creating user');
      console.error(err);
    }
  };

  const handleDelete = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('User deleted successfully');
        fetchUsers();
      } else {
        setError(result.message || 'Failed to delete user');
      }
    } catch (err) {
      setError('Error deleting user');
      console.error(err);
    }
  };

  return (
    <AdminLayout title="Users Management">
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
                Create User
              </Button>
            )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Subscription Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.user_id} hover>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.first_name || '-'}</TableCell>
                    <TableCell>{user.last_name || '-'}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role_name || '-'}</TableCell>
                    <TableCell>{user.subscription_type || '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status === 'Active' ? 'Active' : 'Inactive'}
                        color={user.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {canEdit && (
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenEditDialog(user)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {canDelete && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(user.user_id)}
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

      {/* Create User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Subscription Type</InputLabel>
              <Select
                name="subscription_type"
                value={formData.subscription_type}
                onChange={handleSelectChange}
                label="Subscription Type"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Trial">Trial</MenuItem>
                <MenuItem value="Perpetual">Perpetual</MenuItem>
                <MenuItem value="Subscription">Subscription</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role_id"
                value={formData.role_id}
                onChange={handleSelectChange}
                label="Role"
              >
                <MenuItem value="">None</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.role_id} value={role.role_name}>
                    {role.role_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            Create User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Username"
              name="username"
              value={editFormData.username}
              onChange={handleEditInputChange}
              required
              fullWidth
            />
            <TextField
              label="First Name"
              name="first_name"
              value={editFormData.first_name}
              onChange={handleEditInputChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="last_name"
              value={editFormData.last_name}
              onChange={handleEditInputChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={editFormData.email}
              onChange={handleEditInputChange}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Subscription Type</InputLabel>
              <Select
                name="subscription_type"
                value={editFormData.subscription_type}
                onChange={handleEditSelectChange}
                label="Subscription Type"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Trial">Trial</MenuItem>
                <MenuItem value="Perpetual">Perpetual</MenuItem>
                <MenuItem value="Subscription">Subscription</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role_id"
                value={editFormData.role_id}
                onChange={handleEditSelectChange}
                label="Role"
              >
                <MenuItem value="">None</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.role_id} value={role.role_name}>
                    {role.role_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            Update User
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default UsersPage;
