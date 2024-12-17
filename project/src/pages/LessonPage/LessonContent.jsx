import React, { memo } from 'react';
import {
  LessonText,
  BulletPoints
} from './style';

const LessonContent = memo(({ content, keyPoints }) => {
    console.log(content, keyPoints)
  return (
    <>
      <LessonText>
        <h2>Understanding React Components</h2>
        <p>{content}</p>
      </LessonText>

      <BulletPoints>
        {keyPoints?.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </BulletPoints>
    </>
  );
});

export default memo(LessonContent);