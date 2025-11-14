import React from 'react'
import { NextPageWithLayout } from '@/interfaces/layout'
import HeaderNew from '@/components/home/header-new'
import HeroNew from '@/components/home/hero-new'
import StackCardsNew from '@/components/home/stack-cards-new'
import IntroCardsNew from '@/components/home/intro-cards-new'
import StatsNew from '@/components/home/stats-new'
import FeaturedJournalsNew from '@/components/home/featured-journals-new'
import NewReleasesNew from '@/components/home/new-releases-new'
import SpecialtiesNew from '@/components/home/specialties-new'
import TestimonialsNew from '@/components/home/testimonials-new'
import MentorsNew from '@/components/home/mentors-new'
import NewsletterNew from '@/components/home/newsletter-new'
import FooterNew from '@/components/home/footer-new'

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
