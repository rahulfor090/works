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
    main: '#A86064', // Deep Dusty Rose (Accessible)
    light: '#EEC1B7', // Soft Ballet Pink (Original Pastel)
    dark: '#7D3E42',
    contrastText: '#FFFFFF', // Changed to White for better contrast on darker main
  },
  secondary: {
    main: '#96723B', // Antique Bronze (Accessible)
    light: '#D8B179', // Muted Gold (Original Pastel)
    dark: '#684D26',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#B73E3E', // Warm Red for hover states
    light: '#D16A6A',
    dark: '#9A2E2E',
  },
}

export default palette
