'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FlaskConical,
  Heart,
  UserRound,
  SmilePlus,
  Pill,
  Scissors,
  Baby,
  ScanLine,
  Syringe,
  ChevronRight
} from 'lucide-react'
import { specialties } from '@/data/home-mock'

const iconMap: Record<string, React.ComponentType<any>> = {
  FlaskConical,
  Heart,
  UserRound,
  SmilePlus,
  Pill,
  Scissors,
  Baby,
  ScanLine,
  Syringe
}

const SpecialtiesNew: React.FC = () => {
  const [expandedSpecialty, setExpandedSpecialty] = useState<number | null>(null)

  const toggleSpecialty = (id: number) => {
    setExpandedSpecialty(expandedSpecialty === id ? null : id)
  }

  return (
    <section className="py-20" style={{ background: 'var(--bg-page)' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-1 mb-4">Medical Specialties</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Explore comprehensive resources across all medical disciplines
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((specialty, index) => {
            const Icon = iconMap[specialty.icon]
            const isExpanded = expandedSpecialty === specialty.id
            const hasSubcategories = specialty.subcategories && specialty.subcategories.length > 0

            return (
              <div key={specialty.id} className="col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)' }}
                  className={`bg-gradient-to-br ${specialty.gradient} rounded-xl p-8 cursor-pointer group`}
                  style={{
                    background: 'white',
                    border: '1px solid var(--border-light)',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
                  }}
                  onClick={() => hasSubcategories && toggleSpecialty(specialty.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300"
                          style={{
                            background: 'var(--accent-grey-200)',
                            color: 'var(--text-primary)'
                          }}
                        >
                          {Icon && <Icon size={28} />}
                        </div>
                      </div>
                      <h3
                        className="heading-3 mb-2 transition-colors duration-300"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {specialty.name}
                      </h3>
                      <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                        {specialty.description}
                      </p>
                    </div>
                    {hasSubcategories && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4"
                      >
                        <ChevronRight 
                          size={24} 
                          style={{ color: 'var(--text-secondary)' }}
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Subcategories */}
                <AnimatePresence>
                  {hasSubcategories && isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-3"
                    >
                      {specialty.subcategories!.map((subcategory) => (
                        <motion.div
                          key={subcategory.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          whileHover={{ x: 8, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}
                          className="rounded-lg p-5 cursor-pointer"
                          style={{
                            background: 'white',
                            border: '1px solid var(--border-light)',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)'
                          }}
                        >
                          <h4
                            className="font-semibold mb-1 text-base"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {subcategory.name}
                          </h4>
                          <p
                            className="text-sm"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {subcategory.description}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SpecialtiesNew



