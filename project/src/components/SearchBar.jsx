import styled from 'styled-components'
import { Card } from '../sharedStyles'

const SearchContainer = styled(Card)`
  /* width: 100%; */
`

const SearchInput = styled.input`
  width: 70%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`

const SearchBar = () => {
  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search logic
  }

  return (
    <SearchContainer>
      <form onSubmit={handleSearch}>
        <SearchInput type='text' placeholder='Search for courses...' />
      </form>
    </SearchContainer>
  )
}

export default SearchBar
