const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email:{type: String, required: true, unique:true},
    password:{type:String, required:true},
    interests:{type: [String], default:[]},
    difficulty: {type:String, default: 'Beginner'},
    completedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    completedLessons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'}],
    lastActiveDate: { type: Date, default: null },
    progress: {
        currentCourse: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        listOfCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
        totalTimeSpent: { type: Number, default: 0 }, // in minutes
      },
      courseDetails: [
        {
          courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
          quizzes: [
            {
              score: { type: Number },
              quizIndex: { type: Number },
              lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
              
            },
          ],
        }],
      
        // completedCourses: [{type: String}],
      createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema);