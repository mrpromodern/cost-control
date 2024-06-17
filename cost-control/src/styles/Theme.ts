import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/x-date-pickers/locales';

export const purpleTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7e7e7eb5',
    },
    secondary: {
      main: '#8645ccba',
    },
    background: {
      default: '#ffffff',
    },
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      }
    },
  }
}, ruRU);