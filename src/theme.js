import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

export const theme = extendTheme({
  socialMedia: {
    widthLeft: '10%',
    widthMain: '65%',
    widthRight: '25%'
  },
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#2b54ea'
    },
    third: {
      main: '#3F7000',
      more: '#E0EDCD'
    },
    background: {
      primary: '#f7f8fa',
      secondary: '#ffffff'
    },
    text: {
      primary: '#000000',
      secondary: '#65676b'
    },
    hashtag: {
      primary: '#1776f2'
    },
    error: {
      main: '#E23744'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          whiteSpace: 'nowrap',
          color: 'inherit',
          borderRadius: 'none',
          fontSize: 'inherit'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          minHeight: '80vh',
          minWidth: '75vw'
        }
      }
    },

  }

})