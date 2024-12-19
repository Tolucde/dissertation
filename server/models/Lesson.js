const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  difficulty:  String,
  lessons: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    actual_lesson: String,
    summary: [String],
    flashcards: [{
      front: String,
      back: String
    }],
    quiz: [{
      question: String,
      options: [String],
      correctAnswer: String,
      hint: String
    }],
    
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lesson', lessonSchema);