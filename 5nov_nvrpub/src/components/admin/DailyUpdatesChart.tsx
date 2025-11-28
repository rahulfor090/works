import React from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface DailyPoint {
  label: string
  value: number
}

interface DailyUpdatesChartProps {
  data: DailyPoint[]
}

const DailyUpdatesChart: React.FC<DailyUpdatesChartProps> = ({ data }) => {
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
      <Box>{renderSparkline(data)}</Box>
    </Paper>
  )
}

export default DailyUpdatesChart
