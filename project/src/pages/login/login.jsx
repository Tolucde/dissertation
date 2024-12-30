import { useState } from 'react'

import { useAppContext } from '../../AppContext';
import {
  Container,
  FormWrapper,
  Title,
  Form,
  Input,
  Button,
  ToggleText,
  ToggleButton,
} from './styles'
import {  useNavigate } from 'react-router-dom';

export const Login = () => {
  const { user, setUser, updateStreak } = useAppContext();

  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL;

  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!formData.email) {
      alert('Please enter your email address')
      return
    }

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send reset email')
      }

      alert('Password reset link has been sent to your email')
    } catch (error) {
      console.error('Forgot password error:', error)
      alert(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isLogin) {
        // Login logic
        const response = await fetch(`${API_URL}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        const data = await response.json()
        // Store token in localStorage 
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        const currentTime = new Date().getTime();
        localStorage.setItem('loginTimestamp', currentTime);  // Store current timestamp in localStorage

        try {
          const streak = await updateStreak(data.user._id);
          console.log(`Updated streak: ${streak}`);
        } catch (error) {
          console.error('Failed to update streak:', error);
          alert('Could not update streak. Please try again later.');
        }

        // Redirect to dashboard 
        navigate('/onboarding')  
         
      } else {
        // Sign up logic
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match')
          return
        }

        const response = await fetch(`${API_URL}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        })

        if (!response.ok) {
          throw new Error('Signup failed')
        }

        const data = await response.json()
        // Store token in localStorage 
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        try {
          const streak = await updateStreak(data.user._id);
          console.log(`Updated streak: ${streak}`);
        } catch (error) {
          console.error('Failed to update streak:', error);
          alert('Could not update streak. Please try again later.');
        }

        const currentTime = new Date().getTime();
        localStorage.setItem('loginTimestamp', currentTime); 
        

        // Redirect to dashboard 
        navigate('/onboarding')  
      }
    } catch (error) {
      console.error('Authentication error:', error)
      alert(error.message)
    }
  }

  return (
    <Container>
      <FormWrapper>
        <Title>{isLogin ? 'Login' : 'Sign Up'}</Title>
        <Form onSubmit={handleSubmit}>
        {!isLogin && (
            <Input
              type='text'
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <Input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <Input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          {isLogin && (
            <ToggleButton
              type='button'
              onClick={handleForgotPassword}
              style={{ marginTop: '-10px', marginBottom: '10px' }}
            >
              Forgot Password?
            </ToggleButton>
          )}

          <Button type='submit'>{isLogin ? 'Login' : 'Sign Up'}</Button>
        </Form>
        <ToggleText>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <ToggleButton type='button' onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </ToggleButton>
        </ToggleText>
      </FormWrapper>
    </Container>
  )
}

export default Login
