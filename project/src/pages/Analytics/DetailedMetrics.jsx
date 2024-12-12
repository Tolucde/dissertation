import React from 'react';
import styled from 'styled-components';

const MetricsContainer = styled.div`
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

const LessonList = styled.div`
  display: grid;
  gap: 1rem;
`;

const LessonItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const EngagementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const EngagementCard = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const DetailedMetrics = () => {
  const lessons = [
    {
      name: 'Introduction to React',
      lastScore: 95,
      avgScore: 92,
      timeSpent: '2h 30m',
      attempts: 2,
      difficulty: 'Intermediate'
    },
    // Add more lessons...
  ];

  return (
    <MetricsContainer>
      <Section>
        <SectionTitle>Per-Lesson Performance</SectionTitle>
        <LessonList>
          <LessonItem style={{ fontWeight: 'bold' }}>
            <div>Lesson Name</div>
            <div>Last Score</div>
            <div>Avg Score</div>
            <div>Time Spent</div>
            <div>Attempts</div>
          </LessonItem>
          {lessons.map((lesson, index) => (
            <LessonItem key={index}>
              <div>{lesson.name}</div>
              <div>{lesson.lastScore}%</div>
              <div>{lesson.avgScore}%</div>
              <div>{lesson.timeSpent}</div>
              <div>{lesson.attempts}</div>
            </LessonItem>
          ))}
        </LessonList>
      </Section>

      <Section>
        <SectionTitle>Engagement Analytics</SectionTitle>
        <EngagementGrid>
          <EngagementCard>
            <h4>Active Days</h4>
            <p>15 days this month</p>
          </EngagementCard>
          <EngagementCard>
            <h4>Average Session</h4>
            <p>45 minutes</p>
          </EngagementCard>
          <EngagementCard>
            <h4>Peak Learning Time</h4>
            <p>Evening (6-8 PM)</p>
          </EngagementCard>
        </EngagementGrid>
      </Section>
    </MetricsContainer>
  );
};

export default DetailedMetrics;