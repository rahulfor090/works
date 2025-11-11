import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/layout/AdminLayout'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { Content } from '@/interfaces/content'

const AdminHome = () => {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const load = async () => {
      try {
        // Import sample data for admin panel
        const { contentsData } = await import('@/data/sampleData')
        setContents(contentsData)
      } catch (err) {
        console.error('Failed to load contents', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const topContentTypes = useMemo(() => {
    const byCategory: Record<string, number> = {}
    contents.forEach(c => { byCategory[c.contenttype || 'unknown'] = (byCategory[c.contenttype || 'unknown'] || 0) + 1 })
    return Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
  }, [contents])

  const categoriesCount = useMemo(() => {
    const bySubcat: Record<string, number> = {}
    contents.forEach(c => { bySubcat[c.subjectcategory || 'unknown'] = (bySubcat[c.subjectcategory || 'unknown'] || 0) + 1 })
    return Object.entries(bySubcat)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
  }, [contents])

  const monthlyManaged = useMemo(() => {
    const byMonth: Record<string, number> = {}
    contents.forEach(c => {
      const d = c.createdAt ? new Date(c.createdAt) : new Date()
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      byMonth[key] = (byMonth[key] || 0) + 1
    })
    return Object.entries(byMonth)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-12)
  }, [contents])

  const mostViewed = useMemo(() => {
    return [...contents]
      .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0))
      .slice(0, 10)
  }, [contents])

  return (
    <AdminLayout title="Admin Dashboard">
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Dashboard Analytics
            </Typography>
            <Link href="/admin/menu-management" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                  },
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                📋 Menu Management
              </Button>
            </Link>
          </Box>

          {loading ? (
            <Typography>Loading analytics…</Typography>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>Top 10 Content Types</Typography>
                  <List dense>
                    {topContentTypes.map(([type, count]) => (
                      <ListItem key={type}>
                        <ListItemText primary={`${type}`} secondary={`Items: ${count}`} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>Categories (Count of Content)</Typography>
                  <List dense>
                    {categoriesCount.map(([subcat, count]) => (
                      <ListItem key={subcat}>
                        <ListItemText primary={`${subcat}`} secondary={`Items: ${count}`} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>Monthly Managed Content</Typography>
                  <List dense>
                    {monthlyManaged.map(([month, count]) => (
                      <ListItem key={month}>
                        <ListItemText primary={`${month}`} secondary={`Items: ${count}`} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>Most Viewed (Top 10)</Typography>
                  <List dense>
                    {mostViewed.map((c) => (
                      <ListItem key={c.id}>
                        <ListItemText primary={c.title} secondary={`Views (approx): ${c.ratingCount}`} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </AdminLayout>
  )
}

export default AdminHome


