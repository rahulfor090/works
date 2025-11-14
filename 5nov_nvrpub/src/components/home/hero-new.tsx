'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, Play, Search, X, Filter } from 'lucide-react'
import { heroData } from '@/data/home-mock'
import { useRouter } from 'next/router'

const HERO_SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50fGVufDB8fHx8MTczMTQzNTA4M3ww&ixlib=rb-4.1.0&q=85",
    title: "Empowering Medical Minds.",
    subtitle:
      "Access world-class medical resources, journals, and mentorship from leading healthcare professionals."
  },
  {
    image:
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYm9va3N8ZW58MHx8fHwxNzYzMDI4Mjk5fDA&ixlib=rb-4.1.0&q=85",
    title: "Smart, Structured Learning.",
    subtitle:
      "Curated books, journals, videos, and clinical cases built for deep understanding."
  },
  {
    image:
      "https://images.unsplash.com/photo-1576091160575-112de68e4e39?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZXxlbnwwfHx8fDE3MzE0MzUwODN8MA&ixlib=rb-4.1.0&q=85",
    title: "Latest in Health Science.",
    subtitle:
      "Always-current research, reviews, and evidence-based resources at your fingertips."
  },
  {
    image:
      "https://images.unsplash.com/photo-1631217314830-4e5b85b80a9f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE3MzE0MzUwODN8MA&ixlib=rb-4.1.0&q=85",
    title: "Mentorship That Matters.",
    subtitle:
      "Learn directly from top specialists with global teaching experience."
  }
]

const CONTENT_TYPES = [
  { label: 'All', value: 'all' },
  { label: 'Books', value: 'books' },
  { label: 'Videos', value: 'videos' },
  { label: 'Journals', value: 'journals' },
  { label: 'Cases', value: 'cases' },
  { label: 'MCQs', value: 'mcqs' },
  { label: 'Reviews', value: 'reviews' },
]

const HeroNew: React.FC = () => {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showFilters && !target.closest('.filter-container')) {
        setShowFilters(false)
      }
    }
    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFilters])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    const params = new URLSearchParams()
    params.set('q', searchQuery.trim())
    if (selectedType !== 'all') {
      params.set('type', selectedType)
    }
    router.push(`/search?${params.toString()}`)
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'var(--gradient-hero-warm)',
        paddingTop: '5rem',
        paddingBottom: '3rem'
      }}
    >
      {/* Animated Background Image Carousel */}
      <div className="absolute inset-0 opacity-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${HERO_SLIDES[currentImageIndex].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mixBlendMode: 'multiply'
            }}
          />
        </AnimatePresence>
      </div>

      {/* Background overlay with subtle pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroData.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'multiply'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center pt-32 sm:pt-40">
        {/* Floating Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-10 sm:mb-12"
        >
          <form 
            onSubmit={handleSearch}
            className="relative filter-container"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-3xl sm:rounded-full border border-white/30 bg-white/15 backdrop-blur-2xl px-6 py-5 shadow-[0_20px_45px_rgba(15,23,42,0.18)]">
              <div className="flex items-center w-full gap-3">
                <Search size={24} className="shrink-0 text-white/80" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search medical resources, journals, or mentors"
                  className="flex-1 bg-transparent text-base sm:text-lg font-medium text-white placeholder-white/70 focus:outline-none"
                  aria-label="Search medical resources"
                />
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`shrink-0 p-2 rounded-full transition-colors relative ${
                    selectedType !== 'all' ? 'bg-white/30' : 'hover:bg-white/20'
                  }`}
                  style={{ color: 'white' }}
                  aria-label="Toggle filters"
                >
                  <Filter size={20} />
                  {selectedType !== 'all' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl sm:rounded-full font-semibold text-sm sm:text-base transition-colors duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: 'var(--gradient-hero-start)'
                }}
              >
                Search
              </button>
            </div>

            {/* Filter Dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/30 bg-white/95 backdrop-blur-2xl p-4 shadow-[0_20px_45px_rgba(15,23,42,0.18)] z-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Filter by Content Type
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowFilters(false)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {CONTENT_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setSelectedType(type.value)
                          setShowFilters(false)
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedType === type.value
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                        style={{
                          border: '1px solid rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                  {selectedType !== 'all' && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedType('all')
                          setShowFilters(false)
                        }}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Clear filter
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(4px)'
          }}
        >
          <span className="caption font-mono uppercase" style={{ color: 'var(--text-primary)' }}>
            New Resources Available
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-hero mb-6 max-w-4xl mx-auto"
        >
          {HERO_SLIDES[currentImageIndex].title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="body-large mb-8 max-w-2xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          {HERO_SLIDES[currentImageIndex].subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button className="btn-primary px-8 py-3 text-base flex items-center gap-2">
            Explore Resources
          </button>
          <button className="btn-secondary px-8 py-3 text-base flex items-center gap-2">
            <Play size={18} />
            Watch Video
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center"
        >
          <span className="caption mb-2" style={{ color: 'var(--text-muted)' }}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} style={{ color: 'var(--text-primary)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroNew

