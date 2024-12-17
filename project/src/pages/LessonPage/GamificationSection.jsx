import React, { memo } from 'react';
import { FiAward, FiHeart } from 'react-icons/fi';
import {
  GamificationSection as GamificationWrapper,
  Badge,
  Streak,
  XPCounter
} from './style';

const GamificationSection = memo(({ streak, xp, badgeTitle = 'React Rookie' }) => {
  return (
    <GamificationWrapper>
      <Badge>
        <FiAward size={24} />
        <span>{badgeTitle}</span>
      </Badge>
      
      <Streak>
        <FiHeart />
        <span>{streak} Day Streak!</span>
      </Streak>
      
      <XPCounter>
        +{xp} XP
      </XPCounter>
    </GamificationWrapper>
  );
});

export default memo(GamificationSection);