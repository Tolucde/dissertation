const mongoose = require('mongoose');

const LargeDataSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed, 
});

const LargeDataModel = mongoose.model('LargeData', LargeDataSchema);

module.exports = LargeDataModel;
