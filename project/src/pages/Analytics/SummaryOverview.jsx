import React from 'react';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const StatTitle = styled.h3`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
`;

const SummaryOverview = () => {
  return (
    <SummaryContainer>
      <StatCard>
        <StatTitle>Overall Progress</StatTitle>
        <StatValue>85%</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>Lessons Completed</StatTitle>
        <StatValue>24/30</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>Average Quiz Score</StatTitle>
        <StatValue>92%</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>Time Spent Learning</StatTitle>
        <StatValue>45h</StatValue>
      </StatCard>
    </SummaryContainer>
  );
};

export default SummaryOverview;