'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '@/data/home-mock'

const TestimonialsNew: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'var(--gradient-hero-subtle)' }}>
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-1 mb-4">What Medical Professionals Say</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Trusted by leading healthcare educators worldwide
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Photo */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden">
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--accent-orange-200)' }}
                    >
                      <Quote size={20} style={{ color: 'var(--accent-orange-400)' }} />
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#FFA500" stroke="#FFA500" />
                    ))}
                  </div>
                  <p className="body-large mb-6 italic" style={{ color: 'var(--text-primary)' }}>
                    "{currentTestimonial.quote}"
                  </p>
                  <div>
                    <h4 className="heading-3 mb-1">{currentTestimonial.name}</h4>
                    <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                      {currentTestimonial.role}
                    </p>
                    <p className="caption" style={{ color: 'var(--text-muted)' }}>
                      {currentTestimonial.hospital}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full flex items-center justify-center hover-scale"
              style={{
                background: 'white',
                border: '1px solid var(--border-light)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className="transition-all duration-300"
                  style={{
                    width: currentIndex === index ? '32px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background:
                      currentIndex === index ? 'var(--text-primary)' : 'rgba(0, 0, 0, 0.2)'
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full flex items-center justify-center hover-scale"
              style={{
                background: 'white',
                border: '1px solid var(--border-light)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
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

export default TestimonialsNew

