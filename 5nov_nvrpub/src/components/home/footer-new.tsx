'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ArrowUp, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const FooterNew: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerSections = [
    {
      title: 'About',
      links: ['Our Story', 'Team', 'Careers', 'Press']
    },
    {
      title: 'Resources',
      links: ['Books', 'Journals', 'Videos', 'Cases']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact Us', 'FAQ', 'Community']
    },
    {
      title: 'Contact',
      links: ['info@nrvpublications.com', '+1 (555) 123-4567', 'San Francisco, CA', 'USA']
    }
  ]

  return (
    <footer className="relative" style={{ background: '#002244', color: 'white' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="heading-3 mb-4" style={{ color: 'white' }}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="body-small hover:opacity-70 transition-opacity duration-200 inline-block relative group"
                      style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">NRV Publications</h3>
            <p className="body-small" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Empowering Medical Minds
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 pt-8 border-t"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <p className="body-small" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            © 2025 NRV Publications. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center z-50"
        style={{
          background: 'var(--text-primary)',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        <ArrowUp size={24} />
      </motion.button>
    </footer>
  )
}

export default FooterNew




