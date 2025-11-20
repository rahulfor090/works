'use client';

import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { mockData } from '../mock';

const MostViewed = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch('/api/home/mentors');
        if (response.ok) {
          const data = await response.json();
          // Add hardcoded rating and reviews to each mentor
          const mentorsWithRatings = data.map((mentor, index) => ({
            ...mentor,
            rating: mentor.rating ?? 4.8 + (index * 0.1 % 0.2), // Use DB rating or fallback
            reviews: 120 + (index * 40), // Increment reviews
            experience: '5+ Years', // Default experience
            image: mentor.photo_url && mentor.photo_url.trim() !== '' ? mentor.photo_url : 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
            speciality: mentor.speciality || 'Medical Professional'
          }));
          setMentors(mentorsWithRatings);
        } else {
          // Fallback to mock data if API fails
          setMentors(mockData.mentors);
        }
      } catch (error) {
        console.error('Error fetching mentors:', error);
        // Fallback to mock data on error
        setMentors(mockData.mentors);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#F0F9FF] via-white to-[#FFF5F5] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border-4 border-[#3B82F6] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 border-4 border-[#FF6B6B] rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <TrendingUp size={32} className="text-[#FF6B6B]" />
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A2540]">
              Most Viewed
            </h2>
          </div>
          <p className="text-lg text-[#64748B] max-w-3xl mx-auto">
            Discover our most popular mentors and learn from the best in their fields. Join thousands of students who have already transformed their careers.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users size={28} className="text-white" />
            </div>
            <div className="text-4xl font-bold text-[#0A2540] mb-2">
              {mockData.mentorStats.students}
            </div>
            <div className="text-[#64748B] font-medium">Students Taught</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star size={28} className="text-white" />
            </div>
            <div className="text-4xl font-bold text-[#0A2540] mb-2">
              {mockData.mentorStats.rating}
            </div>
            <div className="text-[#64748B] font-medium">Average Rating</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-white" />
            </div>
            <div className="text-4xl font-bold text-[#0A2540] mb-2">
              {mockData.mentorStats.successRate}
            </div>
            <div className="text-[#64748B] font-medium">Success Rate</div>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse"
              >
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            mentors.map((mentor, index) => (
            <div
              key={mentor.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Mentor Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Experience Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#0A2540] text-xs font-bold rounded-full">
                    {mentor.experience}
                  </span>
                </div>
              </div>

              {/* Mentor Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#0A2540] mb-2 group-hover:text-[#FF6B6B] transition-colors">
                  {mentor.name}
                </h3>
                <p className="text-sm text-[#64748B] mb-4">
                  {mentor.speciality}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(mentor.rating)
                            ? 'fill-[#FBBF24] text-[#FBBF24]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#0A2540]">
                    {mentor.rating}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-2">
                  {mentor.reviews}+ reviews
                </p>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MostViewed;
