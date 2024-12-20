// project/src/pages/Lesson/index.jsx
import React, { useState, useEffect, useCallback, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';


import { useAppContext } from '../../AppContext';
import {
  CourseTitle,
  LessonContainer,
  LessonHeader,
  LessonTitle,
  ProgressIndicator,
  LessonPageWrapper,
  Sidebar,
  LessonTab,
} from './style';
import LessonContent from './LessonContent';
import GamificationSection from './GamificationSection';
import Flashcards from './Flashcards';
import TimeTracker from './TimeTracker';
import { LoadingContainer, LoadingSpinner } from '../../sharedStyles';
import ActionSection from './ActionSection';


const LessonPage = () => {
  const navigate = useNavigate();
  const { generateCourse, currentLesson, setCurrentLesson } = useAppContext();
  const memoizedGenerateCourse = useCallback(generateCourse, []);
  const location = useLocation();
  const  {courseTitle, difficulty}  = location.state;

  const [hasGenerated, setHasGenerated] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [lesson, setLesson] = useState([]);
const [courseId, setCourseId] = useState();
  const [currentProgress, setCurrentProgress] = useState(33.33*(currentLesson+1));

  


  const [flippedCards, setFlippedCards] = useState(
    new Array(lesson[currentLesson]?.flashcards?.length).fill(false)
  );

  // Memoize handlers with useCallback
  const handleFlipCard = useCallback((index) => {
    setFlippedCards(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  }, []);
  
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

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
          setLesson(response);
          // setCourseId(response.courseId);
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
    <LessonTab
          as="button"
          onClick={handleDashboardClick}
          style={{ 
            margin: '10px 0 40px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',  
            justifyContent: 'flex-start', 
            padding: '10px 20px'
          }}
        >
           <FiArrowLeft /> Back to Dashboard
        </LessonTab>
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
       <ActionSection lesson={lesson} difficulty={difficulty} courseTitle={courseTitle} currentLesson={currentLesson} courseId={8867} />
    </LessonContainer>
    </LessonPageWrapper>
  );
};

export default memo(LessonPage);