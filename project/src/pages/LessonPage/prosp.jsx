import { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import styled from 'styled-components';
import { DifficultyBadge, RetryButton, NextLessonButton, OptionButton, Description, LessonCard, Title, CourseContainer,  Section, SubmitButton, ScoreDisplay, ResultsSection, OptionsContainer, QuestionText, QuizQuestion, FlashcardsSection, FlashcardContainer, Flashcard, CardFront, CardBack, SectionTitle, ProgressBar } from './style';

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
// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function CourseGenerator({ courseTitle }) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
const [quizScore, setQuizScore] = useState(0);
const [quizSubmitted, setQuizSubmitted] = useState(false);
const [userAnswers, setUserAnswers] = useState({});
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlipCard = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
  
      // Generate lessons with increasing difficulty and quizzes
      const lessonsResponse = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Generate 3 lessons for "${courseTitle}" with increasing difficulty levels.
            For each lesson, provide:
            - Title
            - Difficulty Level (Beginner/Intermediate/Advanced)
            - Description
            - Quiz with 10 multiple choice questions
  
            Format as:
            LESSON:
            Title: [lesson title]
            Difficulty: [level]
            Description: [detailed lesson description]
            
            QUIZ:
            Q1: [question]
            A) [option]
            B) [option]
            C) [option]
            D) [option]
            Correct: [A/B/C/D]
            
            [Repeat for Q2-Q10 in same format]`
        }],
        max_tokens: 2000,
      });
  
      // Parse and format the responses
      const description = descriptionResponse.data.choices[0].message.content;
      const objectives = objectivesResponse.data.choices[0].message.content
        .split('\n')
        .filter(obj => obj.trim());
      const lessons = parseLessonsAndQuizzes(lessonsResponse.data.choices[0].message.content);
  
      const flashcardsResponse = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Generate 5 flashcards for the lesson "${courseTitle}". 
            Format as:
            Q: [question]
            A: [answer]`
        }],
        max_tokens: 500,
      });

      // Parse flashcards
      const flashcards = parseFlashcards(flashcardsResponse.data.choices[0].message.content);
      

      setCourseContent({
        title: courseTitle,
        description,
        objectives,
        lessons: lessons.map(lesson => ({
          ...lesson,
          flashcards: flashcards
        })),
        duration: '3 weeks',
        loading: false,
        error: null
      });
  
    } catch (error) {
      if (error.response) {
        setCourseContent(prev => ({
          ...prev,
          loading: false,
          error: `API Error: ${error.response.status} - ${error.response.data.error}`
        }));
      } else {
        setCourseContent(prev => ({
          ...prev,
          loading: false,
          error: `Error: ${error.message}`
        }));
      }
    }

  };
  
  const parseLessonsAndQuizzes = (lessonsText) => {
    const lessonBlocks = lessonsText.split('LESSON:').filter(block => block.trim());
    
    return lessonBlocks.map(block => {
      const [lessonPart, quizPart] = block.split('QUIZ:');
      
      // Parse lesson information
      const titleMatch = lessonPart.match(/Title:\s*(.+)/);
      const difficultyMatch = lessonPart.match(/Difficulty:\s*(.+)/);
      const descriptionMatch = lessonPart.match(/Description:\s*(.+)/);
  
      // Parse quiz questions
      const quizQuestions = quizPart.split(/Q\d+:/).filter(q => q.trim()).map(question => {
        const lines = question.trim().split('\n');
        const questionText = lines[0].trim();
        const options = {
          A: lines[1].replace('A)', '').trim(),
          B: lines[2].replace('B)', '').trim(),
          C: lines[3].replace('C)', '').trim(),
        };
        const correctAnswer = lines[4].replace('Correct:', '').trim();
  
        return {
          question: questionText,
          options,
          correctAnswer
        };
      });
  
      return {
        title: titleMatch ? titleMatch[1].trim() : '',
        difficulty: difficultyMatch ? difficultyMatch[1].trim() : '',
        description: descriptionMatch ? descriptionMatch[1].trim() : '',
        quiz: quizQuestions
      };
    });
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

  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };
  
  const handleQuizSubmit = () => {
    const currentLesson = courseContent.lessons[currentLessonIndex];
    let score = 0;
    
    currentLesson.quiz.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    
    setQuizScore(score);
    setQuizSubmitted(true);
  };
  
  const handleNextLesson = () => {
    if (quizScore >= 7) {
      setCurrentLessonIndex(prev => prev + 1);
      setQuizSubmitted(false);
      setUserAnswers({});
      setQuizScore(0);
    }
  };

  const parseFlashcards = (flashcardsText) => {
    const cards = flashcardsText.split('\n\n');
    return cards.map(card => {
      const [question, answer] = card.split('\nA: ');
      return {
        question: question.replace('Q: ', '').trim(),
        answer: answer.trim()
      };
    });
  };

  return (
    <CourseContainer>
    <Title>{courseContent.title}</Title>
    
    <Section>
      <SectionTitle>Course Progress</SectionTitle>
      <ProgressBar>
        Lesson {currentLessonIndex + 1} of {courseContent.lessons.length}
      </ProgressBar>
    </Section>

    {courseContent.lessons[currentLessonIndex] && (
      <Section>
        <LessonCard>
          <LessonTitle>
            {courseContent.lessons[currentLessonIndex].title}
          </LessonTitle>
          <DifficultyBadge>
            {courseContent.lessons[currentLessonIndex].difficulty}
          </DifficultyBadge>
          <Description>
            {courseContent.lessons[currentLessonIndex].description}
          </Description>

          <FlashcardsSection>
          <SectionTitle>Review Flashcards</SectionTitle>
          {courseContent.lessons[currentLessonIndex]?.flashcards?.map((card, index) => (
            <FlashcardContainer key={index}>
              <Flashcard
                isFlipped={flippedCards[index]}
                onClick={() => handleFlipCard(index)}
              >
                <CardFront isFront={true}>
                  <h4>{card.question}</h4>
                </CardFront>
                <CardBack>
                  <p>{card.answer}</p>
                </CardBack>
              </Flashcard>
            </FlashcardContainer>
          ))}
        </FlashcardsSection>

          <QuizSection>
            <SectionTitle>Lesson Quiz</SectionTitle>
            {courseContent.lessons[currentLessonIndex].quiz.map((q, qIndex) => (
              <QuizQuestion key={qIndex}>
                <QuestionText>
                  {qIndex + 1}. {q.question}
                </QuestionText>
                <OptionsContainer>

    {Object.entries(q.options).map(([option, text]) => (
      <OptionButton
        key={option}
        selected={userAnswers[qIndex] === option}
        disabled={quizSubmitted}
        onClick={() => handleAnswerSelect(qIndex, option)}
      >
        {option}) {text}
      </OptionButton>
    ))}
  </OptionsContainer>
</QuizQuestion>
))}

{!quizSubmitted ? (
<SubmitButton 
  onClick={handleQuizSubmit}
  disabled={Object.keys(userAnswers).length < 10}
>
  Submit Quiz
</SubmitButton>
) : (
<ResultsSection>
  <ScoreDisplay>
    Your Score: {quizScore}/10
  </ScoreDisplay>
  {quizScore >= 7 ? (
    <NextLessonButton onClick={handleNextLesson}>
      Continue to Next Lesson
    </NextLessonButton>
  ) : (
    <RetryButton onClick={() => {
      setQuizSubmitted(false);
      setUserAnswers({});
    }}>
      Retry Quiz
    </RetryButton>
  )}
</ResultsSection>
)}
</QuizSection>
</LessonCard>
</Section>
)}
</CourseContainer>
  );
}

export default CourseGenerator;



