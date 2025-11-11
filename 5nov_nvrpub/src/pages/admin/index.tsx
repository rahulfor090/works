import React, { useEffect, useMemo, useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import {
  Avatar,
  Box,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import InsightsIcon from '@mui/icons-material/Insights'
import StarIcon from '@mui/icons-material/Star'
import TodayIcon from '@mui/icons-material/Today'
import CategoryIcon from '@mui/icons-material/Category'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { Content } from '@/interfaces/content'

interface DailyPoint {
  label: string
  value: number
}

const loadContents = async (): Promise<Content[]> => {
  try {
    const response = await fetch('/api/contents')
    if (response.ok) return response.json()
  } catch (error) {
    console.warn('Falling back to sample contents', error)
  }
  const { contentsData } = await import('@/data/sampleData')
  return contentsData as Content[]
}

const AdminHome = () => {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true
    loadContents()
      .then((data) => {
        if (mounted) setContents(data)
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const stats = useMemo(() => {
    const total = contents.length
    const avgRating = contents.reduce((sum, row) => sum + (row.rating || 0), 0) / (total || 1)
    const uniqueTypes = new Set(contents.map((row) => row.contenttype || 'unknown')).size

    const now = new Date()
    const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')}`

    const todaysAdds = contents.filter((row) => {
      if (!row.createdAt) return false
      const date = new Date(row.createdAt)
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate()
      ).padStart(2, '0')}`
      return key === todayKey
    }).length

    return [
      { label: 'Total Contents', value: total, icon: <InsightsIcon /> },
      { label: 'Avg. Rating', value: avgRating.toFixed(2), icon: <StarIcon /> },
      { label: 'Content Types', value: uniqueTypes, icon: <CategoryIcon /> },
      { label: 'Today Added', value: todaysAdds, icon: <TodayIcon /> },
    ]
  }, [contents])

  const sortedMostViewed = useMemo(
    () =>
      [...contents]
        .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0))
        .slice(0, 8)
        .map((row) => ({
          id: row.id,
          title: row.title,
          category: row.subjectcategory || 'General',
          views: row.ratingCount || 0,
        })),
    [contents]
  )

  const topCategories = useMemo(() => {
    const counts: Record<string, number> = {}
    contents.forEach((row) => {
      const key = row.subjectcategory || 'Uncategorised'
      counts[key] = (counts[key] || 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  }, [contents])

  const recentUpdates = useMemo(
    () =>
      [...contents]
        .sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt as any).getTime() : 0
          const bTime = b.createdAt ? new Date(b.createdAt as any).getTime() : 0
          return bTime - aTime
        })
        .slice(0, 5)
        .map((row) => ({
          title: row.title,
          time: row.createdAt ? new Date(row.createdAt as any).toLocaleString() : 'Recently',
        })),
    [contents]
  )

  const last14Days = useMemo(() => {
    const days: { label: string; key: string }[] = []
    const today = new Date()
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      days.push({
        label: `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`,
        key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
          date.getDate()
        ).padStart(2, '0')}`,
      })
    }
    return days
  }, [])

  const dailyUpdates: DailyPoint[] = useMemo(() => {
    const counts: Record<string, number> = {}
    contents.forEach((row) => {
      const date = row.createdAt ? new Date(row.createdAt) : new Date()
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate()
      ).padStart(2, '0')}`
      counts[key] = (counts[key] || 0) + 1
    })
    return last14Days.map((day) => ({
      label: day.label,
      value: counts[day.key] || 0,
    }))
  }, [contents, last14Days])

  const monthlyManaged = useMemo(() => {
    const counts: Record<string, number> = {}
    contents.forEach((row) => {
      const date = row.createdAt ? new Date(row.createdAt) : new Date()
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      counts[key] = (counts[key] || 0) + 1
    })
    return Object.entries(counts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-6)
  }, [contents])

  const renderSparkline = (data: DailyPoint[], color = '#268bbb') => {
    if (!data.length) return null
    const max = Math.max(...data.map((point) => point.value), 1)
    const stepX = data.length > 1 ? 100 / (data.length - 1) : 100
    const points = data.map((point, idx) => `${idx * stepX},${120 - (point.value / max) * 120}`).join(' ')
    const area = `0,120 ${points} ${stepX * (data.length - 1)},120`

    return (
      <svg viewBox="0 0 100 120" width="100%" height="120">
        <defs>
          <linearGradient id="sparklineGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <polyline points={area} fill="url(#sparklineGradient)" />
        <polyline points={points} fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
        {data.map((point, idx) => (
          <circle key={point.label} cx={idx * stepX} cy={120 - (point.value / max) * 120} r={1.8} fill={color} />
        ))}
      </svg>
    )
  }

  return (
    <AdminLayout title="Admin Dashboard">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid key={stat.label} item xs={12} sm={6} lg={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>{stat.icon}</Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Daily Updates
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    Last 14 Days
                  </Typography>
                </Box>
              </Box>
              <Box>{renderSparkline(dailyUpdates)}</Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Monthly Managed Content
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {monthlyManaged.reduce((acc, [, count]) => acc + count, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last 6 months trend
              </Typography>
              <Box sx={{ display: 'grid', gridAutoFlow: 'column', gap: 2, alignItems: 'end' }}>
                {monthlyManaged.map(([month, count]) => (
                  <Box key={month} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: 36,
                        bgcolor: 'primary.main',
                        borderRadius: 2,
                        minHeight: 40,
                        height: `${Math.max(25, Math.min(140, count * 12))}px`,
                        opacity: 0.8,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {month}
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {count}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Most Viewed (Top 8)
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Content Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Views</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedMostViewed.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={
                              Math.min(
                                100,
                                (row.views / Math.max(1, sortedMostViewed[0]?.views || 1)) * 100
                              )
                            }
                            sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {row.views}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Top Categories
              </Typography>
              <List dense>
                {topCategories.map(([category, count]) => (
                  <ListItem key={category} secondaryAction={<Typography fontWeight={600}>{count}</Typography>}>
                    <ListItemText primary={category} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Recent Updates
              </Typography>
              <List dense>
                {recentUpdates.map((item) => (
                  <ListItem key={item.title} alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight={600}>
                          {item.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ScheduleIcon sx={{ fontSize: 16 }} />
                          <Typography variant="caption" color="text.secondary">
                            {item.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}

export default AdminHome


