const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  difficulty:  String,
  lessons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'}],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);