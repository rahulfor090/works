'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigationItems = [
  { label: 'Books', path: '/contenttypes/books' },
  { label: 'Videos', path: '/contenttypes/videos' },
  { label: 'Journals', path: '/contenttypes/journals' },
  { label: 'Cases', path: '/contenttypes/cases' },
  { label: 'MCQs', path: '/contenttypes/mcqs' },
  { label: 'Reviews', path: '/contenttypes/reviews' },
]

const HeaderNew: React.FC = () => {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      }`}
      style={{ height: '80px' }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              NRV Publications
            </h1>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item, index) => {
            const isActive = router.asPath === item.path
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.path}
                  className="relative body-medium hover:opacity-70 transition-opacity duration-200 group"
                  style={{ 
                    color: 'var(--text-primary)', 
                    textDecoration: 'none',
                    fontWeight: isActive ? 600 : 400
                  }}
                >
                  {item.label}
                  <span 
                    className="absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="hidden md:flex items-center gap-4"
        >
          <button className="btn-secondary">Sign In</button>
          <button className="btn-primary">Sign Up</button>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: 'var(--text-primary)' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <nav className="flex flex-col p-4 gap-4">
              {navigationItems.map((item) => {
                const isActive = router.asPath === item.path
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="body-medium hover:opacity-70"
                    style={{ 
                      color: 'var(--text-primary)', 
                      textDecoration: 'none',
                      fontWeight: isActive ? 600 : 400
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="flex flex-col gap-2 pt-2">
                <button className="btn-secondary w-full">Sign In</button>
                <button className="btn-primary w-full">Sign Up</button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default HeaderNew


