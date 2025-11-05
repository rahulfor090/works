import React, { FC } from 'react'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import type { Navigation } from '@/interfaces/navigation'
import { navigations as headerNavigations } from '@/components/navigation/navigation.data'
import { FooterSectionTitle } from '@/components/footer'

const courseMenu: Array<Navigation> = [
  {
    label: 'About us',
    path: '/',
  },
  {
    label: 'Privacy & Policy',
    path: '/',
  },
  {
    label: 'Terms & Condition',
    path: '/',
  },
  {
    label: 'DigiNerve',
    path: '/',
  },
  {
    label: 'Events',
    path: '/',
  },
]

const pageMenu = headerNavigations

const companyMenu: Array<Navigation> = [
  { label: 'Need Help', path: '/' },
  { label: 'Contact Us', path: '/' },
  { label: 'Ask For A Trial', path: '/' },
  { label: 'E-Alert', path: '/' },
  { label: 'Careers', path: '/' },
  { label: 'FAQs', path: '/' },
  ]

interface NavigationItemProps {
  label: string
  path: string
}

const NavigationItem: FC<NavigationItemProps> = ({ label, path }) => {
  return (
    <MuiLink
      component={Link}
      href={path}
      underline="hover"
      sx={{
        display: 'block',
        mb: 1,
        color: 'primary.contrastText',
      }}
    >
      {label}
    </MuiLink>
  )
}

const FooterNavigation: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Information" />
        {courseMenu.map(({ label, path }, index) => (
          <NavigationItem key={`course-${index}-${label}`} label={label} path={path} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="Explore" />
        {pageMenu.map(({ label, path }, index) => (
          <NavigationItem key={`menu-${index}-${label}`} label={label} path={path} />
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <FooterSectionTitle title="ContactUs" />
        {companyMenu.map(({ label, path }, index) => (
          <NavigationItem key={`about-${index}-${label}`} label={label} path={path} />
        ))}
      </Grid>
    </Grid>
  )
}

export default FooterNavigation
