const LargeDataSchema = new mongoose.Schema({
    data: mongoose.Schema.Types.Mixed, // Allows storing any structure
  });
  
  const LargeDataModel = mongoose.model('LargeData', LargeDataSchema);
  
  // To save the entire JSON
  await LargeDataModel.create({ data: jsonData });
  