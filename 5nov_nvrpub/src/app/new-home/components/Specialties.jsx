import React from 'react';
import { Atom, Dna, HeartPulse, Activity, Pill, Stethoscope, Smile, HeartHandshake } from 'lucide-react';
import { mockData } from '../mock';

const iconMap = {
  Atom: Atom,
  Dna: Dna,
  HeartPulse: HeartPulse,
  Activity: Activity,
  Pill: Pill,
  Stethoscope: Stethoscope,
  Smile: Smile,
  HeartHandshake: HeartHandshake
};

const Specialties = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#F0F9FF] via-white to-[#FFF5F5] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3B82F6] via-[#FF6B6B] to-[#10B981]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0A2540] mb-4">
            By Specialities
          </h2>
          <p className="text-lg text-[#64748B] max-w-3xl mx-auto">
            Set the way of learning according to your wishes with some of the benefits that you get from us, so you can enjoy the lessons that we provide.
          </p>
        </div>

        {/* Specialities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockData.specialities.map((specialty, index) => {
            const Icon = iconMap[specialty.icon];
            const colors = [
              { from: '#3B82F6', to: '#2563EB' },
              { from: '#FF6B6B', to: '#FF8E53' },
              { from: '#10B981', to: '#059669' },
              { from: '#8B5CF6', to: '#7C3AED' },
              { from: '#F59E0B', to: '#D97706' },
              { from: '#EC4899', to: '#DB2777' },
              { from: '#06B6D4', to: '#0891B2' },
              { from: '#EF4444', to: '#DC2626' }
            ];
            const color = colors[index % colors.length];

            return (
              <div
                key={specialty.id}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Gradient Overlay on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${color.from} 0%, ${color.to} 100%)`
                  }}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  {/* Icon Container */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${color.from} 0%, ${color.to} 100%)`
                    }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Specialty Name */}
                  <h3 className="text-lg font-bold text-[#0A2540] group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${color.from} 0%, ${color.to} 100%)`
                    }}
                  >
                    {specialty.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {specialty.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#0A2540]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Specialties;
