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
        primary: {
          50: '#fff1f1',
          100: '#ffe4e4',
          200: '#fdced1',
          300: '#fba6ab',
          400: '#f9737f',
          500: '#f14256',
          600: '#d31f3c',
          700: '#bb1534',
          800: '#9c1532',
          900: '#861531',
        },
        neutral: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#1F1F1F',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
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


