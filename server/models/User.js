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
        totalTimeSpent: { type: Number, default: 0 }, // in minutes
      },
      quizzesTaken: [
        {
          quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }, // Reference to Quiz collection
          score: Number,
          attempts: Number,
          timeTaken: Number,
          dateTaken: { type: Date, default: Date.now },
        },
      ],
      createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema);