// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },  // Custom pricdmary color
  },
  components: {
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
      styleOverrides: {
        root: { marginBottom: '16px' }
      }
    }
  }
});

export default theme;
