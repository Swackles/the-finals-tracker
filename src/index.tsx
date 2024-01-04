import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {CssVarsProvider  as JoyCssVarsProvider, extendTheme} from "@mui/joy";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';

const materialTheme = materialExtendTheme();

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
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider theme={theme}>
          <App />
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </React.StrictMode>
  );


