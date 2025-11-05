import React from 'react'
import { NextPageWithLayout } from '@/interfaces/layout'
import { MainLayout } from '@/components/layout'
import { HomeHero } from '@/components/home/hero'
import { HomeFeature } from '@/components/home/feature'
import { HomePopularContent } from '@/components/home/popular-contents'
import { HomeTestimonial } from '@/components/home/testimonial'
import { HomeOurMentors } from '@/components/home/mentors'
import { HomeNewsLetter } from '@/components/home/newsletter'

const NewHome: NextPageWithLayout = () => {
  return (
    <>
      <HomeHero />
      <HomePopularContent />
      <HomeFeature />
      <HomeTestimonial />
      <HomeOurMentors />
      <HomeNewsLetter />
    </>
  )
}

NewHome.getLayout = (page) => <MainLayout>{page}</MainLayout>

export default NewHome