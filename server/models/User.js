const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email:{type: String, required: true, unique:true},
    password:{type:String, required:true},
    interests:{type: [String], default:[]},
    difficulty: {type:String, default: 'beginner'},
    completedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    completedLessons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'}],
    progress: {
        currentCourse: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        listOfCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
        totalTimeSpent: { type: Number, default: 0 }, // in minutes
      },
      lessonDetails: [
        {
          lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
          quizzes: [
            {
              score: { type: Number },
              index: { type: Number },
              lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
              courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
            },
          ],
        }],
      
        // completedCourses: [{type: String}],
      createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema);