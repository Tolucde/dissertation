import styled from 'styled-components'
import SearchBar from '../../components/SearchBar'
import ProgressOverview from '../../components/ProgressOverview'
import Recommendations from '../../components/Recommendations'
import NavigationButtons from '../../components/NavigationButtons'
import UserProfile from '../../components/UserProfile'

const DashboardContainer = styled.div`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`

const DashboardGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const FullWidthSection = styled.div`
  grid-column: 1 / -1;
`

const WideSection = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 2;
  }
`

const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardGrid>
        <FullWidthSection>
          <SearchBar />
        </FullWidthSection>

        <WideSection>
          <ProgressOverview />
        </WideSection>

        <UserProfile />

        <WideSection>
          <Recommendations />
        </WideSection>

        <NavigationButtons />
      </DashboardGrid>
    </DashboardContainer>
  )
}

export default Dashboard
