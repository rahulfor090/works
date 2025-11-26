'use client';

import React, { useEffect, useState } from 'react';
import SiteNavbar from '@/components/layout/SiteNavbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import NewReleases from './components/NewReleases';

import Specialties from './components/Specialties';
import Testimonials from './components/Testimonials';
import MostViewed from './components/MostViewed';
import Newsletter from './components/Newsletter';
import SiteFooter from '@/components/layout/SiteFooter';

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
