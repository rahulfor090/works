import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

type Specialty = {
  id?: number
  name: string
  slug?: string
  description: string
  sortOrder?: number
  icon: string
  status?: string
}

const AdminSpecialties = () => {
  const [items, setItems] = useState<Specialty[]>([])
  const [form, setForm] = useState<Specialty>({ name: '', description: '', icon: '' })
  const [editingId, setEditingId] = useState<number | null>(null)

  const load = async () => {
    try {
      // Import sample data for admin panel
      const { specialtiesData } = await import('@/data/sampleData')
      setItems(specialtiesData)
    } catch (error) {
      console.error('Failed to load specialties:', error)
    }
  }

  useEffect(() => { load() }, [])

  const submit = async () => {
    if (editingId) {
      await fetch(`/api/specialties/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/specialties', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setForm({ name: '', description: '', icon: '' })
    setEditingId(null)
    await load()
  }

  const edit = (it: Specialty) => {
    setEditingId(it.id!)
    setForm({ name: it.name, description: it.description, icon: it.icon })
  }

  const remove = async (id: number) => {
    await fetch(`/api/specialties/${id}`, { method: 'DELETE' })
    await load()
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Manage Specialties</Typography>

        <Paper sx={{ p: 2, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}><TextField fullWidth label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Grid>
            <Grid item xs={12} md={2}><TextField fullWidth label="Icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></Grid>
            <Grid item xs={12}><Button variant="contained" onClick={submit}>{editingId ? 'Update' : 'Create'}</Button></Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 2 }}>
          {items.map((it) => (
            <Box key={it.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{it.name}</Typography>
                <Typography variant="body2" color="text.secondary">{it.description}</Typography>
              </Box>
              <Box>
                <IconButton onClick={() => edit(it)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => remove(it.id!)}><DeleteIcon /></IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      </Container>
    </Box>
  )
}

AdminSpecialties.getLayout = (page: React.ReactElement) => <AdminLayout title="Manage Specialties">{page}</AdminLayout>

export default AdminSpecialties


