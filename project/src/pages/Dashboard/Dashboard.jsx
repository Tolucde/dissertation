import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import SearchBar from './SearchBar'
import ProgressOverview from './ProgressOverview'
import Recommendations from './Recommendations'
import NavigationButtons from './NavigationButtons'
import UserProfile from './UserProfile'
import { useAppContext } from '../../AppContext'
import { useState } from 'react';


const DashboardContainer = styled.div`
  padding: 1.5rem;
  max-width: 1200px;
  margin-left: 0;
  
  @media (min-width: 768px) {
    margin-left: 240px;
  }
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
  height: fit-content;

`

const WideSection = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 2;
  }
`
const DashboardWrapper = styled.div`
  display: flex;
  position: relative;
  left: 0;
  width: 100%;
`
const Sidebar = styled.div`
  width: 240px;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem 1rem;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: ${props => props.isOpen ? '0' : '-240px'};
  top: 0;
  padding-top: 10rem;
  transition: left 0.3s ease-in-out;
  z-index: 90;

  @media (min-width: 768px) {
    left: 0;
  }
`
const HamburgerButton = styled.button`
  display: block;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 100;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 4px 0;
    transition: 0.4s;
  }
`

const SidebarButton = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 6px;
  background-color: ${props => props.active ? '#007bff' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  z-index: 1000; 
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#e9ecef'};
  }
    
`

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleLogout= () => {
    console.log("logging out")
    localStorage.removeItem('user');
    localStorage.clear();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <DashboardWrapper>
    <HamburgerButton onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </HamburgerButton>
      <Sidebar isOpen={isSidebarOpen}>
    <SidebarButton onClick={() => navigate('/analytics')}>
      Analytics
    </SidebarButton>
    <SidebarButton onClick={() => navigate('/performance-review')}>
      Performance Review
    </SidebarButton>
    <SidebarButton onClick={() => navigate('/onboarding')}>
      Onboarding
    </SidebarButton>
    <SidebarButton onClick={handleLogout}>
          Logout
        </SidebarButton>
  </Sidebar>
    <DashboardContainer>
      
      <DashboardGrid>
        <FullWidthSection>
          <SearchBar />
        </FullWidthSection>

        <WideSection>
          <ProgressOverview user={user} />
        </WideSection>

        <UserProfile handleLogout={handleLogout} user={user} />

        <WideSection>
          <Recommendations user={user} />
        </WideSection>

        <NavigationButtons />
      </DashboardGrid>
    </DashboardContainer>
    </DashboardWrapper>
  )
}

export default Dashboard
