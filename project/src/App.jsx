import './App.css'
import { Login } from './pages/login/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import LessonPage from './pages/LessonPage/LessonPage'
import QuizPage from './pages/QuizPage/QuizPage'
import Analytics from './pages/Analytics/Analytics'
import HomePage from './pages/HomePage/HomePage'
import OnboardingPage from './pages/OnboardingPage/OnboardingPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/lessonpage' element={<LessonPage />} />
        <Route path='/quizpage' element={<QuizPage/>}/>
        <Route path='/analytics' element={<Analytics />}/>
        <Route path='/' element={<HomePage />}/>
        <Route path='/onboarding' element={<OnboardingPage />}/>
      </Routes>
    </Router>
  )
}

export default App
