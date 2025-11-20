import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import NewReleases from './components/NewReleases';
import Specialties from './components/Specialties';
import Testimonials from './components/Testimonials';
import MostViewed from './components/MostViewed';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <StatsSection />
      <NewReleases />
      <Specialties />
      <Testimonials />
      <MostViewed />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
