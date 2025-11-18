import React, { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'
import HeaderNew from '@/components/home/layout/header-new'
import FooterNew from '@/components/home/layout/footer-new'

interface Props {
  children: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Box component="main">
      <HeaderNew />
      <Box sx={{ paddingTop: '80px' }}>
        {children}
      </Box>
      <FooterNew />
    </Box>
  )
}

export default MainLayout
