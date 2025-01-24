import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Title } from '../../sharedStyles'
import { useAppContext } from '../../AppContext'


const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const Button = styled.button`
  padding: 0.75rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  background: ${(props) => {
    switch (props.variant) {
      case 'quiz':
        return '#3b82f6'
      case 'lesson':
        return '#22c55e'
      case 'settings':
        return '#a855f7'
      default:
        return '#3b82f6'
    }
  }};
`

const NavigationButtons = () => {
  const {completedCourses, activeCourses, setActiveCourses, setCompletedCourses } = useAppContext()
  console.log(completedCourses)

  const navigate = useNavigate();

  return (
    <Card>
      <Title>Quick Access</Title>
      <ButtonsContainer>
        <Button variant='quiz' onClick={() => navigate('/my-quizzes')}>
          My Quizzes
        </Button>
        {/* <Button variant='lesson'>My CompletedLessons</Button> */}
        <Button  onClick={() => navigate('/onboarding')} variant='settings'>Settings</Button>
      </ButtonsContainer>
    </Card>
  )
}

export default NavigationButtons
