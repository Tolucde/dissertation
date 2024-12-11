import styled from 'styled-components'
import { Card, Title } from '../sharedStyles'

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

const Recommendations = () => {
  // ... same recommendations data as before ...
  const recommendations = {
    currentLessons: [
      { id: 1, title: 'Introduction to React', progress: 60 },
      { id: 2, title: 'React Hooks Deep Dive', progress: 25 },
    ],
    suggestedCourses: [
      { id: 1, title: 'Advanced React Patterns', difficulty: 'Intermediate' },
      { id: 2, title: 'React Performance', difficulty: 'Advanced' },
    ],
  }
  return (
    <Card>
      <Title>My Learning</Title>

      <div>
        <SectionTitle>Continue Learning</SectionTitle>
        {recommendations.currentLessons.map((lesson) => (
          <LessonCard key={lesson.id}>
            <p>{lesson.title}</p>
            <ProgressBar>
              <Progress progress={lesson.progress} />
            </ProgressBar>
          </LessonCard>
        ))}
      </div>

      <div>
        <SectionTitle>Suggested Courses</SectionTitle>
        {recommendations.suggestedCourses.map((course) => (
          <CourseCard key={course.id}>
            <p>{course.title}</p>
            <Difficulty>{course.difficulty}</Difficulty>
          </CourseCard>
        ))}
      </div>
    </Card>
  )
}

export default Recommendations
