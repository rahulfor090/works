import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for HomePage
const HomePage = dynamic(() => import('@/app/new-home/HomePage'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const Home = () => {
  return <HomePage />;
};

export default Home;