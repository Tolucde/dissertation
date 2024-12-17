import styled from 'styled-components'

import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#333',
    secondary: '#666',
    error: '#ff4444',
    border: '#ddd',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  // ... more theme variables
};

// ... existing styles ...

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #3498db;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

export const LoadingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;



export const Card = styled.div `
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const GridContainer = styled.div `
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(${(props) => props.columns || 2}, 1fr);
  }
`

export const Title = styled.h2 `
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
`