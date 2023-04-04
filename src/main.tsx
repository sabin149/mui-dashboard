import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'App';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from 'theme/index';
import 'simplebar-react/dist/simplebar.min.css';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
