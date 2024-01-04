import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {CssVarsProvider, extendTheme} from "@mui/joy";


const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        neutral: {
          500: '#1F1F1F',
        }
      }
    }
  }
})

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <React.StrictMode>
      <CssVarsProvider theme={theme}>
        <App />
      </CssVarsProvider>
    </React.StrictMode>
  );


