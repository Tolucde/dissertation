import React from 'react';
import styled from 'styled-components';

const RecommendationsContainer = styled.div`
  margin-bottom: 2rem;
`;

const Section = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const RecommendationCard = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const RecommendationTitle = styled.h4`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const RecommendationText = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const RecommendAnalytics = () => {
  return (
    <RecommendationsContainer>
      <Section>
        <SectionTitle>Areas for Improvement</SectionTitle>
        <RecommendationCard>
          <RecommendationTitle>Data Structures</RecommendationTitle>
          <RecommendationText>
            Your performance in tree traversal algorithms could use some work. 
            Consider reviewing Binary Search Trees.
          </RecommendationText>
        </RecommendationCard>
      </Section>

      <Section>
        <SectionTitle>Recommended Next Steps</SectionTitle>
        <RecommendationCard>
          <RecommendationTitle>Advanced Algorithms Course</RecommendationTitle>
          <RecommendationText>
            Based on your strong performance in basic algorithms, 
            you're ready for advanced topics.
          </RecommendationText>
        </RecommendationCard>
      </Section>
    </RecommendationsContainer>
  );
};

export default RecommendAnalytics;