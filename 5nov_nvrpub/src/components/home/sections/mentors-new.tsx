'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { BookOpen, Star, Users } from 'lucide-react'

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const increment = end / (duration * 60)
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 1000 / 60)
          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={elementRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

interface MentorRecord {
  id: number
  name: string
  photo: string
  category: string
  specialty: string
  description: string
  companyName: string
  hospital: string
  companyLogo: string
  displayOrder: number
  isActive: boolean
}

interface MentorStat {
  label: string
  value: number
  suffix?: string
}

const defaultStats: MentorStat[] = [
  { label: 'Active Mentors', value: 0, suffix: '+' },
  { label: 'Specialties', value: 0, suffix: '+' },
  { label: 'Institutions', value: 0, suffix: '+' },
]

const createDefaultStats = () => defaultStats.map(stat => ({ ...stat }))

const MentorsNew: React.FC = () => {
  const [mentorList, setMentorList] = useState<MentorRecord[]>([])
  const [stats, setStats] = useState<MentorStat[]>(() => createDefaultStats())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadMentors = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/mentors', { signal: controller.signal })
        if (!response.ok) {
          throw new Error('Failed to load mentors')
        }
        const payload = await response.json()
        const mentors: MentorRecord[] = payload?.mentors ?? []
        const serverStats: MentorStat[] = payload?.stats ?? []

        setMentorList(mentors)
        setStats(serverStats.length ? serverStats : deriveStats(mentors))
        setError(null)
      } catch (err: any) {
        if (controller.signal.aborted) return
        console.error('Mentors section error:', err)
        setError('Unable to load mentors right now. Please try again later.')
        setStats(createDefaultStats())
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadMentors()

    return () => controller.abort()
  }, [])

  const renderMentorCards = () => {
    if (loading) {
      return Array.from({ length: 4 }).map((_, index) => (
        <div key={`mentor-skeleton-${index}`} className="h-96 rounded-xl bg-white p-6 animate-pulse" />
      ))
    }

    if (error) {
      return (
        <div className="col-span-full text-center text-red-500" role="status">
          {error}
        </div>
      )
    }

    if (!mentorList.length) {
      return (
        <div className="col-span-full text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          No mentors have been published yet. Please add mentors from the admin panel.
        </div>
      )
    }

    return mentorList.map((mentor, index) => {
      const organization = mentor.hospital || mentor.companyName || 'Healthcare Leader'
      const category = mentor.category || mentor.specialty
      const description = mentor.description || 'Details coming soon.'

      return (
        <motion.div
          key={mentor.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl overflow-hidden hover-lift cursor-pointer group"
          style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)' }}
        >
          <div className="relative h-64 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              src={mentor.photo || '/images/mentors/default.jpg'}
              alt={mentor.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <div className="flex items-center gap-2 text-white text-sm">
                  <Users size={16} />
                  <span className="truncate">{organization}</span>
                </div>
                <div className="flex items-center gap-2 text-white text-sm">
                  <BookOpen size={16} />
                  <span className="truncate">{category}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="heading-3 mb-2">{mentor.name}</h3>
            <p className="body-small mb-3" style={{ color: 'var(--text-secondary)' }}>
              {mentor.specialty}
            </p>
            <p className="caption mb-4" style={{ color: 'var(--text-muted)' }}>
              {description}
            </p>
            <div className="flex items-center justify-between">
              <span className="caption truncate" style={{ color: 'var(--text-muted)' }}>
                Spotlight #{mentor.displayOrder}
              </span>
              <div className="flex items-center gap-1 text-primary-600">
                <Star size={16} fill="#2563EB" stroke="#2563EB" />
                <span className="text-sm font-medium">{category}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )
    })
  }

  const statsToRender = stats.length ? stats : deriveStats(mentorList)

  return (
    <section className="py-20" style={{ background: 'var(--bg-page)' }} id="mentors">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-1 mb-4">Most Viewed Mentors</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Discover our most popular mentors and learn from the best
          </p>
        </motion.div>

        {/* Mentor Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {statsToRender.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 text-center"
              style={{
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div className="heading-hero mb-2" style={{ color: 'var(--text-primary)' }}>
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderMentorCards()}
        </div>
      </div>
    </section>
  )
}

export default MentorsNew

const deriveStats = (mentors: MentorRecord[]): MentorStat[] => {
  if (!mentors.length) {
    return createDefaultStats()
  }

  const specialtyCount = new Set(mentors.map(m => m.category)).size
  const institutionCount = new Set(mentors.map(m => m.hospital || m.companyName)).size

  return [
    { label: 'Active Mentors', value: mentors.length, suffix: '+' },
    { label: 'Specialties', value: specialtyCount, suffix: '+' },
    { label: 'Institutions', value: institutionCount, suffix: '+' },
  ]
}

