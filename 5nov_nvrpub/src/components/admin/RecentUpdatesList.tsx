import React from 'react'
import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import ScheduleIcon from '@mui/icons-material/Schedule'

interface RecentUpdate {
  title: string
  time: string
}

interface RecentUpdatesListProps {
  data: RecentUpdate[]
}

const RecentUpdatesList: React.FC<RecentUpdatesListProps> = ({ data }) => {
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
        Recent Updates
      </Typography>
      <List dense>
        {data.map((item) => (
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
  )
}

export default RecentUpdatesList
