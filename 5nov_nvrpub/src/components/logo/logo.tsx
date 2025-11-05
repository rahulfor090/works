import React, { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'

interface Props {
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  href?: string
}

const DEFAULT_LOGO = 'https://d45jl3w9libvn.cloudfront.net/jaypee/static/img/pub/header-jaypee.png'

const Logo: FC<Props> = ({ onClick, variant, href }) => {
  const [logoUrl, setLogoUrl] = useState<string>(DEFAULT_LOGO)

  useEffect(() => {
    let cancelled = false
    const loadLogo = async () => {
      try {
        const res = await fetch('/api/settings/logo')
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled && data?.logoUrl) {
          setLogoUrl(data.logoUrl)
        }
      } catch {}
    }
    loadLogo()
    return () => { cancelled = true }
  }, [])

  const logoContent = (
    <Box onClick={onClick} sx={{ cursor: href ? 'pointer' : 'default' }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 700, '& span': { color: variant === 'primary' ? 'primary.main' : 'unset' } }}
      >
        <img src={logoUrl} alt="jaypeedigi" />
      </Typography>
    </Box>
  )

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        {logoContent}
      </Link>
    )
  }

  return logoContent
}

Logo.defaultProps = {
  variant: 'primary',
}

export default Logo
