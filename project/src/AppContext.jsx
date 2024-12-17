import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  // Initialize state from localStorage if it exists
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);

  const generateCourse = async (courseTitle) => {
    setIsGenerating(true);
    setGenerationError(null);
    
    try {
      const response = await fetch(`${VITE_API_URL}/lessons/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseTitle }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate course');
      }

      return data.data; // Return the generated lessons
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
    generateCourse
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