'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { stats } from '@/data/home-mock'

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
      {count}
      {suffix}
    </span>
  )
}

const StatsNew: React.FC = () => {
  return (
    <section className="py-16" style={{ background: 'var(--bg-section)' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="heading-hero mb-2" style={{ color: 'var(--text-primary)' }}>
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsNew




