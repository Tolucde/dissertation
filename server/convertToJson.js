const fs = require('fs');
const csvParser = require('csv-parser');

const csvFilePath = 'Coursera.csv'; 
const jsonFilePath = 'output.json'; 

const results = [];

fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFile(jsonFilePath, JSON.stringify(results, null, 2), (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
      } else {
        console.log('CSV successfully converted to JSON and saved!');
      }
    });
  });
