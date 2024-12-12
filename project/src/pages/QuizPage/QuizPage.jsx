import React, { useState, useEffect } from 'react';
import {
  QuizContainer,
  Header,
  Title,
  Progress,
  Timer,
  QuestionSection,
  Question,
  AnswerOptions,
  AnswerOption,
  HintSection,
  HintText,
  FeedbackText,
  Navigation,
  Button,
  DialogOverlay,
  DialogContent
} from './styles';

const QuizPage = () => {
  // Sample quiz data - in real app, this would come from an API or props
  const quizData = {
    title: "Lesson 3 Quiz",
    timeLimit: 600,
    questions: [
      {
        id: 1,
        text: "What is the capital of France?",
        type: "multiple-choice",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris",
        hint: "This city is known as the City of Light"
      },
      // Add more questions as needed
    ]
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit);
  const [feedback, setFeedback] = useState("");
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const handleAnswerSelect = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer
    });
    setFeedback("");
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
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
    if (Object.keys(answers).length < quizData.questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setIsSubmitDialogOpen(true);
  };

  const confirmSubmit = () => {
    console.log("Quiz submitted:", answers);
    setIsSubmitDialogOpen(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <QuizContainer>
      <Header>
        <Title>{quizData.title}</Title>
        <Progress>
          Question {currentQuestion + 1} of {quizData.questions.length}
        </Progress>
        <Timer>
          Time Remaining: {formatTime(timeRemaining)}
        </Timer>
      </Header>

      <QuestionSection>
        <Question>
          <h2>Question {currentQuestion + 1}</h2>
          <p>{quizData.questions[currentQuestion].text}</p>
          
          <AnswerOptions>
            {quizData.questions[currentQuestion].options.map((option, index) => (
              <AnswerOption key={index}>
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleAnswerSelect(option)}
                />
                {option}
              </AnswerOption>
            ))}
          </AnswerOptions>
        </Question>

        <HintSection>
          <Button onClick={() => setShowHint(!showHint)}>
            {showHint ? "Hide Hint" : "Show Hint"}
          </Button>
          {showHint && (
            <HintText>{quizData.questions[currentQuestion].hint}</HintText>
          )}
        </HintSection>

        {feedback && (
          <FeedbackText isCorrect={feedback === "correct"}>
            {feedback}
          </FeedbackText>
        )}
      </QuestionSection>

      <Navigation>
        <Button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button onClick={handleNext}>Skip</Button>
        <Button 
          onClick={handleNext}
          disabled={currentQuestion === quizData.questions.length - 1}
        >
          Next
        </Button>
        <Button 
          variant="submit"
          onClick={handleSubmit}
        >
          Submit Quiz
        </Button>
      </Navigation>

      {isSubmitDialogOpen && (
        <DialogOverlay>
          <DialogContent>
            <h3>Are you sure you want to submit?</h3>
            <p>You cannot change your answers after submission.</p>
            <Button onClick={confirmSubmit}>Yes, Submit</Button>
            <Button onClick={() => setIsSubmitDialogOpen(false)}>Cancel</Button>
          </DialogContent>
        </DialogOverlay>
      )}
    </QuizContainer>
  );
};

export default QuizPage;