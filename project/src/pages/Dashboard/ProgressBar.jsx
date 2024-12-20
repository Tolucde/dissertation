// project/src/components/Progress/index.jsx
import React from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div`
  width: 200px;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const Progress = ({ progress }) => {
  return (
    <ProgressBar>
      <ProgressFill progress={progress} />
    </ProgressBar>
  );
};

export default Progress;