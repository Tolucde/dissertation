import React from 'react';
import { HintSection, HintText, Button } from './styles';

const QuizHint = ({ hint, showHint, onToggleHint }) => (
  <HintSection>
    <Button onClick={onToggleHint}>
      {showHint ? "Hide Hint" : "Show Hint"}
    </Button>
    {showHint && <HintText>{hint}</HintText>}
  </HintSection>
);

export default QuizHint;