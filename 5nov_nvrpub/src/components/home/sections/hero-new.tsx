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
      {/* Background Image (Blurred/dimmed for atmosphere) */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={normalizedSlides[currentImageIndex]?.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center blur-3xl scale-110"
            style={{
              backgroundImage: `url(${normalizedSlides[currentImageIndex]?.image})`,
            }}
          />
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center pt-24 sm:pt-32 pb-12 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col lg:flex-row min-h-[600px] lg:h-[700px]">

          {/* Left Column: Content */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center text-left relative z-10">

            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex self-start items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-blue-50 border border-blue-100 text-blue-700"
            >
              <span className="text-xs font-bold tracking-wider uppercase">
                New Resources Available
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              key={currentImageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 leading-[1.1]"
            >
              <span>{normalizedSlides[currentImageIndex]?.title}</span>
              {normalizedSlides[currentImageIndex]?.highlightedWord &&
                normalizedSlides[currentImageIndex]?.highlightedWord !==
                normalizedSlides[currentImageIndex]?.title && (
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
                    {normalizedSlides[currentImageIndex]?.highlightedWord}
                  </span>
                )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              key={`sub-${currentImageIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed"
            >
              {normalizedSlides[currentImageIndex]?.subtitle}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-md mb-10"
            >
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:shadow-md transition-shadow duration-300">
                  <Search size={20} className="text-gray-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search resources..."
                    className="flex-1 bg-transparent text-base font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </form>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/signup" className="px-8 py-3.5 rounded-full bg-gray-900 text-white font-semibold text-base hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Free
              </Link>
              <Link href="/login" className="px-8 py-3.5 rounded-full bg-white text-gray-900 border border-gray-200 font-semibold text-base hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
                <Play size={18} className="fill-current" />
                Watch Demo
              </Link>
            </motion.div>

            {/* Trust Badges / Stats (Small) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-6 text-gray-500 text-sm font-medium"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-green-500" />
                <span>Verified Content</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-500" />
                <span>450+ Mentors</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={normalizedSlides[currentImageIndex]?.image}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${normalizedSlides[currentImageIndex]?.image})`,
                }}
              />
            </AnimatePresence>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/10 pointer-events-none" />

            {/* Navigation Buttons (Overlaid on Image) */}
            <div className="absolute bottom-8 right-8 flex gap-3 z-20">
              <button
                onClick={() => changeSlide('prev')}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => changeSlide('next')}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroNew
