import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Testimonial } from '@/interfaces/testimonial'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

interface Props {
  item: Testimonial
}

const TestimonialItem: FC<Props> = ({ item }) => {
  if (!item || !item.user) {
    return null
  }

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Card
        sx={{
          p: { xs: 4, md: 5 },
          height: '100%',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid',
          borderColor: 'grey.100',
          position: 'relative',
          overflow: 'visible',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(0)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
            borderColor: 'primary.light',
            '& .quote-icon': {
              transform: 'scale(1.1) rotate(5deg)',
              color: 'primary.main',
            },
            '& .user-avatar': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
            },
            '& .rating-stars': {
              '& .MuiRating-icon': {
                transform: 'scale(1.1)',
              }
            }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px 12px 0 0',
            transition: 'height 0.3s ease',
          },
          '&:hover::before': {
            height: 6,
          }
        }}
      >
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <Box sx={{ mb: 3, position: 'relative' }}>
            <FormatQuoteIcon 
              className="quote-icon"
              sx={{ 
                fontSize: 48, 
                color: 'primary.light', 
                opacity: 0.6,
                transition: 'all 0.3s ease',
                mb: 2,
              }} 
            />
            <Typography
              sx={{
                mb: 3,
                color: 'text.secondary',
                fontStyle: 'italic',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.7,
                position: 'relative',
                pl: 3,
                borderLeft: '3px solid',
                borderColor: 'primary.light',
                transition: 'all 0.3s ease',
              }}
            >
              {item.content}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              className="user-avatar"
              src={item.user.photo || undefined}
              sx={{
                width: 64,
                height: 64,
                border: '3px solid',
                borderColor: 'background.paper',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                fontSize: '1.5rem',
                fontWeight: 600,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                transition: 'all 0.3s ease',
              }}
            >
              {!item.user.photo && item.user.name ? item.user.name.charAt(0).toUpperCase() : ''}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography 
                component="h6" 
                sx={{ 
                  fontWeight: 600, 
                  fontSize: '1.125rem',
                  color: 'text.primary',
                  mb: 0.5,
                  transition: 'color 0.3s ease',
                }}
              >
                {item.user.name}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  mb: 1.5,
                  fontSize: '0.875rem',
                }}
              >
                {item.user.professional}
              </Typography>
              <Rating 
                className="rating-stars"
                name="rating" 
                value={5} 
                readOnly 
                size="small"
                sx={{
                  '& .MuiRating-icon': {
                    color: '#ffc107',
                    transition: 'transform 0.2s ease',
                  }
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export { TestimonialItem }