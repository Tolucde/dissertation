
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Privacy from './Privacy';
import {
    Container,
    Title,
    Form,
    Section,
    SectionTitle,
    InterestGrid,
    InterestOption,
    DifficultySelect,
    SubmitButton,
    CustomInterestForm,     
    CustomInterestInput,    
    AddInterestButton    
  } from './style';

const OnboardingPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const [customInterest, setCustomInterest] = useState('');
  const [difficulty, setDifficulty] = useState('beginner');
  const [hasConsent, setHasConsent] = useState(false); 
  
  const token = localStorage.getItem('token');
  const interestOptions = [
    'Programming',
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Mobile Development',
    'Cloud Computing',
    'Cybersecurity',
    'DevOps',
    'Artificial Intelligence',
    'Blockchain',
    'Game Development',
    'UI/UX Design'
  ];

  const addCustomInterest = (e) => {
    e.preventDefault();
    if (customInterest.trim() && !interests.includes(customInterest.trim())) {
      setInterests([...interests, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      if (interests.length < 5) {
        setInterests([...interests, interest]);
      } else {
        alert('You can only select up to 5 interests');
      }
    }
  }
  const handleCustomInterest = (e) => {
    e.preventDefault(); 
    if (customInterest.trim() && !interests.includes(customInterest.trim())) {
      if (interests.length < 5) {
        setInterests([...interests, customInterest.trim()]);
        setCustomInterest('');
      } else {
        alert('You can only select up to 5 interests');
        setCustomInterest('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasConsent) {
      alert('Please accept the privacy policy and terms of service to continue');
      return;
    }
    try {
      console.log(interests, token)
      const response = await fetch(`${API_URL}/users/interests`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          interests,
          difficulty
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      await response.json(); 
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <Container>
      <Title>Welcome! Let's Personalize Your Learning Journey</Title>
      <Form onSubmit={handleSubmit}>
      <Section>
      <SectionTitle>What are you interested in learning?</SectionTitle>
      {
        interests.length>0 &&
      <p>Select up to 5 interests ({5 - interests.length} remaining)</p>
      }
          
         
          <CustomInterestForm onSubmit={addCustomInterest}>
          <CustomInterestInput
            type="text"
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            placeholder="Type your own interest..."
          />
          <AddInterestButton type="button" onClick={handleCustomInterest}>Add Interest</AddInterestButton>
        </CustomInterestForm>

        <InterestGrid>
          {[...interests, ...interestOptions.filter(opt => !interests.includes(opt))].map((interest) => (
            <InterestOption
              key={interest}
              selected={interests.includes(interest)}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </InterestOption>
          ))}
        </InterestGrid>
      </Section>
        <Section>
          <SectionTitle>Choose your preferred difficulty level</SectionTitle>
          <DifficultySelect
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </DifficultySelect>
        </Section>

        {/* <SubmitButton type="submit">
          Start Learning
        </SubmitButton> */}
        <Privacy hasConsent={hasConsent} setHasConsent={setHasConsent} handleSubmit={handleSubmit}/>
      </Form>
    </Container>
  );
};


export default OnboardingPage