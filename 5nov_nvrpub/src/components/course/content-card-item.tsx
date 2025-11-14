import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { Content } from '@/interfaces/content'

interface Props {
  item: Content
  contenttypeSlug?: string
}

const ContentCardItem: FC<Props> = ({ item, contenttypeSlug }) => {
  // Use the passed contenttypeSlug or fallback to item.contenttype
  const slug = contenttypeSlug || item.contenttype
  
  return (
    <Box
      sx={{
        px: 1,
        py: 4,
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: 'background.paper',
          borderRadius: 4,
          transition: (theme) => theme.transitions.create(['box-shadow']),
          '&:hover': {
            boxShadow: 2,
          },
        }}
      >
        <Box
          sx={{
            lineHeight: 0,
            overflow: 'hidden',
            borderRadius: 3,
            mb: 2,
          }}
        >
          <Link href={slug === 'books' ? `/content/book/${item.isbn || item.id}` : `/contenttypes/${slug}/${item.id}`}>
            <Box sx={{ display: 'inline-block' }}>
              <Image src={item.coverImage || item.cover || '/images/courses/JMEDS_Cover.jpeg'} width={234} height={326} alt={'Content ' + item.id} />
            </Box>
          </Link>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Link href={slug === 'books' ? `/content/book/${item.isbn || item.id}` : `/contenttypes/${slug}/${item.id}`} style={{ textDecoration: 'none' }}>
            <Typography variant="h5" sx={{ mb: 2, height: 56, overflow: 'hidden', fontSize: '1.2rem', color: 'text.primary', '&:hover': { color: 'primary.main' } }}>
              {item.title}
            </Typography>
          </Link>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating name="rating-content" value={item.rating} max={5} sx={{ color: '#ffce31', mr: 1 }} readOnly />
            <Typography component="span" variant="h5">
              ({item.ratingCount})
            </Typography>
          </Box>
        </Box>
       
      </Box>
    </Box>
  )
}

export default ContentCardItem
