import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Box, Paper, Typography, Button, Snackbar, Alert, Grid, TextField } from '@mui/material'
import ImageUploader from '@/components/common/ImageUploader'

const AdminSettings = () => {
  const [logoUrl, setLogoUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' })

  const load = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/settings/logo')
      const data = await res.json()
      setLogoUrl(data.logoUrl || '')
    } catch (e) {
      setSnackbar({ open: true, message: 'Failed to load settings', severity: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const save = async () => {
    try {
      setSaving(true)
      const res = await fetch('/api/settings/logo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logoUrl }),
      })
      if (!res.ok) throw new Error('Failed to save')
      setSnackbar({ open: true, message: 'Logo updated successfully', severity: 'success' })
    } catch (e) {
      setSnackbar({ open: true, message: 'Failed to save settings', severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout title="Settings" breadcrumbs={[{ label: 'Settings' }]}> 
      <Box sx={{ py: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Site Logo</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ImageUploader value={logoUrl} onChange={setLogoUrl} label="Logo" allowUrl={true} />
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={save} disabled={saving || loading}>Save Logo</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Preview</Typography>
              <Box sx={{ border: '1px solid', borderColor: 'divider', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120 }}>
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo preview" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                ) : (
                  <Typography variant="caption" color="text.secondary">No logo selected</Typography>
                )}
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField fullWidth label="Current Logo URL" value={logoUrl} size="small" InputProps={{ readOnly: true }} />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  )
}

export default AdminSettings

