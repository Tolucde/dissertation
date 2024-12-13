const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  timeSpent: { type: Number, required: true }, // in minutes
  engagementScore: { type: Number, default: 0 }, // Optional metric based on interactions
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Activity', activitySchema);
