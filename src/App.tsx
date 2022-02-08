import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import MainRouter from './routes/Main';
import defaultTheme from './theme';

function App() {
  const myTheme = createTheme(defaultTheme);

  return (
    <ThemeProvider theme={myTheme}>
      <MainRouter />
    </ThemeProvider>
  );
}

export default App;
