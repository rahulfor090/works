'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { newReleases, categories } from '@/data/home-mock'

const NewReleasesNew: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredReleases =
    activeCategory === 'All'
      ? newReleases
      : newReleases.filter((release) => release.category === activeCategory)

  return (
    <section className="py-20" style={{ background: 'var(--bg-section)' }} id="resources">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-1 mb-4">New Releases</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Latest textbooks and educational resources
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-mono text-sm uppercase transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              }`}
              style={{
                border: '1px solid rgba(0, 0, 0, 0.2)'
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Releases Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredReleases.map((release, index) => (
            <motion.div
              key={release.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden hover-lift cursor-pointer group"
              style={{
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={release.image}
                  alt={release.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm">By {release.author}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono uppercase"
                    style={{
                      background: 'var(--accent-grey-200)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {release.category}
                  </span>
                </div>
                <h3 className="heading-3 mb-3 line-clamp-2">{release.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {release.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        background: 'var(--bg-section)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={16} fill="#FFA500" stroke="#FFA500" />
                    <span className="text-sm font-medium">{release.rating}</span>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      ({release.reviews})
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-primary px-8 py-3">View All Releases</button>
        </motion.div>
      </div>
    </section>
  )
}

export default NewReleasesNew



