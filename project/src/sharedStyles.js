import styled from 'styled-components'

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