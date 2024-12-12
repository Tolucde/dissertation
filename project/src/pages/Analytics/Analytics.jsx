import React from 'react';
import styled from 'styled-components';
import SummaryOverview from './SummaryOverview';
import VisualizationSection from './VisualizationSection';
import DetailedMetrics from './DetailedMetrics';
import RecommendAnalytics from './RecommendAnalytics';
import Achievements from './Achievements';
// import ExportOptions from './components/ExportOptions';

const AnalyticsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f7fa;
`;
const HeaderContainer = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
`;

const Analytics = () => {
  return (
    <AnalyticsContainer>
      <HeaderContainer>
      <Title>Performance Analytics</Title>
      <Subtitle>Track your progress and improve your learning journey</Subtitle>
    </HeaderContainer>
      <SummaryOverview />
      <VisualizationSection />
      <DetailedMetrics />
      <RecommendAnalytics/>
      <Achievements />
      {/* <ExportOptions /> */}
    </AnalyticsContainer>
  );
};

export default Analytics;