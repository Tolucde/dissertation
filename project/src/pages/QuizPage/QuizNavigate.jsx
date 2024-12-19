import React from 'react';
import { Navigation, Button } from './styles';

const QuizNavigation = ({ 
  onPrevious, 
  onNext, 
  onSubmit, 
  currentQuestion, 
  totalQuestions 
}) => (
  <Navigation>
    <Button 
      onClick={onPrevious}
      disabled={currentQuestion === 0}
    >
      Previous
    </Button>
    <Button onClick={onNext}>Skip</Button>
    <Button 
      onClick={onNext}
      disabled={currentQuestion === totalQuestions - 1}
    >
      Next
    </Button>
    <Button 
      variant="submit"
      onClick={onSubmit}
    >
      Submit Quiz
    </Button>
  </Navigation>
);

export default QuizNavigation;