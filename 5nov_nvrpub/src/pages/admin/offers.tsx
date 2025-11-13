import React from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/layout/AdminLayout'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const AdminOffers = () => {
  const offerCategories = [
    {
      id: 1,
      title: 'Annual Prices',
      icon: '💰',
      description: 'Manage annual subscription prices for different categories',
      href: '/admin/annual-prices',
      count: 0,
    },
    {
      id: 2,
      title: 'Seasonal Offers',
      icon: '🎉',
      description: 'Create and manage seasonal promotional offers',
      href: '/admin/seasonal-offers',
      count: 0,
    },
    {
      id: 3,
      title: 'Bundle Offers',
      icon: '📦',
      description: 'Create package deals and bundle offers',
      href: '/admin/bundle-offers',
      count: 0,
    },
    {
      id: 4,
      title: 'Discount Codes',
      icon: '🎟️',
      description: 'Manage coupon and discount codes',
      href: '/admin/discount-codes',
      count: 0,
    },
  ]

  return (
    <AdminLayout title="Manage Offers">
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              🎯 Offers Management
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Manage all pricing and promotional offers for your platform
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {offerCategories.map(category => (
              <Grid item xs={12} sm={6} md={4} key={category.id}>
                <Link href={category.href} style={{ textDecoration: 'none' }}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                      border: '2px solid transparent',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
                        borderColor: 'primary.main',
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                      },
                    }}
                  >
                    <CardActionArea sx={{ height: '100%' }}>
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h3" sx={{ mb: 2, fontSize: '3rem' }}>
                            {category.icon}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                            {category.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                            {category.description}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                          <Typography variant="caption" sx={{ background: 'rgba(102, 126, 234, 0.1)', px: 1.5, py: 0.5, borderRadius: 1, fontWeight: 600, color: 'primary.main' }}>
                            {category.count} items
                          </Typography>
                          <ArrowForwardIcon sx={{ color: 'primary.main', transition: 'transform 0.3s' }} />
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </AdminLayout>
  )
}

export default AdminOffers
