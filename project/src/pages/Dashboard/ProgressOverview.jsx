import { useState, useEffect } from 'react'

import styled from 'styled-components'
import { Card, Title } from '../../sharedStyles'

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

const StatCard = styled.div`
  background: ${(props) => props.bgcolor || '#f8fafc'};
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
  const progressData = {
    quizScore: 85,
    lessonsCompleted: 12,
    totalLessons: 20,
    timeSpent: '24h 30m',
    engagementLevel: 'High',
  }

const ProgressOverview = ({ user }) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL

  const [quizAverage, setQuizAverage] = useState(0)
  const fetchQuizAverage = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/quiz/average/${user._id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch quiz average')
      }
      const data = await response.json()
      setQuizAverage(data.averageScore)
    } catch (error) {
      console.error('Error fetching quiz average:', error)
      setQuizAverage(0)
    }
  }
  // Add useEffect to fetch data when component mounts
  useEffect(() => {
    if (user?._id) {
      fetchQuizAverage()
    }
  }, [user])
  return (
    <Card>
      <Title>Your Progress</Title>
      <StatsGrid>
        <StatCard bgcolor='#eff6ff'>
          <StatLabel>Quiz Average</StatLabel>
          <StatValue>{quizAverage ? (quizAverage * 10).toFixed(2) : 0}%</StatValue>
        </StatCard>
        <StatCard bgcolor='#f0fdf4'>
          <StatLabel>Lessons Completed</StatLabel>
          <StatValue>
            {user?.progress?.lessonsCompleted}
          </StatValue>
        </StatCard>
        <StatCard bgcolor='#f5f3ff'>
          <StatLabel>Time Spent</StatLabel>
          <StatValue>{user?.progress?.totalTimeSpent}</StatValue>
        </StatCard>
        <StatCard bgcolor='#fefce8'>
          <StatLabel>Engagement Level</StatLabel>
          <StatValue>{progressData.engagementLevel}</StatValue>
        </StatCard>
      </StatsGrid>
    </Card>
  )
}

export default ProgressOverview
