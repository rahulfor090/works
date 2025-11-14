import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { styled, keyframes } from '@mui/material/styles'
import { Mentor } from '@/interfaces/mentor'
import StarIcon from '@mui/icons-material/Star'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import { Fade, Chip } from '@mui/material'

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`

const StyledMentorCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: 24,
  padding: theme.spacing(3),
  margin: theme.spacing(1),
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  animation: `${fadeInUp} 0.6s ease-out`,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-200px',
    width: '200px',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    animation: `${shimmer} 2s infinite`,
  },
  
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%)',
    border: '1px solid rgba(102, 126, 234, 0.3)',
    
    '& .mentor-avatar': {
      transform: 'scale(1.1)',
      boxShadow: '0 12px 30px rgba(102, 126, 234, 0.3)',
    },
    
    '& .mentor-name': {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    
    '& .company-logo': {
      animation: `${float} 2s ease-in-out infinite`,
    },
  },
}))

interface Props {
  item: Mentor
}

const MentorCardItem: FC<Props> = ({ item }) => {
  return (
    <Fade in={true} timeout={600}>
      <StyledMentorCard>
        {/* Background Decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 100,
            height: 100,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
          }}
        />
        
        {/* Avatar Section */}
        <Box sx={{ textAlign: 'center', mb: 3, position: 'relative', zIndex: 1 }}>
          <Avatar
            src={item.photo}
            alt={item.name}
            className="mentor-avatar"
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 2,
              border: '4px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          />
          
          <Typography
            variant="h6"
            className="mentor-name"
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              mb: 1,
              transition: 'all 0.3s ease',
              color: 'text.primary',
            }}
          >
            {item.name}
          </Typography>
          
          {/* Specialty Chip */}
          <Chip
            icon={<SchoolIcon sx={{ fontSize: 16 }} />}
            label={item.contenttype}
            size="small"
            sx={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              color: 'primary.main',
              fontWeight: 600,
              border: '1px solid rgba(102, 126, 234, 0.2)',
              '& .MuiChip-icon': {
                color: 'primary.main',
              },
            }}
          />
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            mb: 3,
            fontSize: '0.9rem',
            textAlign: 'center',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.description}
        </Typography>

        {/* Rating Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                sx={{
                  fontSize: 16,
                  color: i < 4 ? '#FFD700' : '#E0E0E0',
                  transition: 'color 0.3s ease',
                }}
              />
            ))}
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            4.8 (120+ reviews)
          </Typography>
        </Box>

        {/* Company Section */}
        {item.company && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              p: 2,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
              borderRadius: 2,
              border: '1px solid rgba(102, 126, 234, 0.1)',
            }}
          >
            <WorkIcon sx={{ fontSize: 18, color: 'primary.main' }} />
            {item.company.logo && (
              <Avatar
                src={item.company.logo}
                alt={item.company.name}
                className="company-logo"
                sx={{
                  width: 24,
                  height: 24,
                  transition: 'all 0.3s ease',
                }}
              />
            )}
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              {item.company.name}
            </Typography>
          </Box>
        )}

        {/* Experience Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            fontSize: '0.75rem',
            fontWeight: 700,
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
          }}
        >
          5+ Years
        </Box>
      </StyledMentorCard>
    </Fade>
  )
}

export default MentorCardItem
export { MentorCardItem }