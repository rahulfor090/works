import { PaletteOptions } from '@mui/material'
import { grey, common } from '@mui/material/colors'

const palette: PaletteOptions = {
  mode: 'light',
  background: {
    default: '#F8F6F3', // Off-white background (NYC Ballet inspired)
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1C1C1C', // Charcoal Gray for elegant contrast
    secondary: '#717171',
    disabled: grey[500],
  },
  primary: {
    main: '#EEC1B7', // Soft Ballet Pink
    light: '#F5D9D2',
    dark: '#D8A89A',
    contrastText: '#1C1C1C',
  },
  secondary: {
    main: '#D8B179', // Muted Gold
    light: '#E8C99A',
    dark: '#C09A5A',
    contrastText: '#1C1C1C',
  },
  error: {
    main: '#B73E3E', // Warm Red for hover states
    light: '#D16A6A',
    dark: '#9A2E2E',
  },
}

export default palette
