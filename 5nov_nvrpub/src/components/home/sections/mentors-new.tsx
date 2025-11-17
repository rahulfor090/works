'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Star, Users, BookOpen } from 'lucide-react'
import { mentors, mentorStats } from '@/data/home-mock'

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

const MentorsNew: React.FC = () => {
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
          {mentorStats.map((stat, index) => (
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
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden hover-lift cursor-pointer group"
              style={{
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white text-sm mb-2">
                      <Users size={16} />
                      <span>{mentor.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm">
                      <BookOpen size={16} />
                      <span>{mentor.courses} courses</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-3 mb-2">{mentor.name}</h3>
                <p className="body-small mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {mentor.specialty}
                </p>
                <div className="flex items-center justify-between">
                  <span className="caption" style={{ color: 'var(--text-muted)' }}>
                    {mentor.experience}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={16} fill="#FFA500" stroke="#FFA500" />
                    <span className="text-sm font-medium">{mentor.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MentorsNew

