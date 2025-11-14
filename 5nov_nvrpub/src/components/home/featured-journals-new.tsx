'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { journals } from '@/data/home-mock'

const FeaturedJournalsNew: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % journals.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isPaused])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + journals.length) % journals.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % journals.length)
  }

  return (
    <section className="py-20" style={{ background: 'var(--bg-page)' }} id="journals">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-1 mb-4">Featured Journals</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Latest research and evidence-based medical literature
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {journals.map((journal, index) => (
                  <motion.div
                    key={journal.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl overflow-hidden hover-lift cursor-pointer"
                    style={{
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
                    }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={journal.image}
                        alt={journal.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono uppercase"
                          style={{
                            background: 'var(--glass-bg)',
                            backdropFilter: 'blur(4px)',
                            color: 'var(--text-primary)'
                          }}
                        >
                          {journal.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="heading-3 mb-3 line-clamp-2">{journal.title}</h3>
                      <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span>{journal.issueDate}</span>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{journal.readTime}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="mt-4 text-sm font-mono uppercase"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Read More →
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full flex items-center justify-center hover-scale"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(4px)'
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full flex items-center justify-center hover-scale"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(4px)'
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedJournalsNew

