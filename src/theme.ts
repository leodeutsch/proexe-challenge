import { green } from '@mui/material/colors';

export default {
  palette: {
    primary: {
      light: '#5FDCDE',
      main: '#35D4D6',
      dark: '#27BABD',
    },
    secondary: {
      main: '#40DBEE',
    },
    colors: {
      lightGrey: '#c6c9c7',
      grey: '#ADB5BD',
      black: '#000000',
      white: '#ffffff',
      purple: '#17139C',
      orange: '#F9A000',
      green: green[500],
    },
    error: {
      main: '#EB5758',
      light: '#F08587',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  fontFamily: 'roboto',
  bold: {
    fontWeight: 'bold',
  },
  normal: {
    fontWeight: 'normal',
  },
};
