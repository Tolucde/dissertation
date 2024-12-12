import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, 
         PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SectionContainer = styled.div`
  margin-bottom: 2rem;
`;

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const VisualizationSection = () => {
  // Sample data - replace with real data
  const quizData = [
    { name: 'Week 1', score: 85 },
    { name: 'Week 2', score: 90 },
    { name: 'Week 3', score: 88 },
    { name: 'Week 4', score: 95 },
  ];

  const skillData = [
    { subject: 'Programming', A: 90 },
    { subject: 'Problem Solving', A: 85 },
    { subject: 'Data Structures', A: 75 },
    { subject: 'Algorithms', A: 80 },
    { subject: 'Web Dev', A: 95 },
  ];

  return (
    <SectionContainer>
      <ChartContainer>
        <ChartTitle>Quiz Scores Over Time</ChartTitle>
        <LineChart width={800} height={300} data={quizData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
        </LineChart>
      </ChartContainer>

      <ChartContainer>
        <ChartTitle>Skill Mastery</ChartTitle>
        <RadarChart width={500} height={300} data={skillData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ChartContainer>
    </SectionContainer>
  );
};

export default VisualizationSection;