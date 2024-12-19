import React, { memo } from 'react';
import { marked } from 'marked';

import {
  LessonText,
  BulletPoints
} from './style';

const LessonContent = memo(({ content, description, keyPoints }) => {
  return (
    <>
      <LessonText>
        <h4>{description}</h4>
        <p dangerouslySetInnerHTML={{ __html: marked(content) }} />

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