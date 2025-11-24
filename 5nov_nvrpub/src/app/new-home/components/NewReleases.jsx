import React, { useEffect, useState } from 'react'
import { Star, ArrowRight } from 'lucide-react'

import { Button } from './ui/button'

const DEFAULT_CATEGORY = 'All'
const FALLBACK_IMAGE = '/images/courses/JMEDS_Cover.jpeg'

const NewReleases = () => {
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY)
  const [categories, setCategories] = useState([DEFAULT_CATEGORY])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchFeaturedBooks = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/books/featured?limit=12')
        if (!response.ok) {
          throw new Error('Failed to load featured books')
        }

        const payload = await response.json()
        const fetchedBooks = Array.isArray(payload?.data) ? payload.data : []

        if (!isMounted) return

        setBooks(fetchedBooks)

        const uniqueCategories = Array.from(
          new Set(
            fetchedBooks
              .map((book) => (typeof book?.category === 'string' ? book.category.trim() : ''))
              .filter((category) => category.length > 0)
          )
        )

        setCategories([DEFAULT_CATEGORY, ...uniqueCategories])
        setActiveCategory((prev) =>
          prev === DEFAULT_CATEGORY || uniqueCategories.includes(prev) ? prev : DEFAULT_CATEGORY
        )
        setError('')
      } catch (err) {
        if (!isMounted) return
        console.error('Failed to load featured books:', err)
        setError(err?.message || 'Unable to load new releases right now.')
        setBooks([])
        setCategories([DEFAULT_CATEGORY])
        setActiveCategory(DEFAULT_CATEGORY)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchFeaturedBooks()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredBooks =
    activeCategory === DEFAULT_CATEGORY
      ? books
      : books.filter((book) => book?.category === activeCategory)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A2540] mb-4">
              New Releases
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl">
              Discover the latest publications from leading medical experts worldwide
            </p>
          </div>
          <Button
            variant="outline"
            className="border-2 border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white transition-all duration-300 mt-4 lg:mt-0 group"
          >
            View All Releases
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              disabled={loading || books.length === 0}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg shadow-[#3B82F6]/25'
                  : 'bg-gray-100 text-[#64748B] hover:bg-gray-200'
              } ${loading || books.length === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="text-center text-[#64748B]">Loading new releases...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center text-[#64748B]">Featured books will appear here soon.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book, index) => {
              const ratingValue = Math.max(0, Math.min(5, Number(book?.rating) || 0))
              const reviewCount = Number(book?.reviews) || 0
              const imageSrc = book?.image || FALLBACK_IMAGE

              return (
                <div
                  key={book?.id || book?.isbn || index}
                  className="group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    {/* Book Cover */}
                    <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img
                        src={imageSrc}
                        alt={book?.title || 'Featured book cover'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(event) => {
                          event.currentTarget.src = FALLBACK_IMAGE
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0A2540] text-xs font-semibold rounded-full">
                        {book?.category || DEFAULT_CATEGORY}
                      </span>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="mt-4 space-y-2">
                    <h3 className="font-bold text-[#0A2540] line-clamp-2 group-hover:text-[#FF6B6B] transition-colors duration-200">
                      {book?.title || 'Untitled Book'}
                    </h3>
                    <p className="text-sm text-[#64748B]">{book?.author || 'Editorial Team'}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={14}
                            className={
                              starIndex < Math.floor(ratingValue)
                                ? 'fill-[#FBBF24] text-[#FBBF24]'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#64748B]">({reviewCount})</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default NewReleases
