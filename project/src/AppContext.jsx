import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  // Initialize state from localStorage if it exists
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);

  const generateCourse = async (courseTitle, difficulty) => {
    setIsGenerating(true);
    setGenerationError(null);
  
    try {
      const checkResponse = await fetch(`${VITE_API_URL}/lessons/find`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseTitle }),
      });
  
      const checkData = await checkResponse.json();
  
      // If course exists, return it
      if (checkResponse.ok && checkData.data) {
        return { lessons: checkData.data, courseId: checkData.courseId };
      }
  
      // Generate and save the course in one step
      const generateAndSaveResponse = await fetch(`${VITE_API_URL}/lessons/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseTitle, difficulty }),
      });
  
      const generateAndSaveData = await generateAndSaveResponse.json();
  
      if (!generateAndSaveResponse.ok) {
        throw new Error(generateAndSaveData.error || 'Failed to generate and save course');
      }
  
      return {
        lessons: generateAndSaveData.data.lessons,
        courseId: generateAndSaveData.data.courseId,
      };
    } catch (error) {
      setGenerationError(error.message);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCourseSelect = (course, difficulty) => {
    navigate('/lessonPage', { 
      state: { 
        courseTitle: course,
        difficulty: difficulty
      }
    });
  };



  
  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  const value = {
    user,
    setUser,
    handleCourseSelect,
    searchQuery,
    setSearchQuery,
    isGenerating,
    generationError,
    generateCourse,
    currentLesson,
    setCurrentLesson
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};



// const handleGenerateCourse = async () => {
//   try {
//     const lessons = await generateCourse('Your Course Title');
//     console.log(lessons);
//   } catch (error) {
//     console.error('Failed to generate course:', error);
//   }
// };