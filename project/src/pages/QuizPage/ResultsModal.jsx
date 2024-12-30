import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  // Add your button styles here
`;

const ResultsModal = ({ score, totalQuestions, onPreviousLesson, onNextLesson, currentLesson, onClose }) => {
  const navigate = useNavigate();

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Quiz Results</h2>
        <p>Your Score: {score}%</p>
        <p>Correct Answers: {Math.round(score * totalQuestions / 100)} out of {totalQuestions}</p>
        <ButtonContainer>

        {currentLesson >0 ? (
            <Button onClick={onPreviousLesson}>Previous Lesson</Button>
           
          ) : (
            <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          )}

          {currentLesson < 2 ? (
            <Button onClick={onNextLesson}>Next Lesson</Button>
           
          ) : (
            <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          )}
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ResultsModal;