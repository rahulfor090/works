'use client';

import React from 'react';
import SiteNavbar from '@/components/layout/SiteNavbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import NewReleases from './components/NewReleases';
import Specialties from './components/Specialties';
import Testimonials from './components/Testimonials';
import MostViewed from './components/MostViewed';
import Newsletter from './components/Newsletter';
import SiteFooter from '@/components/layout/SiteFooter';

const HomePage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />
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
