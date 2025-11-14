'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import Link from 'next/link'

interface FeaturedItem {
  id: number
  title: string
  image: string
  category: string
  issueDate?: string
  readTime?: string
  type: 'book' | 'journal'
  slug?: string
  isbn?: string
  createdAt?: string
}

const FeaturedJournalsNew: React.FC = () => {
  const [items, setItems] = useState<FeaturedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch books
        const booksResponse = await fetch('/api/books')
        const booksData = await booksResponse.json()
        
        // Fetch content types to find journal ID
        const contentTypesResponse = await fetch('/api/contenttypes')
        const contentTypes = await contentTypesResponse.json()
        const journalType = contentTypes.find((ct: any) => ct.slug === 'journals')
        const journalTypeId = journalType?.id || 3
        
        // Fetch journals (contents with contentTypeId = journalTypeId)
        const contentsResponse = await fetch('/api/contents')
        const contentsData = await contentsResponse.json()
        const journalsData = contentsData.filter((content: any) => content.contentTypeId === journalTypeId)
        
        // Combine and format books
        const formattedBooks: FeaturedItem[] = (booksData || []).map((book: any) => ({
          id: book.id,
          title: book.title,
          image: book.coverImage || '/images/courses/JMEDS_Cover.jpeg',
          category: 'Book',
          issueDate: book.createdAt ? new Date(book.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : undefined,
          readTime: '45 min',
          type: 'book' as const,
          isbn: book.isbn,
          createdAt: book.createdAt,
        }))
        
        // Combine and format journals
        const formattedJournals: FeaturedItem[] = (journalsData || []).map((journal: any) => ({
          id: journal.id,
          title: journal.title,
          image: journal.coverImage || '/images/jaypee-DSJUOG-1761321552656.jpg',
          category: 'Journal',
          issueDate: journal.createdAt ? new Date(journal.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : undefined,
          readTime: '30 min',
          type: 'journal' as const,
          createdAt: journal.createdAt,
        }))
        
        // Combine books and journals
        const combined = [...formattedBooks, ...formattedJournals]
        // Sort by createdAt (newest first) and take first 8
        combined.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        })
        
        setItems(combined.slice(0, 8))
      } catch (error) {
        console.error('Error fetching featured items:', error)
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  useEffect(() => {
    if (!isPaused && items.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(items.length / 4))
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isPaused, items.length])

  const handlePrev = () => {
    if (items.length === 0) return
    const maxIndex = Math.ceil(items.length / 4) - 1
    setCurrentIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1))
  }

  const handleNext = () => {
    if (items.length === 0) return
    const maxIndex = Math.ceil(items.length / 4) - 1
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1))
  }

  // Get items for current page (4 items per page)
  const getCurrentPageItems = () => {
    const startIndex = currentIndex * 4
    return items.slice(startIndex, startIndex + 4)
  }

  const currentPageItems = getCurrentPageItems()

  return (
    <section className="py-20" style={{ background: 'var(--bg-page)' }} id="journals">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-1 mb-4">Featured Journals & Books</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Latest research, evidence-based medical literature, and educational resources
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="body-medium" style={{ color: 'var(--text-secondary)' }}>
              Loading...
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <div className="body-medium" style={{ color: 'var(--text-secondary)' }}>
              No featured items available
            </div>
          </div>
        ) : (
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
                  {currentPageItems.map((item, index) => {
                    const href = item.type === 'book' 
                      ? `/content/book/${item.isbn}` 
                      : `/contenttypes/journals/${item.id}`
                    
                    return (
                      <motion.div
                        key={`${item.type}-${item.id}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl overflow-hidden hover-lift cursor-pointer"
                        style={{
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
                        }}
                      >
                        <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/courses/JMEDS_Cover.jpeg'
                              }}
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
                                {item.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="heading-3 mb-3 line-clamp-2">{item.title}</h3>
                            <div className="flex items-center justify-between text-sm" style={{ color: 'var(--text-muted)' }}>
                              <span>{item.issueDate || 'Recent'}</span>
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{item.readTime || '30 min'}</span>
                              </div>
                            </div>
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="mt-4 text-sm font-mono uppercase"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              Read More →
                            </motion.div>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {items.length > 4 && (
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
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedJournalsNew

