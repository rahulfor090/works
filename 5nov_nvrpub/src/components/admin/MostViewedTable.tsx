import React from 'react'
import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

interface ViewedItem {
  id: number
  title: string
  category: string
  views: number
}

interface MostViewedTableProps {
  data: ViewedItem[]
}

const MostViewedTable: React.FC<MostViewedTableProps> = ({ data }) => {
  const maxViews = data[0]?.views || 1

  return (
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
          {data.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(100, (row.views / maxViews) * 100)}
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
  )
}

export default MostViewedTable
