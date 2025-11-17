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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Alert,
  CircularProgress,
  SelectChangeEvent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Save as SaveIcon, Add as AddIcon } from '@mui/icons-material';
import { useAuth, usePermissions, hasPermission } from '@/utils/auth';

interface Role {
  role_id: number;
  role_name: string;
  role_code: string;
  status: string;
}

interface Privilege {
  resource_id: number;
  resource_name: string;
  privilege_id: number | null;
  can_view: boolean;
  can_add: boolean;
  can_edit: boolean;
  can_delete: boolean;
}

const RolePrivilegesPage = () => {
  useAuth(); // Protect this route
  const { permissions, loading: permissionsLoading } = usePermissions();
  
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [privileges, setPrivileges] = useState<Privilege[]>([]);
  const [loading, setLoading] = useState(false);

  // Check permissions for Role Privileges resource
  const canView = hasPermission(permissions, 'ROLE_ROLE_PRIVILEGES', 'view') || hasPermission(permissions, 'RolePrivileges', 'view');
  const canAdd = hasPermission(permissions, 'ROLE_ROLE_PRIVILEGES', 'add') || hasPermission(permissions, 'RolePrivileges', 'add');
  const canEdit = hasPermission(permissions, 'ROLE_ROLE_PRIVILEGES', 'edit') || hasPermission(permissions, 'RolePrivileges', 'edit');
  const canDelete = hasPermission(permissions, 'ROLE_ROLE_PRIVILEGES', 'delete') || hasPermission(permissions, 'RolePrivileges', 'delete');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openResourceDialog, setOpenResourceDialog] = useState(false);
  const [newResourceName, setNewResourceName] = useState('');
  const [newResourceCode, setNewResourceCode] = useState('');
  const [newResourceStatus, setNewResourceStatus] = useState('Active');

  useEffect(() => {
    fetchRoles();
    fetchPrivileges(selectedRoleId);
  }, []);

  useEffect(() => {
    if (selectedRoleId) {
      fetchPrivileges(selectedRoleId);
    } else {
      setPrivileges([]);
    }
  }, [selectedRoleId]);

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

  const fetchPrivileges = async (roleId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/role-privileges?role_id=${roleId || ''}`);
      const result = await response.json();
      
      if (result.success) {
        setPrivileges(result.data.map((p: any) => ({
          resource_id: p.resource_id,
          resource_name: p.resource_name,
          privilege_id: p.privilege_id,
          can_view: Boolean(p.can_view),
          can_add: Boolean(p.can_add),
          can_edit: Boolean(p.can_edit),
          can_delete: Boolean(p.can_delete),
        })));
      }
    } catch (err) {
      setError('Error loading privileges');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    setSelectedRoleId(e.target.value);
    setError(null);
    setSuccess(null);
  };

  const handleCheckboxChange = (index: number, field: 'can_view' | 'can_add' | 'can_edit' | 'can_delete') => {
    const newPrivileges = [...privileges];
    newPrivileges[index] = {
      ...newPrivileges[index],
      [field]: !newPrivileges[index][field]
    };
    setPrivileges(newPrivileges);
  };

  const handleAllCheckboxChange = (index: number) => {
    const newPrivileges = [...privileges];
    const allChecked = newPrivileges[index].can_view && 
                       newPrivileges[index].can_add && 
                       newPrivileges[index].can_edit && 
                       newPrivileges[index].can_delete;
    
    newPrivileges[index].can_view = !allChecked;
    newPrivileges[index].can_add = !allChecked;
    newPrivileges[index].can_edit = !allChecked;
    newPrivileges[index].can_delete = !allChecked;
    
    setPrivileges(newPrivileges);
  };

  const handleHeaderAllChange = () => {
    const allChecked = privileges.every(p => 
      p.can_view && p.can_add && p.can_edit && p.can_delete
    );
    
    setPrivileges(privileges.map(p => ({
      ...p,
      can_view: !allChecked,
      can_add: !allChecked,
      can_edit: !allChecked,
      can_delete: !allChecked,
    })));
  };

  const handleHeaderColumnChange = (field: 'can_view' | 'can_add' | 'can_edit' | 'can_delete') => {
    const allChecked = privileges.every(p => p[field]);
    
    setPrivileges(privileges.map(p => ({
      ...p,
      [field]: !allChecked,
    })));
  };

  const handleSave = async () => {
    if (!selectedRoleId) {
      setError('Please select a role');
      return;
    }

    if (privileges.length === 0) {
      setError('Please add at least one resource');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/role-privileges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role_id: selectedRoleId,
          privileges: privileges,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Role privileges saved successfully');
        fetchPrivileges(selectedRoleId);
      } else {
        setError(result.message || 'Failed to save privileges');
      }
    } catch (err) {
      setError('Error saving privileges');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResource = () => {
    setOpenResourceDialog(true);
  };

  const handleCloseResourceDialog = () => {
    setOpenResourceDialog(false);
    setNewResourceName('');
    setNewResourceCode('');
    setNewResourceStatus('Active');
  };

  const handleSaveNewResource = async () => {
    if (!newResourceName.trim()) {
      setError('Please enter a resource name');
      return;
    }

    if (!newResourceCode.trim()) {
      setError('Please enter a resource code');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/role-privileges/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resource_name: newResourceName.trim(),
          resource_code: newResourceCode.trim(),
          status: newResourceStatus,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Resource added successfully');
        handleCloseResourceDialog();
        fetchPrivileges(selectedRoleId);
      } else {
        setError(result.message || 'Failed to add resource');
      }
    } catch (err) {
      setError('Error adding resource');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isAllChecked = (privilege: Privilege) => {
    return privilege.can_view && privilege.can_add && 
           privilege.can_edit && privilege.can_delete;
  };

  const isHeaderAllChecked = () => {
    return privileges.length > 0 && privileges.every(p => 
      p.can_view && p.can_add && p.can_edit && p.can_delete
    );
  };

  const isHeaderColumnChecked = (field: keyof Privilege) => {
    return privileges.length > 0 && privileges.every(p => p[field]);
  };

  return (
    <AdminLayout title="Role Privileges">
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

        {permissionsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : !canView ? (
          <Alert severity="warning" sx={{ mt: 2 }}>
            You do not have permission to view this page. Please contact your administrator.
          </Alert>
        ) : (
          <Paper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Create Role Privileges
            <Typography component="span" sx={{ color: 'red', fontSize: '0.8rem', ml: 1 }}>
              * Denotes required field
            </Typography>
          </Typography>

          <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel>
                Select Role <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <Select
                value={selectedRoleId}
                onChange={handleRoleChange}
                label="Select Role *"
              >
                <MenuItem value="">Select Role</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {canAdd && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddResource}
                disabled={loading}
              >
                Add Resource
              </Button>
            )}

            {canEdit && (
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={!selectedRoleId || privileges.length === 0 || loading}
                sx={{ ml: 'auto' }}
              >
                Save Privileges
              </Button>
            )}
          </Box>

          <TableContainer>
            <Table sx={{ border: '1px solid #e0e0e0' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold', border: '1px solid #e0e0e0' }}>
                      Resources
                    </TableCell>
                    <TableCell 
                      align="center" 
                      sx={{ fontWeight: 'bold', border: '1px solid #e0e0e0', cursor: 'pointer' }}
                      onClick={handleHeaderAllChange}
                    >
                      <Checkbox 
                        checked={isHeaderAllChecked()}
                        indeterminate={
                          !isHeaderAllChecked() && privileges.some(p => 
                            p.can_view || p.can_add || p.can_edit || p.can_delete
                          )
                        }
                      />
                      All
                    </TableCell>
                    <TableCell 
                      align="center" 
                      sx={{ fontWeight: 'bold', border: '1px solid #e0e0e0', cursor: 'pointer' }}
                      onClick={() => handleHeaderColumnChange('can_view')}
                    >
                      <Checkbox checked={isHeaderColumnChecked('can_view')} />
                      View
                    </TableCell>
                    <TableCell 
                      align="center" 
                      sx={{ fontWeight: 'bold', border: '1px solid #e0e0e0', cursor: 'pointer' }}
                      onClick={() => handleHeaderColumnChange('can_add')}
                    >
                      <Checkbox checked={isHeaderColumnChecked('can_add')} />
                      Add
                    </TableCell>
                    <TableCell 
                      align="center" 
                      sx={{ fontWeight: 'bold', border: '1px solid #e0e0e0', cursor: 'pointer' }}
                      onClick={() => handleHeaderColumnChange('can_edit')}
                    >
                      <Checkbox checked={isHeaderColumnChecked('can_edit')} />
                      Edit
                    </TableCell>
                    <TableCell 
                      align="center" 
                      sx={{ fontWeight: 'bold', border: '1px solid #e0e0e0', cursor: 'pointer' }}
                      onClick={() => handleHeaderColumnChange('can_delete')}
                    >
                      <Checkbox checked={isHeaderColumnChecked('can_delete')} />
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : privileges.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No resources found in the database. Please add resources first.
                      </TableCell>
                    </TableRow>
                  ) : (
                    privileges.map((privilege, index) => (
                      <TableRow key={index} hover>
                        <TableCell sx={{ border: '1px solid #e0e0e0' }}>
                          {privilege.resource_name}
                        </TableCell>
                        <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
                          <Checkbox
                            checked={isAllChecked(privilege)}
                            onChange={() => handleAllCheckboxChange(index)}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
                          <Checkbox
                            checked={privilege.can_view}
                            onChange={() => handleCheckboxChange(index, 'can_view')}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
                          <Checkbox
                            checked={privilege.can_add}
                            onChange={() => handleCheckboxChange(index, 'can_add')}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
                          <Checkbox
                            checked={privilege.can_edit}
                            onChange={() => handleCheckboxChange(index, 'can_edit')}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ border: '1px solid #e0e0e0' }}>
                          <Checkbox
                            checked={privilege.can_delete}
                            onChange={() => handleCheckboxChange(index, 'can_delete')}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

          {!selectedRoleId && (
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary', mt: 3 }}>
              Please select a role to manage privileges
            </Box>
          )}
        </Paper>
        )}
      </Box>

      {/* Add Resource Dialog */}
      <Dialog open={openResourceDialog} onClose={handleCloseResourceDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Resource</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Resource Name"
            type="text"
            fullWidth
            value={newResourceName}
            onChange={(e) => setNewResourceName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Resource Code"
            type="text"
            fullWidth
            value={newResourceCode}
            onChange={(e) => setNewResourceCode(e.target.value)}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={newResourceStatus}
              onChange={(e) => setNewResourceStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResourceDialog}>Cancel</Button>
          <Button onClick={handleSaveNewResource} variant="contained" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default RolePrivilegesPage;
