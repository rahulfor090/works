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
import { Content } from '@/interfaces/content'

const AdminCourses = () => {
  const [courses, setCourses] = useState<Content[]>([])
  const [categories, setCategories] = useState<{ id: number; name: string; slug: string }[]>([])
  const [subcategories, setSubcategories] = useState<{ id: number; name: string; slug: string; categoryId: number }[]>([])
  const [form, setForm] = useState<Partial<Content>>({ title: '', coverImage: '', rating: 0, ratingCount: 0, contenttype: '', subjectcategory: '' })
  const [editingId, setEditingId] = useState<number | null>(null)

  const load = async () => {
    try {
      // Import sample data for admin panel
      const { contentsData, categoriesData, subcategoriesData } = await import('@/data/sampleData')
      setCourses(contentsData)
      setCategories(categoriesData)
      setSubcategories(subcategoriesData)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  useEffect(() => { load() }, [])

  const submit = async () => {
    if (editingId) {
      await fetch(`/api/courses/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/courses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setForm({ title: '', coverImage: '', rating: 0, ratingCount: 0, contenttype: '', subjectcategory: '' })
    setEditingId(null)
    await load()
  }

  const edit = (c: Content) => {
    setEditingId(c.id!)
    setForm({ title: c.title, coverImage: c.coverImage, rating: c.rating, ratingCount: c.ratingCount, contenttype: c.contenttype, subjectcategory: c.subjectcategory })
  }

  const remove = async (id: number) => {
    await fetch(`/api/courses/${id}`, { method: 'DELETE' })
    await load()
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Manage Courses</Typography>

        <Paper sx={{ p: 2, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField fullWidth label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Cover URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} /></Grid>
            <Grid item xs={6} md={3}><TextField type="number" fullWidth label="Rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} /></Grid>
            <Grid item xs={6} md={3}><TextField type="number" fullWidth label="Rating Count" value={form.ratingCount} onChange={(e) => setForm({ ...form, ratingCount: Number(e.target.value) })} /></Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={form.contenttype}
                  label="Category"
                  onChange={(e) => setForm({ ...form, contenttype: e.target.value })}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.slug}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={form.subjectcategory}
                  label="Subcategory"
                  onChange={(e) => setForm({ ...form, subjectcategory: e.target.value })}
                >
                  {subcategories.map((subcat) => (
                    <MenuItem key={subcat.id} value={subcat.slug}>{subcat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}><Button variant="contained" onClick={submit}>{editingId ? 'Update' : 'Create'}</Button></Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 2 }}>
          {courses.map((c) => (
            <Box key={c.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{c.title}</Typography>
                <Typography variant="body2" color="text.secondary">{c.contenttype} / {c.subjectcategory}</Typography>
              </Box>
              <Box>
                <IconButton onClick={() => edit(c)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => remove(c.id!)}><DeleteIcon /></IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      </Container>
    </Box>
  )
}

AdminCourses.getLayout = (page: React.ReactElement) => <AdminLayout title="Manage Contents">{page}</AdminLayout>

export default AdminCourses


