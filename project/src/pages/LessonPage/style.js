// project/src/pages/Lesson/style.js
import styled from 'styled-components';

export const LessonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
`;

export const LessonHeader = styled.div`
  margin-bottom: 2rem;
`;

export const LessonTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
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