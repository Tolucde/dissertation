import styled from 'styled-components'
import { Card } from '../sharedStyles'

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #e2e8f0;
  margin-right: 1rem;
`

const UserInfo = styled.div`
text-transform: capitalize;
  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1e293b;

    
  }

  p {
    color: #64748b;
text-transform: capitalize;

  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

const StatBox = styled.div`
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 8px;
  text-transform: capitalize;

  h3 {
    font-size: 0.875rem;
    color: #64748b;
  }

  p {
    font-weight: bold;
    color: #1e293b;
  }
`
const InterestsList = styled.div`
  margin-top: 1rem;

  h3 {
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 0.5rem;
  }
`

const InterestTag = styled.span`
  display: inline-block;
  background: #e2e8f0;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  color: #1e293b;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`

const LogoutButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`
const UserProfile = () => {
const user = JSON.parse(localStorage.getItem('user'))
  
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...')
  }

  return (
    <Card>
      <ProfileHeader>
        <Avatar />
        <UserInfo>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          
        </UserInfo>
      </ProfileHeader>

      <StatsGrid>
        <StatBox>
          <h3>Level</h3>
          <p>{user?.difficulty}</p>
        </StatBox>
        <StatBox>
          <h3>Courses</h3>
          {/* <p>{user.coursesEnrolled}</p> */}
        </StatBox>
      </StatsGrid>
      <InterestsList>
        <h3>Interests</h3>
        {user?.interests?.length > 0 && user?.interests?.map((interest, index) => (
          <InterestTag key={index}>{interest}</InterestTag>
        ))}
      </InterestsList>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Card>
  )
}

export default UserProfile
