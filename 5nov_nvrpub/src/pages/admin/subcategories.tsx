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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

type Subcategory = {
  id?: number
  name: string
  slug: string
  description: string
  categoryId: number
  sortOrder: number
}

type Category = {
  id: number
  name: string
  slug: string
}

const AdminSubcategories = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState<Subcategory>({ name: '', slug: '', description: '', categoryId: 0, sortOrder: 0 })
  const [editingId, setEditingId] = useState<number | null>(null)

  const load = async () => {
    try {
      // Import sample data for admin panel
      const { subcategoriesData, categoriesData } = await import('@/data/sampleData')
      setSubcategories(subcategoriesData)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  useEffect(() => { load() }, [])

  const submit = async () => {
    if (editingId) {
      await fetch(`/api/subcategories/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/subcategories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setForm({ name: '', slug: '', description: '', categoryId: 0, sortOrder: 0 })
    setEditingId(null)
    await load()
  }

  const edit = (subcat: Subcategory) => {
    setEditingId(subcat.id!)
    setForm({ name: subcat.name, slug: subcat.slug, description: subcat.description, categoryId: subcat.categoryId, sortOrder: subcat.sortOrder })
  }

  const remove = async (id: number) => {
    await fetch(`/api/subcategories/${id}`, { method: 'DELETE' })
    await load()
  }

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : 'Unknown'
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Manage Subcategories</Typography>

        <Paper sx={{ p: 2, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}><TextField fullWidth label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Grid>
            <Grid item xs={12} md={3}><TextField fullWidth label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={form.categoryId}
                  label="Category"
                  onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}><TextField type="number" fullWidth label="Sort Order" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Grid>
            <Grid item xs={12}><Button variant="contained" onClick={submit}>{editingId ? 'Update' : 'Create'}</Button></Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 2 }}>
          {subcategories.map((subcat) => (
            <Box key={subcat.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{subcat.name}</Typography>
                <Typography variant="body2" color="text.secondary">Category: {getCategoryName(subcat.categoryId)} | Slug: {subcat.slug} | Order: {subcat.sortOrder}</Typography>
                {subcat.description && <Typography variant="body2" color="text.secondary">{subcat.description}</Typography>}
              </Box>
              <Box>
                <IconButton onClick={() => edit(subcat)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => remove(subcat.id!)}><DeleteIcon /></IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      </Container>
    </Box>
  )
}

AdminSubcategories.getLayout = (page: React.ReactElement) => <AdminLayout title="Manage Categories">{page}</AdminLayout>

export default AdminSubcategories



