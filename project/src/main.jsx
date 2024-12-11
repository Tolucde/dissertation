import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#22c55e',
    tertiary: '#a855f7',
    background: '#f8fafc',
    text: '#1e293b',
  },
  breakpoints: {
    md: '768px',
    lg: '1024px',
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
