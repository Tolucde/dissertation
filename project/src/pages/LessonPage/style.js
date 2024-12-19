// project/src/pages/Lesson/style.js
import styled from 'styled-components';

export const LessonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
    flex: 1;
  padding: 20px;
`;

export const LessonHeader = styled.div`
  margin-bottom: 2rem;
`;
export const CourseTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 8px;
  font-weight: 500;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
  color: #666;
  `;
  
  export const LessonTitle = styled.h2`
  color: #333;
  margin: 0;
  padding: 1rem 0;
  font-weight: 600;
  font-size: 1.8rem;
`;

export const ProgressIndicator = styled.div`
  font-size: 1.1rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .progress-bar {
    width: 200px;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    
    .fill {
      height: 100%;
      background: #4CAF50;
      transition: width 0.3s ease;
    }
  }
`;

export const LessonContent = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const LessonText = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 2rem;
`;

export const BulletPoints = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 2rem 0;
  
  li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    
    &:before {
      content: "•";
      color: #4CAF50;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
`;

export const TimeTracker = styled.div`
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: #666;
  }
`;

export const GamificationSection = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 8px;
`;

export const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  img {
    width: 50px;
    height: 50px;
  }
`;

export const Streak = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff6b6b;
  font-weight: bold;
`;

export const XPCounter = styled.div`
  background: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &.primary {
    background: #4CAF50;
    color: white;
    
    &:hover {
      background: #45a049;
    }
  }
  
  &.secondary {
    background: #f5f5f5;
    color: #333;
    
    &:hover {
      background: #e0e0e0;
    }
  }
`;

export const BookmarkButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #4CAF50;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

export const DownloadPDF = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:hover {
    background: #f5f5f5;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

export const QuizButton = styled(Button)`
  background: #2196F3;
  color: white;
  
  &:hover {
    background: #1976D2;
  }
`;

export const FlashcardsSection = styled.div`
  margin: 2rem 0;
  padding: 1rem;
`;

export const FlashcardContainer = styled.div`
  perspective: 1000px;
  margin-bottom: 1rem;
`;

export const Flashcard = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  cursor: pointer;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  transition: transform 0.6s;
`;

export const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 8px;
  background: ${props => props.isFront ? '#ffffff' : '#f8f9fa'};
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const CardFront = styled(CardSide)``;

export const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
`;






export const ProgressBar = styled.div`
  background: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
`;

export const QuizSection = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export const QuizQuestion = styled.div`
  margin-bottom: 20px;
`;

export const QuestionText = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const OptionButton = styled.button`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${props => props.selected ? '#e3f2fd' : 'white'};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  text-align: left;
  
  &:hover {
    background: ${props => props.disabled ? null : '#f5f5f5'};
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 24px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const ResultsSection = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export const ScoreDisplay = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const NextLessonButton = styled(SubmitButton)`
  background: #4caf50;
`;

export const RetryButton = styled(SubmitButton)`
  background: #f44336;
`;

export const DifficultyBadge = styled.span`
  background: #e3f2fd;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
  display: inline-block;
`;

export const CourseContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

 export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

export const Section = styled.section`
  margin: 20px 0;
`;

export  const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #444;
  margin-bottom: 15px;
`;

export const LessonCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;



export const Description = styled.p`
  line-height: 1.6;
  color: #666;
`;

export const LessonPageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  padding-left: 250px; 

`;

// export const Sidebar = styled.div`
//   width: 250px;
//   background-color: #f5f5f5;
//   padding: 20px 0;
//   border-right: 1px solid #e0e0e0;
// `;
export const Sidebar = styled.div`
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px 0;
  border-right: 1px solid #e0e0e0;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  overflow-y: auto; // Allows scrolling if lesson list is too long
`;


export const LessonTab = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  border-left: 4px solid ${props => props.isActive ? '#4CAF50' : 'transparent'};
  background-color: ${props => props.isActive ? '#e8f5e9' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.isActive ? '#e8f5e9' : '#eeeeee'};
  }
`;

