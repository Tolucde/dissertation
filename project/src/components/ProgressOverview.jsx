import styled from 'styled-components'
import { Card, Title } from '../sharedStyles'

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

const StatCard = styled.div`
  background: ${(props) => props.bgColor || '#f8fafc'};
  padding: 1rem;
  border-radius: 8px;
`

const StatLabel = styled.h3`
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
`

const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e293b;
`

const ProgressOverview = () => {
  const progressData = {
    quizScore: 85,
    lessonsCompleted: 12,
    totalLessons: 20,
    timeSpent: '24h 30m',
    engagementLevel: 'High',
  }

  return (
    <Card>
      <Title>Your Progress</Title>
      <StatsGrid>
        <StatCard bgColor='#eff6ff'>
          <StatLabel>Quiz Average</StatLabel>
          <StatValue>{progressData.quizScore}%</StatValue>
        </StatCard>
        <StatCard bgColor='#f0fdf4'>
          <StatLabel>Lessons Completed</StatLabel>
          <StatValue>
            {progressData.lessonsCompleted}/{progressData.totalLessons}
          </StatValue>
        </StatCard>
        <StatCard bgColor='#f5f3ff'>
          <StatLabel>Time Spent</StatLabel>
          <StatValue>{progressData.timeSpent}</StatValue>
        </StatCard>
        <StatCard bgColor='#fefce8'>
          <StatLabel>Engagement Level</StatLabel>
          <StatValue>{progressData.engagementLevel}</StatValue>
        </StatCard>
      </StatsGrid>
    </Card>
  )
}

export default ProgressOverview
