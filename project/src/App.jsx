import './App.css'
import { Login } from './pages/login/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import MyQuiz from "./pages/MyQuiz/MyQuiz"
import LessonPage from './pages/LessonPage/LessonPage'
import QuizPage from './pages/QuizPage/QuizPage'
import Analytics from './pages/Analytics/Analytics'
import HomePage from './pages/HomePage/HomePage'
import OnboardingPage from './pages/OnboardingPage/OnboardingPage'
import { AppProvider } from './AppContext';
import { useEffect } from 'react'
import ProtectedRoute from './ProtectedRoute'

function App() {

  const checkLoginTimestamp = () => {
    const lastLogin = localStorage.getItem('loginTimestamp');
    const currentTime = new Date().getTime();
    
    if (lastLogin && currentTime - lastLogin > 24 * 60 * 60 * 1000) {
      // 24 hours have passed, clear localStorage
      localStorage.clear();
      console.log("Local storage cleared due to inactivity.");
    }
  };

  // Call this function on component mount
  useEffect(() => {
    checkLoginTimestamp();  // Check timestamp on load
  }, []); 

  return (
    <Router>
      <AppProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<ProtectedRoute component={Dashboard} />} />
        <Route path='/lessonpage' element={<ProtectedRoute component={LessonPage} />} />
        <Route path='/quizpage' element={<ProtectedRoute component={QuizPage} />} />
        <Route path='/analytics' element={<ProtectedRoute component={Analytics} />} />
        <Route path='/' element={<ProtectedRoute component={HomePage} />} />
        <Route path='/my-quizzes' element={<ProtectedRoute component={MyQuiz} />} />
        <Route path='/onboarding' element={<ProtectedRoute component={OnboardingPage} />} />
      </Routes>
    </AppProvider>
    </Router>
  )
}

export default App
