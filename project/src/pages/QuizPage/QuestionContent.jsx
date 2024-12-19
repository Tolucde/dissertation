import React from 'react';
import { QuestionSection, Question, AnswerOptions, AnswerOption } from './styles';

const QuestionContent = ({ questionData, currentQuestion, selectedAnswer, onAnswerSelect }) => (
  <QuestionSection>
    <Question>
      <h2>Question {currentQuestion + 1}</h2>
      <p>{questionData.question}</p>
      
      <AnswerOptions>
        {questionData.options.map((option, index) => (
          <AnswerOption key={index}>
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelect(option)}
            />
            {option}
          </AnswerOption>
        ))}
      </AnswerOptions>
    </Question>
  </QuestionSection>
);

export default QuestionContent;