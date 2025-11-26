import React, { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'
import SiteNavbar from '@/components/layout/SiteNavbar'
import SiteFooter from '@/components/layout/SiteFooter'

interface Props {
  children: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box component="main">
      <SiteNavbar />
      <Box sx={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
        {children}
      </Box>
      <SiteFooter />
    </Box>
  )
}

export default MainLayout
