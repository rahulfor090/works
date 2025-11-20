import React, { useState } from 'react';
import { Button } from './ui/button';
import { Star, ArrowRight } from 'lucide-react';
import { mockData } from '../mock';

const NewReleases = () => {
  const [activeCategory, setActiveCategory] = useState('All');

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
          {mockData.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg shadow-[#3B82F6]/25'
                  : 'bg-gray-100 text-[#64748B] hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockData.newReleases.map((book, index) => (
            <div
              key={book.id}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                {/* Book Cover */}
                <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0A2540] text-xs font-semibold rounded-full">
                    {book.category}
                  </span>
                </div>
              </div>

              {/* Book Info */}
              <div className="mt-4 space-y-2">
                <h3 className="font-bold text-[#0A2540] line-clamp-2 group-hover:text-[#FF6B6B] transition-colors duration-200">
                  {book.title}
                </h3>
                <p className="text-sm text-[#64748B]">{book.author}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(book.rating)
                            ? 'fill-[#FBBF24] text-[#FBBF24]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#64748B]">({book.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewReleases;
