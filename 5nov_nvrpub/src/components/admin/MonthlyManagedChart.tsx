import React from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface MonthlyManagedChartProps {
  data: [string, number][]
}

const MonthlyManagedChart: React.FC<MonthlyManagedChartProps> = ({ data }) => {
  const total = data.reduce((acc, [, count]) => acc + count, 0)

  return (
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
        {total}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Last 6 months trend
      </Typography>
      <Box sx={{ display: 'grid', gridAutoFlow: 'column', gap: 2, alignItems: 'end' }}>
        {data.map(([month, count]) => (
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
  )
}

export default MonthlyManagedChart
