'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { fetchApiAuthentication, updateApiAuthentication } from '@/services/apiAuthServices';

export default function EditAuthenticationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string, 10) : NaN;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    auth_method: 'None' as 'IP-Based' | 'None',
    status: 'Active' as 'Active' | 'Inactive',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const loadAuthentication = async () => {
      if (isNaN(id)) {
        setSnackbar({
          open: true,
          message: 'Invalid authentication ID',
          severity: 'error',
        });
        router.push('/api-docs');
        return;
      }

      try {
        setLoading(true);
        const auth = await fetchApiAuthentication(id);
        setFormData({
          username: auth.username,
          auth_method: auth.auth_method,
          status: auth.status,
        });
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || err.message || 'Failed to load API authentication';
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: 'error',
        });
        router.push('/api-docs');
      } finally {
        setLoading(false);
      }
    };

    loadAuthentication();
  }, [id, router]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as string;
    const value = e.target.value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const name = e.target.name as string;
    const value = e.target.value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      await updateApiAuthentication(id, {
        username: formData.username.trim(),
        auth_method: formData.auth_method,
        status: formData.status,
      });
      
      setSnackbar({
        open: true,
        message: 'API authentication updated successfully',
        severity: 'success',
      });
      
      // Redirect to list page after a short delay
      setTimeout(() => {
        router.push('/api-docs');
      }, 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to update API authentication';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/api-docs')}
        >
          Back
        </Button>
        <Typography variant="h4">Edit API Authentication</Typography>
      </Box>

      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleTextFieldChange}
            error={!!errors.username}
            helperText={errors.username}
            required
            sx={{ mb: 3 }}
            disabled={saving}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Authentication Method</InputLabel>
            <Select
              name="auth_method"
              value={formData.auth_method}
              onChange={handleSelectChange}
              label="Authentication Method"
              disabled={saving}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="IP-Based">IP-Based</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleSelectChange}
              label="Status"
              disabled={saving}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => router.push('/api-docs')}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

