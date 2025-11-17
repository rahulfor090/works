import React from 'react'
import { NextPageWithLayout } from '@/interfaces/layout'
import HeaderNew from '@/components/home/layout/header-new'
import HeroNew from '@/components/home/sections/hero-new'
import StackCardsNew from '@/components/home/sections/stack-cards-new'
import IntroCardsNew from '@/components/home/sections/intro-cards-new'
import StatsNew from '@/components/home/sections/stats-new'
import FeaturedJournalsNew from '@/components/home/sections/featured-journals-new'
import NewReleasesNew from '@/components/home/sections/new-releases-new'
import SpecialtiesNew from '@/components/home/sections/specialties-new'
import TestimonialsNew from '@/components/home/sections/testimonials-new'
import MentorsNew from '@/components/home/sections/mentors-new'
import NewsletterNew from '@/components/home/sections/newsletter-new'
import FooterNew from '@/components/home/layout/footer-new'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <HeaderNew />
      <HeroNew />
      <StackCardsNew />
      <IntroCardsNew />
      <StatsNew />
      <FeaturedJournalsNew />
      <NewReleasesNew />
      <SpecialtiesNew />
      <TestimonialsNew />
      <MentorsNew />
      <NewsletterNew />
      <FooterNew />
    </>
  )
}

Home.getLayout = (page) => <>{page}</>

export default Home
