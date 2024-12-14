import { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import styled from 'styled-components';

// Styled Components
const CourseContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 15px;
`;

const LessonTitle = styled.h3`
  color: #333;
  font-size: 1.4rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  line-height: 1.6;
  color: #444;
`;

const ObjectivesList = styled.ul`
  padding-left: 20px;
  list-style-type: disc;
`;

const ObjectiveItem = styled.li`
  margin-bottom: 8px;
  line-height: 1.4;
`;

const LessonCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px;
  color: #ff4444;
  font-size: 1.2rem;
`;

const CourseDetails = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
`;

// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function CourseGenerator({ courseTitle }) {
  const [courseContent, setCourseContent] = useState({
    title: courseTitle,
    description: '',
    lessons: [],
    objectives: [],
    duration: '',
    loading: true,
    error: null
  });

  useEffect(() => {
    generateCourseContent();
  }, [courseTitle]);

  const generateCourseContent = async () => {
    try {
      // Generate course description
      const descriptionResponse = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Generate a comprehensive description for a course titled "${courseTitle}"`
        }],
        max_tokens: 200,
      });

      // Generate course objectives
      const objectivesResponse = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `List 5 learning objectives for a course titled "${courseTitle}"`
        }],
        max_tokens: 200,
      });

      // Generate lessons
      const lessonsResponse = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Generate 5 lesson titles and brief descriptions for a course titled "${courseTitle}"`
        }],
        max_tokens: 500,
      });

      // Parse and format the responses
      const description = descriptionResponse.data.choices[0].message.content;
      const objectives = objectivesResponse.data.choices[0].message.content
        .split('\n')
        .filter(obj => obj.trim());
      const lessons = parseLessons(lessonsResponse.data.choices[0].message.content);

      setCourseContent({
        title: courseTitle,
        description,
        objectives,
        lessons,
        duration: '8 weeks',
        loading: false,
        error: null
      });

    } catch (error) {
      setCourseContent(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to generate course content'
      }));
      console.error('Error generating course content:', error);
    }
  };

  const parseLessons = (lessonsText) => {
    const lessons = lessonsText.split('\n\n').map(lesson => {
      const [title, ...descriptionParts] = lesson.split('\n');
      return {
        title: title.replace(/^\d+\.\s*/, ''),
        description: descriptionParts.join(' ').trim()
      };
    });
    return lessons;
  };

  if (courseContent.loading) {
    return <LoadingContainer>Generating course content...</LoadingContainer>;
  }

  if (courseContent.error) {
    return <ErrorContainer>Error: {courseContent.error}</ErrorContainer>;
  }

  return (
    <CourseContainer>
      <Title>{courseContent.title}</Title>
      
      <Section>
        <SectionTitle>Course Description</SectionTitle>
        <Description>{courseContent.description}</Description>
      </Section>

      <Section>
        <SectionTitle>Learning Objectives</SectionTitle>
        <ObjectivesList>
          {courseContent.objectives.map((objective, index) => (
            <ObjectiveItem key={index}>{objective}</ObjectiveItem>
          ))}
        </ObjectivesList>
      </Section>

      <Section>
        <SectionTitle>Lessons</SectionTitle>
        {courseContent.lessons.map((lesson, index) => (
          <LessonCard key={index}>
            <LessonTitle>{lesson.title}</LessonTitle>
            <Description>{lesson.description}</Description>
          </LessonCard>
        ))}
      </Section>

      <Section>
        <SectionTitle>Course Details</SectionTitle>
        <CourseDetails>
          <Description>Duration: {courseContent.duration}</Description>
        </CourseDetails>
      </Section>
    </CourseContainer>
  );
}

export default CourseGenerator;


import CourseGenerator from './CourseGenerator';

function App() {
  return (
    <div className="App">
      <CourseGenerator courseTitle="Introduction to React Development" />
    </div>
  );
}


import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#333',
    secondary: '#666',
    error: '#ff4444',
    border: '#ddd',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  // ... more theme variables
};

// Wrap your app with ThemeProvider
<ThemeProvider theme={theme}>
  <CourseGenerator courseTitle="Introduction to React Development" />
</ThemeProvider>



const CourseContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;


const LoadingAnimation = styled.div`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  animation: spin 1s linear infinite;
`;

const LoadingAnimation = styled.div`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  animation: spin 1s linear infinite;
`;