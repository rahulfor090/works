'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Play,
  Search,
  X,
  Filter,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface HeroSlide {
  id?: number
  title: string
  highlightedWord?: string
  subtitle: string
  image: string
  isActive?: number | boolean
}

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=85",
    title: "Empowering Medical Minds.",
    subtitle:
      "Access world-class medical resources, journals, and mentorship from leading healthcare professionals."
  },
  {
    image:
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?q=85",
    title: "Smart, Structured Learning.",
    subtitle:
      "Curated books, journals, videos, and clinical cases built for deep understanding."
  },
  {
    image:
      "https://images.unsplash.com/photo-1576091160575-112de68e4e39?q=85",
    title: "Latest in Health Science.",
    subtitle:
      "Always-current research, reviews, and evidence-based resources at your fingertips."
  },
  {
    image:
      "https://images.unsplash.com/photo-1631217314830-4e5b85b80a9f?q=85",
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

const HERO_HIGHLIGHTS = [
  {
    label: 'Medical titles',
    value: '8k+',
    meta: 'Peer-reviewed, updated weekly'
  },
  {
    label: 'Expert mentors',
    value: '450+',
    meta: 'Global specialists & faculty'
  },
  {
    label: 'Clinical cases',
    value: '1.2k+',
    meta: 'Evidence-backed scenarios'
  }
]

const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    title: 'Verified Content',
    meta: 'Aligned with NMC/NBE syllabi'
  },
  {
    icon: Sparkles,
    title: 'AI Voice Companion',
    meta: 'Listen, query & bookmark'
  },
  {
    icon: Users,
    title: 'Mentor Circles',
    meta: 'Live case discussions'
  }
]

const HeroNew: React.FC = () => {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES)

  const heroSlides = slides.filter((slide) => slide.isActive !== 0)
  const normalizedSlides =
    heroSlides.length > 0 ? heroSlides : DEFAULT_HERO_SLIDES

  useEffect(() => {
    const fetchSlides = async (): Promise<void> => {
      try {
        const response = await fetch('/api/slides')
        if (response.ok) {
          const data = await response.json()
          const parsedSlides: HeroSlide[] = (data || []).map((slide: HeroSlide) => ({
            ...slide,
            highlightedWord: slide.highlightedWord ?? undefined,
            image: slide.image?.startsWith('http')
              ? slide.image
              : `/images/sliders/${slide.image}`,
            isActive: slide.isActive
          }))
          if (parsedSlides.length > 0) {
            setSlides(parsedSlides)
          }
        }
      } catch (error) {
        console.error('Failed to load hero slides:', error)
      }
    }

    fetchSlides()
  }, [])

  useEffect(() => {
    if (normalizedSlides.length === 0) return
    const interval = setInterval(() => {
      if (!isInteracting) {
        setCurrentImageIndex((prev) => (prev + 1) % normalizedSlides.length)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [normalizedSlides.length, isInteracting])

  useEffect(() => {
    if (currentImageIndex >= normalizedSlides.length) {
      setCurrentImageIndex(0)
    }
  }, [normalizedSlides.length, currentImageIndex])

  const changeSlide = (direction: 'prev' | 'next'): void => {
    setIsInteracting(true)
    setCurrentImageIndex((prev) => {
      return direction === 'next'
        ? (prev + 1) % normalizedSlides.length
        : (prev - 1 + normalizedSlides.length) % normalizedSlides.length
    })
    setTimeout(() => setIsInteracting(false), 1000)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement
      if (showFilters && !target.closest('.filter-container')) {
        setShowFilters(false)
      }
    }
    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside)
      return () =>
        document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFilters])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const params = new URLSearchParams()
    params.set('q', searchQuery.trim())
    if (selectedType !== 'all') params.set('type', selectedType)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        background: 'var(--gradient-hero-warm)',
        minHeight: '100vh',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}
    >
      {/* Manual Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-30 pointer-events-none">
        <button
          onClick={() => changeSlide('prev')}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 border border-gray-200 text-gray-700 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={() => changeSlide('next')}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 border border-gray-200 text-gray-700 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Background Carousel */}
      <div className="absolute inset-0 opacity-70">
        <AnimatePresence mode="wait">
          <motion.div
            key={
              normalizedSlides[currentImageIndex]?.image ||
              currentImageIndex
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${normalizedSlides[currentImageIndex]?.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7) contrast(1.25)'
            }}
          />
        </AnimatePresence>
      </div>

      {/* CONTENT START */}
      <div className="container mx-auto px-4 relative z-10 text-center pt-40 sm:pt-48 pb-12">

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-10 sm:mb-12"
        >
          <form onSubmit={handleSearch} className="relative filter-container">
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 rounded-3xl sm:rounded-full border border-gray-200 bg-white backdrop-blur-2xl px-5 py-4 shadow-xl">
              <div className="flex items-center w-full gap-2.5">
                <Search size={22} className="text-gray-600" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search medical resources, journals, or mentors"
                  className="flex-1 bg-transparent text-base sm:text-lg font-medium text-gray-900 placeholder-gray-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-full transition-colors relative ${selectedType !== 'all'
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-100'
                    }`}
                >
                  <Filter size={20} />
                  {selectedType !== 'all' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-black" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full font-semibold text-base"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  color: 'var(--gradient-hero-start)'
                }}
              >
                Search
              </button>
            </div>

            {/* Filters Dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/30 bg-white p-4 backdrop-blur-2xl shadow-xl z-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold">
                      Filter by Content Type
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowFilters(false)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {CONTENT_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => {
                          setSelectedType(type.value)
                          setShowFilters(false)
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${selectedType === type.value
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-gray-100'
                          }`}
                        style={{ border: '1px solid rgba(0,0,0,0.1)' }}
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

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-5xl mx-auto mb-8"
        >
          {TRUST_BADGES.map(({ icon: Icon, title, meta }) => (
            <div
              key={title}
              className="flex items-center gap-3 bg-white/90 border border-gray-100 rounded-2xl px-4 py-3 shadow-lg"
            >
              <span className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-gray-500">{meta}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/40 backdrop-blur"
        >
          <span className="caption font-mono uppercase">
            New Resources Available
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-hero mb-6 max-w-4xl mx-auto"
        >
          <span>{normalizedSlides[currentImageIndex]?.title}</span>
          {normalizedSlides[currentImageIndex]?.highlightedWord &&
            normalizedSlides[currentImageIndex]?.highlightedWord !==
            normalizedSlides[currentImageIndex]?.title && (
              <span className="block text-primary">
                {normalizedSlides[currentImageIndex]?.highlightedWord}
              </span>
            )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="body-large mb-8 max-w-2xl mx-auto text-gray-600"
        >
          {normalizedSlides[currentImageIndex]?.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/signup" className="btn-primary px-8 py-3 text-base">
            Start Free
          </Link>

          <Link href="/login" className="btn-secondary px-8 py-3 text-base flex items-center gap-2">
            <Play size={18} />
            Sign In & Explore
          </Link>
        </motion.div>

        {/* Highlight Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto mb-14"
        >
          {HERO_HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="bg-white/90 border border-gray-100 rounded-3xl px-6 py-5 text-left shadow-xl"
            >
              <p className="text-3xl font-semibold">{item.value}</p>
              <p className="text-base font-medium">{item.label}</p>
              <p className="text-sm text-gray-500 mt-1">{item.meta}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center"
        >
          <span className="caption mb-2 text-gray-500">
            Scroll to explore
          </span>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>

      </div>
      {/* CONTENT END */}
    </section>
  )
}

export default HeroNew
