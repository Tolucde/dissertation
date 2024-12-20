import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const VITE_API_URL = import.meta.env.VITE_API_URL;
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseTitle }),
      });
  
      const checkData = await checkResponse.json();
      
      // If course exists, return it
      if (checkResponse.ok && checkData.data) {
        return checkData.data;
      }
  
      // If course doesn't exist, generate it
      const generateResponse = await fetch(`${VITE_API_URL}/lessons/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseTitle, difficulty }),
      });


      const generateData = await generateResponse.json();
      if (!generateResponse.ok) {
        throw new Error(generateData.error || 'Failed to generate course');
      }

      const parsedLessons = JSON.parse(generateData.data);
       // Save the generated course to database
    const saveResponse = await fetch(`${VITE_API_URL}/lessons/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ 
        title:courseTitle,
        difficulty,
        lessons: parsedLessons.lessons
      }),
    });
   
    if (!saveResponse.ok) {
      console.error('Failed to save course to database');
    }
      return parsedLessons.lessons
      

    } catch (error) {
      setGenerationError(error.message);
      throw error;
    } finally {
      setIsGenerating(false);
    }
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