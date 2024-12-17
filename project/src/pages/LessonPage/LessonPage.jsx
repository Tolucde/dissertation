// project/src/pages/Lesson/index.jsx
import React, { useState, useEffect, useCallback, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppContext } from '../../AppContext';
import { FiClock, FiBookmark, FiDownload, FiAward, FiHeart } from 'react-icons/fi';
import {
  LessonContainer,
  LessonHeader,
  LessonTitle,
  ProgressIndicator,
  ActionButtons,
  BookmarkButton,
  DownloadPDF,
  QuizButton,
  
} from './style';
import LessonContent from './LessonContent';
import GamificationSection from './GamificationSection';
import Flashcards from './Flashcards';
import TimeTracker from './TimeTracker';
import { LoadingContainer, LoadingSpinner } from '../../sharedStyles';

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
  pdfUrl: '/path-to-pdf',
  flashcards: [
    {
      question: "What are React Components?",
      answer: "Reusable pieces of code that return HTML elements and can be used to build user interfaces."
    },
    {
      question: "What is the difference between class and function components?",
      answer: "Function components are the modern approach, using hooks for state management, while class components use lifecycle methods."
    },
    {
      question: "What is the Virtual DOM?",
      answer: "A lightweight copy of the actual DOM that React uses to optimize rendering performance."
    }
  ],
};

const LessonPage = () => {
  const { generateCourse } = useAppContext();
  const memoizedGenerateCourse = useCallback(generateCourse, []);

  const location = useLocation();
  const  courseTitle  = location.state.courseTitle;
  // const [lessons, setLessons] = useState([]);''
  const [timeSpent, setTimeSpent] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
const [isLoading, setIsLoading] = useState(true);
const [lesson, setLesson] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(30);

  console.log(isLoading)
  

 

  const [flippedCards, setFlippedCards] = useState(
    new Array(lessonContent.flashcards.length).fill(false)
  );

  // Memoize handlers with useCallback
  const handleFlipCard = useCallback((index) => {
    setFlippedCards(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  }, []);
  // Timer effect
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeSpent(prev => prev + 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

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


  useEffect(() => {
    const generateLessons = async () => {
      console.log('generating lessons')
      // if (hasGenerated) {
      //   setIsLoading(false);
      //   return;
      // }
      setIsLoading(true);
  
      try {
        const response = await memoizedGenerateCourse(courseTitle);
        if (!!response) setIsLoading(false);
        console.log(JSON.parse(response));
        const lessonsResponse = JSON.parse(response);
        setLesson(lessonsResponse.lessons);
        setHasGenerated(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to generate course:', error);
        setIsLoading(true);
      } finally {
        // setIsLoading(false);
      }
    };
  
    generateLessons();
  }, [courseTitle, memoizedGenerateCourse]); 

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  return (
    <LessonContainer>
      <LessonHeader>
        <LessonTitle>{lesson[currentLesson]?.title}</LessonTitle>
        <ProgressIndicator>
          <span>Lesson {currentLesson + 1} of {lesson.length}</span>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${currentProgress}%` }} />
          </div>
        </ProgressIndicator>
      </LessonHeader>

        {/* <TimeTracker timeSpent={timeSpent} /> */}

       <LessonContent content={lesson[currentLesson]?.actual_lesson} keyPoints={lesson[currentLesson]?.summary} />

       <Flashcards flashcards={lesson[currentLesson]?.flashcards} flippedCards={flippedCards} onFlipCard={handleFlipCard} />
       <GamificationSection streak={5} xp={50} badgeTitle="React Rookie" />

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
    </LessonContainer>
  );
};

export default memo(LessonPage);