const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weeklyLearningHours: { type: Number, default: 0 },
  averageQuizScore: { type: Number, default: 0 },
  lessonsCompleted: { type: Number, default: 0 },
  mostEngagedLesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Analytics', analyticsSchema);
