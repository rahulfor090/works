'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Dna, Network, Stethoscope } from 'lucide-react'
import { introCards } from '@/data/home-mock'

const iconMap: Record<string, React.ComponentType<any>> = {
  Dna: Dna,
  Network: Network,
  Stethoscope: Stethoscope,
}

const IntroCardsNew: React.FC = () => {
  return (
    <section className="py-20" style={{ background: 'var(--bg-page)' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {introCards.map((card, index) => {
            const Icon = iconMap[card.icon]
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 hover-lift"
                style={{
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
                  border: '1px solid var(--border-light)',
                }}
              >
                <div className="mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${card.color}15`,
                      color: card.color,
                    }}
                  >
                    {Icon && <Icon size={32} />}
                  </div>
                </div>
                <h3 className="heading-3 mb-4">{card.title}</h3>
                <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                  {card.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default IntroCardsNew
