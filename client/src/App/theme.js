import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#78d851',
      dark: '#007600',
      main: '#41a61d',
      contrastText: '#e8f5e9',
    },
    secondary:{
      light: '#fff',
      main: '#e8f5e9',
      dark: '#b6c2b7',
      contrastText: '#424242',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;