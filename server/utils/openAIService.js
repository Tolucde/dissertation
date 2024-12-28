const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your API key from OpenAI
});

async function generateLessons(courseTitle, difficulty) {
  try {
    const prompt = `
You are tasked with creating structured lessons for the course titled "${courseTitle}" and difficulty "${difficulty}.

The output **MUST** be in the following JSON format:

{
  "lessons": [
    {
      "title": "Lesson Title",
      "description": "Lesson description",
      
      "actual_lesson": "THE LESSON should be between 50-60 words",
      "summary": ["3 key points or short summary"],
      "flashcards": [
      {
        "front": "Flashcard front text",
        "back": "Flashcard back text"
      }
      ],
      "quiz": [
        {
          "question": "Quiz question text?",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": "Correct option text",
          "hint": "Hint for the correct answer"
        }
      ]
    },
    ...
  ]
}

Requirements:
1. Given the course title, generate a detailed course for the entire course. The output should include 3 lessons covering the course content from beginner to advanced level. 
Each lesson must have: be in a way that the user can learn a great deal from it. it should be a comprehensive course. each  actual_lesson content should be between 50-60 words
it should be more than a page

2. 
   - A "title" describing the lesson.
   - A "actual_lesson" field with detailed explanation.
   a user should be able to read the actual_lesson and learn a great deal from it..
   - A summary array with 3 key points.
   - A "flashcards" array containing 3 flashcards. Each flashcard has:
     - A "front" field.
     - A "back" field.
     -The front showing the question and the back showing the answer.
   - A "quiz" array containing 1 multiple-choice questions. Each question has:
     - A "question" field.
     - An "options" array with 1 possible answers.
     - A "correctAnswer" field specifying the correct answer.
     - A "hint" field specifying the hint for the correct answer.

Return only valid JSON. Do not include any other text.
`;

    

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens:2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        "type": "json_object"
      },
    });

    return response.choices[0].message.content


    
  } catch (error) {
    console.error('Error generating lessons:', error.message);
    throw error;
  }
}

module.exports = { generateLessons };


















// be in a way that the user can learn a great deal from it. it should be a comprehensive course. each  actual_lesson content should be  at