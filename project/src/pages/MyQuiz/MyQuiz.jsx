import React from 'react';
import styled from 'styled-components';
import { Card, Title } from '../../sharedStyles';

const QuizzesContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 1rem;
`;

const QuizCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const QuizTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #1f2937;
`;

const QuizInfo = styled.p`
  margin: 0;
  color: #6b7280;
`;

const QuizzesPage = () => {
  const quizzes = [
    {
      id: 1,
      title: 'JavaScript Basics',
      questionsCount: 10,
      timeLimit: '20 minutes',
      completed: false,
    },
    {
      id: 2,
      title: 'React Fundamentals',
      questionsCount: 15,
      timeLimit: '30 minutes',
      completed: true,
    },
    // Add more quizzes as needed
  ];

  return (
    <div>
      <Title>My Quizzes</Title>
      <QuizzesContainer>
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id}>
            <QuizTitle>{quiz.title}</QuizTitle>
            <QuizInfo>{quiz.questionsCount} questions • {quiz.timeLimit}</QuizInfo>
            <QuizInfo>
              Status: {quiz.completed ? 'Completed' : 'Not attempted'}
            </QuizInfo>
          </QuizCard>
        ))}
      </QuizzesContainer>
    </div>
  );
};

export default QuizzesPage;