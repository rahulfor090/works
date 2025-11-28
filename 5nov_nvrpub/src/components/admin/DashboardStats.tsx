import React from 'react'
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'

interface StatItem {
  label: string
  value: string | number
  icon: React.ReactNode
}

interface DashboardStatsProps {
  stats: StatItem[]
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
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
  )
}

export default DashboardStats
