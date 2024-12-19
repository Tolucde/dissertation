import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

import {
  QuizContainer,
  Header,
  Title,
  Progress,
  QuestionSection,
  FeedbackText,
} from './styles';
import QuizHint from './QuizHint';
import QuestionContent from './QuestionContent';
import QuizNavigation from './QuizNavigate';
import SubmitDialog from './SubmitDialog';
import ResultsModal from './ResultsModal';

const QuizPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
const {_id: userId, name} = JSON.parse(localStorage.getItem('user'));

const {currentLesson, setCurrentLesson} = useAppContext();
  const {quiz, difficulty, title, courseTitle, courseId, index} = useLocation().state;
  console.log(useLocation().state)

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [quizScore, setQuizScore] = useState(null);


  const navigate = useNavigate();

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / quiz.length) * 100;
  };

  const handleAnswerSelect = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer
    });
    setFeedback("");
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowHint(false);
      setFeedback("");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowHint(false);
      setFeedback("");
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < quiz.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setIsSubmitDialogOpen(true);
  };

  const confirmSubmit = async () => {
    console.log(courseId)
    try {
      const score = calculateScore();
      const response = await fetch(`${API_URL}/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: courseId,
          quizIndex: currentQuestion,
          score: score,
          userId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      setQuizScore(score);
      setFeedback(`${name}, Your score: ${score}%`);
      setShowResultsModal(true);
      

    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    }
    setIsSubmitDialogOpen(false);
  };

  const handlePreviousLesson = () => {
    setCurrentLesson((prev) => prev - 1)
    navigate('/lessonPage',{state:{ courseTitle, difficulty}})
  };

  const handleNextLesson = () => {
    setCurrentLesson((prev) => prev + 1)
    navigate('/lessonPage',{state:{ courseTitle, difficulty}})
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <QuizContainer>
 {/* ... existing JSX ... */}

 {showResultsModal && (
        <ResultsModal
          score={quizScore}
          totalQuestions={quiz.length}
          onPreviousLesson={handlePreviousLesson}
          onNextLesson={handleNextLesson}
          onClose={() => setShowResultsModal(false)}
        />
      )}
      
      {/* ... existing JSX ... */}

      <Header>
        <Title>{title}</Title>
        <Progress>
          Question {currentQuestion + 1} of {quiz.length}
        </Progress>
        {/* <Timer>
          Time Remaining: {formatTime(timeRemaining)}
        </Timer> */}
      </Header>

      <QuestionSection>
      <QuestionContent
        questionData={quiz[currentQuestion]}
        currentQuestion={currentQuestion}
        selectedAnswer={answers[currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
      />

<QuizHint hint={quiz[currentQuestion].hint}
        showHint={showHint}
        onToggleHint={() => setShowHint(!showHint)}
      />

        {feedback && (
          <FeedbackText isCorrect={feedback === "correct"}>
            {feedback}
          </FeedbackText>
        )}
      </QuestionSection>

      <QuizNavigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        currentQuestion={currentQuestion}
        totalQuestions={quiz.length}
      />

{isSubmitDialogOpen && (
        <SubmitDialog
          onConfirm={confirmSubmit}
          onCancel={() => setIsSubmitDialogOpen(false)}
        />
      )}
    </QuizContainer>
  );
};

export default QuizPage;