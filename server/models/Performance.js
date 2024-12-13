const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  attempts: { type: Number, default: 1 },
  timeTaken: { type: Number, required: true }, // in minutes
  dateTaken: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Performance', performanceSchema);
