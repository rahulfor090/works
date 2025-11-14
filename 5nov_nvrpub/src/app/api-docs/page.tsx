// src/app/api-docs/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  SelectChangeEvent,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { fetchApiAuthentications, deleteApiAuthentication } from '@/services/apiAuthServices';
import { ApiAuthentication } from '@/types/api';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

export default function ApiDocsPage() {
  const router = useRouter();
  const [authentications, setAuthentications] = useState<ApiAuthentication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [startsWithFilter, setStartsWithFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [authToDelete, setAuthToDelete] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const loadAuthentications = async () => {
    try {
      setLoading(true);
      const data = await fetchApiAuthentications({
        search: searchTerm || undefined,
        status: statusFilter as 'Active' | 'Inactive' || undefined,
        startsWith: startsWithFilter || undefined,
        page,
        limit: rowsPerPage,
      });
      setAuthentications(data.items);
      setTotalItems(data.pagination.total);
    } catch (err) {
      setError('Failed to load API authentications');
      console.error('Error loading authentications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthentications();
  }, [searchTerm, statusFilter, startsWithFilter, page, rowsPerPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleStatusFilterChange = (e: SelectChangeEvent) => {
    setStatusFilter(e.target.value);
    setPage(1); // Reset to first page when changing filters
  };

  const handleStartsWithFilter = (letter: string) => {
    setStartsWithFilter(letter === startsWithFilter ? '' : letter);
    setPage(1); // Reset to first page when changing filters
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1); // Reset to first page when changing rows per page
  };

  const handleDeleteClick = (id: number) => {
    setAuthToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!authToDelete) return;

    try {
      await deleteApiAuthentication(authToDelete);
      setSnackbar({
        open: true,
        message: 'API authentication deleted successfully',
        severity: 'success',
      });
      loadAuthentications();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to delete API authentication',
        severity: 'error',
      });
    } finally {
      setDeleteDialogOpen(false);
      setAuthToDelete(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCreateNew = () => {
    router.push('/api-docs/new');
  };

  const handleEdit = (id: number) => {
    router.push(`/api-docs/${id}/edit`);
  };

  const handleView = (id: number) => {
    router.push(`/api-docs/${id}`);
  };

  // Generate A-Z alphabet for filtering
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">API Authentications</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
        >
          Create Authentication
        </Button>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Search by username"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
          sx={{ flex: 1, minWidth: 200 }}
        />

        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={startsWithFilter === letter ? 'contained' : 'outlined'}
              size="small"
              onClick={() => handleStartsWithFilter(letter)}
              sx={{ minWidth: 32, height: 32 }}
            >
              {letter}
            </Button>
          ))}
          {startsWithFilter && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => setStartsWithFilter('')}
              sx={{ minWidth: 32, height: 32 }}
            >
              <CloseIcon fontSize="small" />
            </Button>
          )}
        </Box>
      </Box>

      {/* Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Auth Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'error.main' }}>
                    {error}
                  </TableCell>
                </TableRow>
              ) : authentications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    No API authentications found
                  </TableCell>
                </TableRow>
              ) : (
                authentications.map((auth) => (
                  <TableRow key={auth.id} hover>
                    <TableCell>{auth.username}</TableCell>
                    <TableCell>{auth.auth_method}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          display: 'inline-block',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          bgcolor: auth.status === 'Active' ? 'success.light' : 'error.light',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 'medium',
                        }}
                      >
                        {auth.status}
                      </Box>
                    </TableCell>
                    <TableCell>{new Date(auth.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleView(auth.id)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleEdit(auth.id)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(auth.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Show</Typography>
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              size="small"
              sx={{ minWidth: 80 }}
            >
              {ROWS_PER_PAGE_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="body2">per page</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              disabled={page === 1}
              onClick={() => handleChangePage(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="small"
              disabled={page * rowsPerPage >= totalItems}
              onClick={() => handleChangePage(page + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this API authentication? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
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