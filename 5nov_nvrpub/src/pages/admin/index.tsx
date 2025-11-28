import React, { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Grid, Button } from '@mui/material'
import NextLink from 'next/link'
import InsightsIcon from '@mui/icons-material/Insights'
import StarIcon from '@mui/icons-material/Star'
import TodayIcon from '@mui/icons-material/Today'
import CategoryIcon from '@mui/icons-material/Category'
import { Content } from '@/interfaces/content'
import { useAuth } from '@/utils/auth'
import { ComponentLoader } from '@/components/loaders'

// Dynamic imports for heavy components
const AdminLayout = dynamic(() => import('@/components/layout/AdminLayout'), {
  loading: () => <div>Loading admin panel...</div>,
  ssr: false,
})

const DashboardStats = dynamic(() => import('@/components/admin/DashboardStats'), {
  loading: () => <ComponentLoader type="skeleton" height="120px" />,
  ssr: false,
})

const DailyUpdatesChart = dynamic(() => import('@/components/admin/DailyUpdatesChart'), {
  loading: () => <ComponentLoader type="skeleton" height="200px" />,
  ssr: false,
})

const MonthlyManagedChart = dynamic(() => import('@/components/admin/MonthlyManagedChart'), {
  loading: () => <ComponentLoader type="skeleton" height="200px" />,
  ssr: false,
})

const MostViewedTable = dynamic(() => import('@/components/admin/MostViewedTable'), {
  loading: () => <ComponentLoader type="skeleton" height="400px" />,
  ssr: false,
})

const TopCategoriesList = dynamic(() => import('@/components/admin/TopCategoriesList'), {
  loading: () => <ComponentLoader type="skeleton" height="200px" />,
  ssr: false,
})

const RecentUpdatesList = dynamic(() => import('@/components/admin/RecentUpdatesList'), {
  loading: () => <ComponentLoader type="skeleton" height="200px" />,
  ssr: false,
})

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
  useAuth() // Protect this route
  
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
          id: row.id || 0,
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

  return (
    <AdminLayout title="Admin Dashboard">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button component={NextLink} href="/admin/webapi" variant="contained" color="primary">
            WebAPI
          </Button>
        </Box>

        <DashboardStats stats={stats} />

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <DailyUpdatesChart data={dailyUpdates} />
          </Grid>

          <Grid item xs={12} lg={4}>
            <MonthlyManagedChart data={monthlyManaged} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <MostViewedTable data={sortedMostViewed} />
          </Grid>

          <Grid item xs={12} lg={4}>
            <TopCategoriesList data={topCategories} />
            <RecentUpdatesList data={recentUpdates} />
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}

export default AdminHome


