import React from 'react'
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material'

interface TopCategoriesListProps {
  data: [string, number][]
}

const TopCategoriesList: React.FC<TopCategoriesListProps> = ({ data }) => {
  return (
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
        {data.map(([category, count]) => (
          <ListItem key={category} secondaryAction={<Typography fontWeight={600}>{count}</Typography>}>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default TopCategoriesList
