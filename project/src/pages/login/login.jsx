import { useState } from 'react'
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

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
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
        const response = await fetch('/api/login', {
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
        // Store token in localStorage or handle successful login
        localStorage.setItem('token', data.token)
        // Redirect to dashboard or home page
        // navigate('/dashboard')  // Uncomment if using react-router
      } else {
        // Sign up logic
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match')
          return
        }

        const response = await fetch('/api/signup', {
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
          throw new Error('Signup failed')
        }

        const data = await response.json()
        // Store token in localStorage or handle successful signup
        localStorage.setItem('token', data.token)
        // Redirect to dashboard or home page
        // navigate('/dashboard')  // Uncomment if using react-router
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
