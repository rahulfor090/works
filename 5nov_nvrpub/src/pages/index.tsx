import React from 'react'
import dynamic from 'next/dynamic'
import { NextPageWithLayout } from '@/interfaces/layout'

// Dynamic import with loading state
const HomePage = dynamic(() => import('@/app/new-home/HomePage'), {
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}>
      <div>Loading...</div>
    </div>
  ),
  ssr: true,
})

const Home: NextPageWithLayout = () => {
  return (
    <HomePage />
  )
}

Home.getLayout = (page) => <>{page}</>

export default Home
