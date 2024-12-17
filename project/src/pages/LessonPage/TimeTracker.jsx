import React, { memo } from 'react';
import { FiClock } from 'react-icons/fi';

import { TimeTracker as TimeTrackerStyle } from './style';

const TimeTracker = ({ timeSpent }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <TimeTrackerStyle>
      <FiClock />
      <span>Time spent: {formatTime(timeSpent)}</span>
    </TimeTrackerStyle>
  );
};

export default memo(TimeTracker);