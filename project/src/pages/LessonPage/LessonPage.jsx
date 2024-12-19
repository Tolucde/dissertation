// project/src/pages/Lesson/index.jsx
import React, { useState, useEffect, useCallback, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppContext } from '../../AppContext';
import { FiClock, FiBookmark, FiDownload, FiAward, FiHeart } from 'react-icons/fi';
import {
  CourseTitle,
  LessonContainer,
  LessonHeader,
  LessonTitle,
  ProgressIndicator,
  ActionButtons,
  BookmarkButton,
  DownloadPDF,
  QuizButton,
  LessonPageWrapper,
  Sidebar,
  LessonTab,
} from './style';
import LessonContent from './LessonContent';
import GamificationSection from './GamificationSection';
import Flashcards from './Flashcards';
import TimeTracker from './TimeTracker';
import { LoadingContainer, LoadingSpinner } from '../../sharedStyles';


const LessonPage = () => {
  const navigate = useNavigate();
  const { generateCourse, currentLesson, setCurrentLesson } = useAppContext();
  const memoizedGenerateCourse = useCallback(generateCourse, []);

  const location = useLocation();
  const  {courseTitle, difficulty}  = location.state;
  // const [lessons, setLessons] = useState([]);''
  const [timeSpent, setTimeSpent] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [lesson, setLesson] = useState([]);
const [courseId, setCourseId] = useState();
  const [currentProgress, setCurrentProgress] = useState(33.33*(currentLesson+1));

  

 

  const [flippedCards, setFlippedCards] = useState(
    new Array(lesson[currentLesson]?.flashcards.length).fill(false)
  );

  // Memoize handlers with useCallback
  const handleFlipCard = useCallback((index) => {
    setFlippedCards(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  }, []);
  
  //Timer effect
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeSpent(prev => prev + 1);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  // const formatTime = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  // };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Add logic to save bookmark to backend
  };

  const handleDownloadPDF = () => {
    // Add logic to download PDF
    
  };

  console.log(courseId)
  useEffect(() => {
    const generateLessons = async () => {
      // if (hasGenerated) {
        //   setIsLoading(false);
        //   return;
        // }
        setIsLoading(true);
        
        try {
          const response = await memoizedGenerateCourse(courseTitle, difficulty);
          if (!!response) setIsLoading(false);
          setLesson(response.data);
          setCourseId(response.courseId);
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
    
    const handleStartQuiz = () => {
      navigate('/quizPage', { state: { quiz: lesson[currentLesson]?.quiz, difficulty, courseTitle,  title: `1. Quiz for ${lesson[currentLesson]?.title}` , courseId} });
    };
    
      const handleLessonChange = (lessonIndex) => {
        setCurrentLesson(lessonIndex);
        setCurrentProgress(33.33 * (lessonIndex + 1));
      };
    
  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }
  return (
    <LessonPageWrapper>
    <Sidebar>
        {lesson.map((item, index) => (
          <LessonTab
          key={index}
          isActive={currentLesson === index}
          onClick={() => handleLessonChange(index)}
          >
            Lesson {index + 1}: {item.title}
          </LessonTab>
        ))}
      </Sidebar>
    <LessonContainer>
      <LessonHeader>
    <CourseTitle>{courseTitle}</CourseTitle>

        <LessonTitle>{lesson[currentLesson]?.title}</LessonTitle>
        <ProgressIndicator>
          <span>Lesson {currentLesson + 1} of {lesson.length}</span>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${currentProgress}%` }} />
          </div>
        </ProgressIndicator>
      </LessonHeader>

        {/* <TimeTracker timeSpent={timeSpent} /> */}

       <LessonContent content={lesson[currentLesson]?.actual_lesson} description={lesson[currentLesson]?.description} keyPoints={lesson[currentLesson]?.summary} />

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
    </LessonPageWrapper>
  );
};

export default memo(LessonPage);