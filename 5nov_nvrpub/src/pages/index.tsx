import React from 'react'
import { NextPageWithLayout } from '@/interfaces/layout'
import HomePage from '@/app/new-home/HomePage'

const Home: NextPageWithLayout = () => {
  return (
    <HomePage />
  )
}

Home.getLayout = (page) => <>{page}</>

export default Home
