import React from 'react';
import styled from 'styled-components';

const AchievementsContainer = styled.div`
  margin-bottom: 2rem;
`;

const Section = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const Badge = styled.div`
  text-align: center;
  padding: 1rem;
  
  img {
    width: 64px;
    height: 64px;
    margin-bottom: 0.5rem;
  }
`;

const BadgeTitle = styled.h4`
  font-size: 0.9rem;
  color: #2c3e50;
  margin-bottom: 0.25rem;
`;

const BadgeDescription = styled.p`
  font-size: 0.8rem;
  color: #7f8c8d;
`;

const Achievements = () => {
  const badges = [
    {
      title: "Quick Learner",
      description: "Completed 5 lessons in one day",
      icon: "🏃‍♂️"
    },
    {
      title: "Perfect Score",
      description: "Achieved 100% in a quiz",
      icon: "🎯"
    },
    {
      title: "Consistent Learner",
      description: "Logged in for 7 days straight",
      icon: "📚"
    }
  ];

  return (
    <AchievementsContainer>
      <Section>
        <h3>Achievements & Badges</h3>
        <BadgesGrid>
          {badges.map((badge, index) => (
            <Badge key={index}>
              <div>{badge.icon}</div>
              <BadgeTitle>{badge.title}</BadgeTitle>
              <BadgeDescription>{badge.description}</BadgeDescription>
            </Badge>
          ))}
        </BadgesGrid>
      </Section>
    </AchievementsContainer>
  );
};

export default Achievements;