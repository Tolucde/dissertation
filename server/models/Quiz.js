const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  hint: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quiz', quizSchema);
