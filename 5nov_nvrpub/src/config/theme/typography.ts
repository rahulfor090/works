import { TypographyOptions } from '@mui/material/styles/createTypography'

// Serif font for headings (NYC Ballet inspired)
export const headingFontFamily = [
  '"Playfair Display", "Cormorant Garamond", "Libre Baskerville", Georgia, serif',
].join(',')

// Sans-serif font for body (modern and clean)
export const bodyFontFamily = [
  '"Lato", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
].join(',')

export const fontFamily = bodyFontFamily

const headingLineHeight = 1.3

const typography: TypographyOptions = {
  fontFamily: bodyFontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontFamily: headingFontFamily,
    fontSize: 72,
    lineHeight: headingLineHeight,
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: headingFontFamily,
    fontSize: 56,
    lineHeight: headingLineHeight,
    fontWeight: 700,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: headingFontFamily,
    fontSize: 40,
    lineHeight: headingLineHeight,
    fontWeight: 600,
    letterSpacing: '0em',
  },
  h4: {
    fontFamily: headingFontFamily,
    fontSize: 32,
    lineHeight: headingLineHeight,
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
  h5: {
    fontFamily: headingFontFamily,
    fontSize: 24,
    lineHeight: 1.4,
    fontWeight: 600,
    letterSpacing: '0.02em',
  },
  h6: {
    fontFamily: headingFontFamily,
    fontSize: 20,
    lineHeight: 1.4,
    fontWeight: 600,
    letterSpacing: '0.03em',
  },
  body1: {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    letterSpacing: '0.01em',
  },
  body2: {
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0.01em',
  },
  subtitle1: {
    fontSize: '0.95rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  subtitle2: {
    fontSize: '0.875rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontWeight: 500,
  },
}

export default typography
