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
  const [isLoading, setIsLoading] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);

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


const updateStreak = async (userId) => {
  try {
    const response = await fetch(`${VITE_API_URL}/users/streak`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setCurrentStreak(data.currentStreak); // Update state
    return data.currentStreak;
  } catch (error) {
    console.error('Error updating streak:', error);
    throw error; // Optional: propagate error for the caller to handle
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

  const fetchUserCourses = async (userId) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${VITE_API_URL}/lessons/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching completed courses:', error);
      // setCompletedCourses(0);
    } finally {
      setIsLoading(false)
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
    handleCourseSelect,
    searchQuery,
    setSearchQuery,
    isGenerating,
    updateStreak,
    generationError,
    generateCourse,
    fetchUserCourses,
    isLoading,
    setIsLoading,
    currentStreak,
    setCurrentStreak,
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


