'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  ContentCopy as ContentCopyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { fetchApiAuthentication } from '@/services/apiAuthServices';
import { ApiAuthentication } from '@/types/api';

export default function ViewAuthenticationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? parseInt(params.id as string, 10) : NaN;
  
  const [loading, setLoading] = useState(true);
  const [authentication, setAuthentication] = useState<ApiAuthentication | null>(null);
  const [showToken, setShowToken] = useState(false);
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
        setAuthentication(auth);
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

  const handleCopyToken = () => {
    if (authentication?.token_value) {
      navigator.clipboard.writeText(authentication.token_value);
      setSnackbar({
        open: true,
        message: 'Token copied to clipboard',
        severity: 'success',
      });
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

  if (!authentication) {
    return null;
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
        <Typography variant="h4">API Authentication Details</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => router.push(`/api-docs/${id}/edit`)}
        >
          Edit
        </Button>
      </Box>

      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Username
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {authentication.username}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Authentication Method
            </Typography>
            <Chip
              label={authentication.auth_method}
              color={authentication.auth_method === 'IP-Based' ? 'primary' : 'default'}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Status
            </Typography>
            <Chip
              label={authentication.status}
              color={authentication.status === 'Active' ? 'success' : 'default'}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Created At
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {new Date(authentication.created_at).toLocaleString()}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Token Value
              </Typography>
              <Tooltip title={showToken ? 'Hide token' : 'Show token'}>
                <IconButton
                  size="small"
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Copy token">
                <IconButton
                  size="small"
                  onClick={handleCopyToken}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'grey.50',
                fontFamily: 'monospace',
                wordBreak: 'break-all',
                position: 'relative',
              }}
            >
              {showToken ? (
                <Typography variant="body2">{authentication.token_value}</Typography>
              ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
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

