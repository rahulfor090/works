'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SiteNavbar from '@/components/layout/SiteNavbar';

// Dynamic imports for heavy components (below the fold)
const Hero = dynamic(() => import('./components/Hero'), { ssr: true });
const StatsSection = dynamic(() => import('./components/StatsSection'), { ssr: false });
const NewReleases = dynamic(() => import('./components/NewReleases'), { ssr: false });
const Specialties = dynamic(() => import('./components/Specialties'), { ssr: false });
const Testimonials = dynamic(() => import('./components/Testimonials'), { ssr: false });
const MostViewed = dynamic(() => import('./components/MostViewed'), { ssr: false });
const Newsletter = dynamic(() => import('./components/Newsletter'), { ssr: false });
const SiteFooter = dynamic(() => import('@/components/layout/SiteFooter'), { ssr: true });

interface BannerData {
  id: number;
  title?: string;
  url: string;
  image: string;
  isActive: number | boolean;
}

const HomePage = (): JSX.Element => {
  const [banner, setBanner] = useState<BannerData | null>(null);

  useEffect(() => {
    // Fetch active header ad from the ads/citations table
    fetch('/api/active-header-ad')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.isActive) {
          setBanner(data);
        }
      })
      .catch(() => {
        console.log('No active ad found');
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
      
      {/* Advertisement Banner - Below Header */}
      {banner && (
        <div className="pt-20 w-full bg-white">
          <div className="mx-auto max-w-7xl flex justify-center">
            <a 
              href={banner.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={banner.image}
                alt={banner.title || "Advertisement"}
                className="object-cover block hover:opacity-90 transition-opacity cursor-pointer"
                style={{ width: '468px', height: '60px' }}
              />
            </a>
          </div>
        </div>
      )}
      
      <Hero />
      <StatsSection />
      <NewReleases />

      <Specialties />
      <Testimonials />
      <MostViewed />
      <Newsletter />
      <SiteFooter />
    </div>
  );
};

export default HomePage;
