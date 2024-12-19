const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email:{type: String, required: true, unique:true},
    password:{type:String, required:true},
    interests:{type: [String], default:[]},
    difficulty: {type:String, default: 'beginner'},
    progress: {
        lessonsCompleted: { type: Number, default: 0 },
        currentLesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
        listOfLessons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'}],

        totalTimeSpent: { type: Number, default: 0 }, // in minutes
      },
      lessonDetails: [
        {
          lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
          quizzes: [
            {
              score: { type: Number },
              index: { type: Number },
            },
          ],
        }],
      createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema);