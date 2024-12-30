import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  FiBookmark,  } from 'react-icons/fi';

import { ActionButtons, BookmarkButton, QuizButton } from './style'


const ActionSection = ({ courseId, lesson, currentLesson, difficulty, courseTitle}) => {
    const navigate = useNavigate();
const {_id: userId} = JSON.parse(localStorage.getItem('user'));
    const VITE_API_URL = import.meta.env.VITE_API_URL

    const [isBookmarked, setIsBookmarked] = useState(false)

const handleBookmark = async () => {
    console.log(courseId, courseTitle, userId)
    try {
      const response = await fetch(`${VITE_API_URL}/bookmarks`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          title: courseTitle,
          userId
        }),
      });

      if (response.ok) {
        setIsBookmarked(!isBookmarked);
      } else {
        console.error('Failed to update bookmark');
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };
  const handleStartQuiz = () => {
    console.log(lesson[currentLesson])
    navigate('/quizPage', { state: { quiz: lesson[currentLesson]?.quiz, difficulty, courseTitle,  title: `${currentLesson+1}. Quiz for ${lesson[currentLesson]?.title}` , lessonId: lesson[currentLesson]?._id, courseId} });
  };

    useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/bookmarks/check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId,
            userId,
          }),
        });
        
        if (response.ok) {
          const { isBookmarked: bookmarkStatus } = await response.json();
          setIsBookmarked(bookmarkStatus);
        }
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      }
    };
  
    if (courseId  !== undefined) {
      checkBookmarkStatus();
    }
  }, []);
  return (
    <ActionButtons>
    <BookmarkButton onClick={handleBookmark}>
      <FiBookmark color={isBookmarked ? '#4CAF50' : '#666'} />
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </BookmarkButton>

   

    <QuizButton onClick={handleStartQuiz}>
      Take Quiz
    </QuizButton>
  </ActionButtons>
  )
}

export default ActionSection