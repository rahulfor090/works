'use client';

import { useState, useEffect } from 'react';
import { Atom, Dna, HeartPulse, Activity, Pill, Stethoscope, Smile, HeartHandshake, LucideIcon } from 'lucide-react';
import { mockData } from '@/app/new-home/mock';
import SiteNavbar from '@/components/layout/SiteNavbar';
import SiteFooter from '@/components/layout/SiteFooter';

interface Specialty {
  id: number | string;
  name: string;
  description?: string;
  icon?: string;
}

interface ColorGradient {
  from: string;
  to: string;
}

const iconMap: Record<string, LucideIcon> = {
  Atom: Atom,
  Dna: Dna,
  HeartPulse: HeartPulse,
  Activity: Activity,
  Pill: Pill,
  Stethoscope: Stethoscope,
  Smile: Smile,
  HeartHandshake: HeartHandshake
};

const AllSpecialties = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        // Fetch all categories, not just those with ishomepage=1
        const response = await fetch('/api/subjectcategories');
        if (response.ok) {
          const data = await response.json();
          setSpecialties(data);
        } else {
          // Fallback to mock data if API fails
          setSpecialties(mockData.specialities);
        }
      } catch (error) {
        console.error('Error fetching specialties:', error);
        // Fallback to mock data on error
        setSpecialties(mockData.specialities);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#F0F9FF] via-white to-[#FFF5F5] relative overflow-hidden min-h-screen">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3B82F6] via-[#FF6B6B] to-[#10B981]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#0A2540] mb-4">
              All Specialities
            </h1>
            <p className="text-lg text-[#64748B] max-w-3xl mx-auto">
              Explore our comprehensive collection of medical specialties and find the resources you need.
            </p>
          </div>

          {/* Specialities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm animate-pulse"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gray-200"></div>
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              specialties.map((specialty, index) => {
                // Default to first icon if no icon specified
                const iconName = specialty.icon || 'Stethoscope';
                const Icon = iconMap[iconName] || Stethoscope;
                const colors: ColorGradient[] = [
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
                      <h3 className="text-lg font-bold text-[#0A2540] group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 group-hover:bg-gradient-to-r"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${color.from} 0%, ${color.to} 100%)`,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text'
                        }}
                      >
                        {specialty.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#64748B] leading-relaxed">
                        {specialty.description || 'Explore this medical specialty'}
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
              })
            )}
          </div>

          {/* Empty State */}
          {!loading && specialties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-[#64748B]">No specialties available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default AllSpecialties;
