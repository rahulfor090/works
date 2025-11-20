import React, { useEffect, useState, useRef, useCallback } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TestimonialItem from './testimonial-item'
import { Testimonial } from '@/interfaces/testimonial'

const TestimonialsCarousel: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  
  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft + el.clientWidth + 8 < el.scrollWidth)
  }, [])

  useEffect(() => {
    // initialize scroll buttons when items change or on mount
    handleScroll()
    const onResize = () => handleScroll()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [handleScroll, items.length])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/testimonials?featured=1&published=1')
        if (!res.ok) throw new Error('Failed to load testimonials')
        const data = await res.json()
        if (!mounted) return
        // transform rows to Testimonial shape expected by TestimonialItem
        const transformed = Array.isArray(data)
          ? data.map((d: any) => ({
              id: d.id,
              title: d.title || '',
              content: d.content || d.quote || '',
              user: {
                id: d.id,
                name: d.userName || d.user?.name || d.author || 'Anonymous',
                photo: d.photo || d.user?.photo || d.user?.avatar,
                professional: d.professional || d.user?.professional || d.user?.role,
                organization: d.user?.organization || d.organization || undefined,
              },
              rating: d.rating ?? 5,
              isFeatured: !!d.isFeatured,
              isPublished: d.isPublished === undefined ? true : !!d.isPublished,
            }))
          : []

        setItems(transformed)
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!items.length) return null

  return (
    <Box sx={{ px: 2, py: 6, position: 'relative' }}>
      <IconButton
        aria-label="previous testimonials"
        onClick={() => {
          const el = containerRef.current
          if (!el) return
          const amount = Math.round(el.clientWidth * 0.8)
          el.scrollBy({ left: -amount, behavior: 'smooth' })
        }}
        sx={{
          position: 'absolute',
          left: 4,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
        size="large"
        disabled={!canScrollLeft}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        aria-label="next testimonials"
        onClick={() => {
          const el = containerRef.current
          if (!el) return
          const amount = Math.round(el.clientWidth * 0.8)
          el.scrollBy({ left: amount, behavior: 'smooth' })
        }}
        sx={{
          position: 'absolute',
          right: 4,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
        size="large"
        disabled={!canScrollRight}
      >
        <ChevronRightIcon />
      </IconButton>

      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          '& > *': { scrollSnapAlign: 'center', minWidth: 320, flex: '0 0 46%' },
        }}
      >
        {items.map((it) => (
          <TestimonialItem key={String(it.id)} item={it} />
        ))}
      </Box>
    </Box>
  )
}

export default TestimonialsCarousel
