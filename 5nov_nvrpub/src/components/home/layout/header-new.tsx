'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, LogOut, Crown, User } from 'lucide-react'
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

type AuthUser = {
  email: string
  isPremium?: boolean
}

const HeaderNew: React.FC = () => {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchUser = () => {
      if (typeof window === 'undefined') return
      try {
        const stored = localStorage.getItem('user')
        if (stored) {
          setUser(JSON.parse(stored))
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Failed to parse user session', error)
        setUser(null)
      }
    }

    fetchUser()

    const handleStorage = () => fetchUser()
    const handleAuthChange = () => fetchUser()

    window.addEventListener('storage', handleStorage)
    window.addEventListener('auth-changed', handleAuthChange as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('auth-changed', handleAuthChange as EventListener)
    }
  }, [])

  useEffect(() => {
    if (!profileMenuOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [profileMenuOpen])

  const handleLogout = () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('user')
    window.dispatchEvent(new Event('auth-changed'))
    setProfileMenuOpen(false)
    router.push('/')
  }

  const renderProfilePortal = () => {
    if (!user) return null
    const planLabel = user.isPremium ? 'Premium Plan' : 'Free Plan'
    const avatarLabel = user.email?.charAt(0)?.toUpperCase() || 'U'

    return (
      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setProfileMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/50 bg-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:bg-white/20 transition-all"
        >
          <div className="w-9 h-9 rounded-full bg-white/20 border border-white/60 text-white flex items-center justify-center font-semibold backdrop-blur-xl">
            {avatarLabel}
          </div>
          <div className="text-left hidden lg:flex flex-col">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {user.email?.split('@')[0]}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {planLabel}
            </span>
          </div>
        </button>

        <AnimatePresence>
          {profileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-64 rounded-2xl border border-black/5 bg-white shadow-xl p-4 z-50"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-black/5">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold">
                  {avatarLabel}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {user.email}
                  </p>
                  <div className="flex items-center gap-1 text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    <Crown size={14} className={user.isPremium ? 'text-yellow-500' : 'text-gray-400'} />
                    {planLabel}
                  </div>
                </div>
              </div>

              <div className="py-3 border-b border-black/5">
                <p className="text-xs text-gray-500 mb-1">Quick actions</p>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-sm py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <User size={16} />
                  View Profile
                </Link>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl mt-3 text-sm font-semibold text-white"
                style={{ background: 'var(--text-primary)' }}
              >
                <LogOut size={16} />
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

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
          {user ? (
            renderProfilePortal()
          ) : (
            <>
          <Link href="/login" className="btn-secondary" style={{ textDecoration: 'none' }}>
            Sign In
          </Link>
          <Link href="/signup" className="btn-primary" style={{ textDecoration: 'none' }}>
            Sign Up
          </Link>
            </>
          )}
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
                {user ? (
                  <>
                    <div className="flex items-center gap-3 p-3 rounded-2xl border border-black/5 bg-gray-50">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                        {user.email?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{user.email}</p>
                        <p className="text-xs text-gray-500">{user.isPremium ? 'Premium Plan' : 'Free Plan'}</p>
                      </div>
                    </div>
                    <button
                      className="btn-secondary w-full"
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="btn-secondary w-full text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="btn-primary w-full text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default HeaderNew


