import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import { Card, Title } from '../../sharedStyles'
import { useAppContext } from '../../AppContext'

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const LessonCard = styled.div`
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  &:hover {
    background: #e2e8f0;
  }
`

const ProgressBar = styled.div`
  background: #e2e8f0;
  height: 8px;
  border-radius: 4px;
  margin-top: 0.5rem;
`

const Progress = styled.div`
  background: #3b82f6;
  height: 100%;
  border-radius: 4px;
  width: ${(props) => props.progress}%;
`

const CourseCard = styled(LessonCard)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Difficulty = styled.span`
  font-size: 0.875rem;
  color: #64748b;
`

const Recommendations = ({user}) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL
  const { handleCourseSelect, fetchUserCourses, isLoading , setIsLoading} = useAppContext();

  const [activeCourses, setActiveCourses] = useState([])
  const navigate = useNavigate();

  const [recommendedCourses, setRecommendedCourses] = useState([])

  const recommendations = {
    currentLessons: [
      { id: 1, title: 'Introduction to React', progress: 60 },
      { id: 2, title: 'React Hooks Deep Dive', progress: 25 },
    ],
    recommendedCourses: [
      { id: 1, title: 'Advanced React Patterns', difficulty: 'Intermediate' },
      { id: 2, title: 'React Performance', difficulty: 'Advanced' },
    ],
  }
  useEffect(() => {
    const fetchCourses = async () => {
      if (user?._id) {
        console.log(user._id);
        const courses = await fetchUserCourses(user._id);
        setActiveCourses(courses.activeCourses)
      }
    };
    fetchCourses();
  }, [user]);
  console.log(activeCourses)

  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/recommendations/performance`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_interests: user?.interests || [],
            difficulty_level: 'Intermediate',
            top_n: 5, 
            n_clusters: 5 
          })
        })
        const data = await response.json()
        setRecommendedCourses(data.recommendations)
      } catch (error) {
        console.error('Error fetching recommended courses:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendedCourses()
  }, [user])

  return (
    <Card>
      <Title>My Learning</Title>

      <div>
        <SectionTitle>Continue Learning</SectionTitle>
        {activeCourses.map((course) => (
          <LessonCard style={{cursor: 'pointer'}} key={course.courseId} onClick={() => handleCourseSelect(course.title)}>
            <p>{course.title}</p>
            <ProgressBar>
              <Progress progress={course.quizzesCompleted * 33.33} />
            </ProgressBar>
          </LessonCard>
        ))}
      </div>

      <div>
      <SectionTitle>Recommended Courses</SectionTitle>
        {isLoading ? (
          <LessonCard>Loading recommendations...</LessonCard>
        ) : (
          recommendedCourses.map((course, index) => (
            <CourseCard key={index}
            style={{ cursor: 'pointer' }}
            onClick={() => handleCourseSelect(course.course, course.difficulty)}
            >
              <p>{course.course}</p>
              <Difficulty>{course.difficulty}</Difficulty>
            </CourseCard>
          ))
        )}
      </div>
    </Card>
  )
}

export default Recommendations
