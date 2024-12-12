import styled from 'styled-components';

export const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Progress = styled.div`
  font-size: 1.2em;
  color: #666;
  margin: 10px 0;
`;

export const Timer = styled.div`
  font-size: 1.2em;
  color: #ff4444;
  font-weight: bold;
`;

export const QuestionSection = styled.main`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const Question = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AnswerOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

export const AnswerOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

export const HintSection = styled.div`
  margin: 20px 0;
`;

export const HintText = styled.p`
  color: #666;
  font-style: italic;
  margin-top: 10px;
`;

export const FeedbackText = styled.div`
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  background: ${({ isCorrect }) => isCorrect ? '#d4edda' : '#f8d7da'};
  color: ${({ isCorrect }) => isCorrect ? '#155724' : '#721c24'};
`;

export const Navigation = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ variant }) => 
    variant === 'submit' ? '#28a745' : '#007bff'};
  color: white;
  transition: opacity 0.2s;

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DialogContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;

  button {
    margin: 10px;
  }
`;