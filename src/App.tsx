import React from 'react'
import Menu from './components/layout/Menu'
import { ThemeProvider, createTheme } from '@mui/material';
import { DefaultTheme } from './components/material.theme';

function App() {
  return (
    <ThemeProvider theme={createTheme(DefaultTheme)}>
      <div className="App">
        <header className="App-header">
          <Menu />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;   
