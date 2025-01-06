import { useState, useEffect } from 'react'

import styled from 'styled-components'
import { Card, Title } from '../../sharedStyles'
import { useAppContext } from '../../AppContext'

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


const ProgressOverview = ({ user }) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL
  const { fetchUserCourses, isLoading, currentStreak, setisLoading } = useAppContext()

  const [quizAverage, setQuizAverage] = useState(0)
  const [completedCourses, setCompletedCourses] = useState()
  const [activeCourses, setActiveCourses] = useState()

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
 
  
  useEffect(() => {
    const fetchCourses = async () => {
      setisLoading(true)
      if (user?._id) {
        const courses = await fetchUserCourses(user._id);
        setCompletedCourses(courses.completedCourses.length)
        setActiveCourses(courses.activeCourses)
        setisLoading(false)
      }
    };
    fetchCourses();
  }, [user]);
console.log(activeCourses, completedCourses)

  // Add useEffect to fetch data when component mounts
  // useEffect(() => {
  //   if (user?._id) {
  //     fetchQuizAverage()
  //   }
  // }, [user])
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <Title>Your Progress</Title>
      <StatsGrid>
        <StatCard bgcolor='#eff6ff'>
          <StatLabel>Quiz Average</StatLabel>
          {/* <StatValue>{quizAverage ? (quizAverage * 10).toFixed(2) : 0}%</StatValue> */}
        </StatCard>
        <StatCard bgcolor='#f0fdf4'>
          <StatLabel>Lessons Completed</StatLabel>
        <StatValue>
            {completedCourses }</StatValue>
        </StatCard>
        <StatCard bgcolor='#f5f3ff'>
          <StatLabel>Streak</StatLabel>
          {/* <StatValue>{`${currentStreak} ${currentStreak > 1 ? "days" : "day"}`}</StatValue> */}
          <StatValue>3 days</StatValue>

        </StatCard>
        <StatCard bgcolor='#fefce8'>
          <StatLabel>Lessons Progress</StatLabel>
          <StatValue>
  {!activeCourses?.length ? (!!completedCourses ? "100%" : "No Course Started") : ""}
</StatValue>

          <StatValue>{((!!activeCourses?.length || completedCourses>0) && completedCourses/(completedCourses + activeCourses?.length) * 100)}%</StatValue>
        </StatCard>
      </StatsGrid>
    </Card>
  )
}

export default ProgressOverview
