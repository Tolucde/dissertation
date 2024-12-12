// project/src/pages/Lesson/index.jsx
import React, { useState, useEffect } from 'react';
import { FiClock, FiBookmark, FiDownload, FiAward, FiHeart } from 'react-icons/fi';
import {
  LessonContainer,
  LessonHeader,
  LessonTitle,
  ProgressIndicator,
  LessonContent,
  LessonText,
  BulletPoints,
  TimeTracker,
  GamificationSection,
  Badge,
  Streak,
  XPCounter,
  ActionButtons,
  Button,
  BookmarkButton,
  DownloadPDF,
  QuizButton
} from './style';

const LessonPage = () => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(30);


  // project/src/pages/Lesson/lessonConfig.js
 const lessonContent = {
    id: 1,
    title: 'Introduction to React Fundamentals',
    totalLessons: 10,
    currentLesson: 3,
    content: `React components are the building blocks of any React application. They are
      reusable pieces of code that return HTML elements. Components can be either
      class-based or function-based, with function components being the more
      modern approach.`,
    keyPoints: [
      'Components are reusable UI elements',
      'They can accept props as inputs',
      'Components can maintain their own state',
      'React uses a virtual DOM for efficient rendering',
      'Components follow a unidirectional data flow'
    ],
    xpReward: 50,
    pdfUrl: '/path-to-pdf'
  };
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Add logic to save bookmark to backend
  };

  const handleDownloadPDF = () => {
    // Add logic to download PDF
    console.log('Downloading PDF...');
  };

  const handleStartQuiz = () => {
    // Add navigation logic to quiz
    console.log('Navigating to quiz...');
  };

  return (
    <LessonContainer>
      <LessonHeader>
        <LessonTitle>Introduction to React Fundamentals</LessonTitle>
        <ProgressIndicator>
          <span>Lesson 3 of 10</span>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${currentProgress}%` }} />
          </div>
        </ProgressIndicator>
      </LessonHeader>

      <LessonContent>
        <TimeTracker>
          <FiClock />
          <span>Time spent: {formatTime(timeSpent)}</span>
        </TimeTracker>

        <LessonText>
          <h2>Understanding React Components</h2>
          <p>
            React components are the building blocks of any React application. They are
            reusable pieces of code that return HTML elements. Components can be either
            class-based or function-based, with function components being the more
            modern approach.
          </p>
        </LessonText>

        <BulletPoints>
          <li>Components are reusable UI elements</li>
          <li>They can accept props as inputs</li>
          <li>Components can maintain their own state</li>
          <li>React uses a virtual DOM for efficient rendering</li>
          <li>Components follow a unidirectional data flow</li>
        </BulletPoints>

        <GamificationSection>
          <Badge>
            <FiAward size={24} />
            <span>React Rookie</span>
          </Badge>
          <Streak>
            <FiHeart />
            <span>5 Day Streak!</span>
          </Streak>
          <XPCounter>
            +50 XP
          </XPCounter>
        </GamificationSection>

        <ActionButtons>
          <BookmarkButton onClick={handleBookmark}>
            <FiBookmark color={isBookmarked ? '#4CAF50' : '#666'} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </BookmarkButton>

          <DownloadPDF onClick={handleDownloadPDF}>
            <FiDownload />
            Download Notes
          </DownloadPDF>

          <QuizButton onClick={handleStartQuiz}>
            Take Quiz
          </QuizButton>
        </ActionButtons>
      </LessonContent>
    </LessonContainer>
  );
};

export default LessonPage;