import React from 'react';
import { Star, Quote } from 'lucide-react';
import { mockData } from '../mock';

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A2540] mb-4">
            What our Clients Say
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Discover what our satisfied clients have to say about their experience working with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {mockData.testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Gradient Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3B82F6] via-[#FF6B6B] to-[#10B981]"></div>

              {/* Quote Icon */}
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FF6B6B]/25 group-hover:scale-110 transition-transform duration-300">
                  <Quote size={24} className="text-white" />
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-[#334155] text-lg leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-[#0A2540] mb-1">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-[#64748B] mb-1">
                    {testimonial.position}
                  </p>
                  <p className="text-xs text-[#94A3B8]">
                    {testimonial.institution}
                  </p>
                </div>

                {/* Logo Badge */}
                <div className="ml-4">
                  <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                    <span className="text-sm font-bold text-[#0A2540]">
                      {testimonial.logo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-6 pt-6 border-t border-gray-200">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-[#FBBF24] text-[#FBBF24]"
                  />
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#3B82F6]/5 to-[#FF6B6B]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Decorative Text */}
        <div className="mt-16 text-center">
          <div className="inline-block relative">
            <h3 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#FF6B6B] to-[#10B981] opacity-10">
              TESTIMONIALS
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
