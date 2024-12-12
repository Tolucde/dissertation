import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
  
  span {
    color: #3498db;
  }
`;

const Tagline = styled.h2`
  font-size: 1.5rem;
  color: #34495e;
  text-align: center;
  margin-bottom: 2rem;
`;

const ContentSection = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextContent = styled.div`
  flex: 1;
  padding: 2rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;

  li {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    color: #2c3e50;

    &:before {
      content: "✓";
      color: #3498db;
      margin-right: 1rem;
    }
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #3498db;
  color: white;

  &:hover {
    background-color: #2980b9;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: #3498db;
  border: 2px solid #3498db;
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Logo>
        Learn<span>AI</span>
      </Logo>
      <Tagline>Personalized Learning Powered by Artificial Intelligence</Tagline>

      <ContentSection>
        <TextContent>
          <h2>Transform Your Learning Journey</h2>
          <FeaturesList>
            <li>Personalized learning paths tailored to your goals</li>
            <li>AI-powered content recommendations</li>
            <li>Interactive learning experiences</li>
            <li>Real-time progress tracking</li>
            <li>Adaptive assessment system</li>
          </FeaturesList>
          <ButtonGroup>
            <PrimaryButton onClick={() => navigate('/login')}>
              Get Started
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate('/login')}>
              Login
            </SecondaryButton>
          </ButtonGroup>
        </TextContent>

        <ImageSection>
          <img 
            src="/assets/learning-illustration.svg" 
            alt="AI-powered learning illustration"
          />
        </ImageSection>
      </ContentSection>
    </HomeContainer>
  );
};

export default HomePage;