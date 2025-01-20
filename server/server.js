const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const path = require('path')

const lessonRoutes = require('./routes/lessonRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes')

require('dotenv').config();


const bodyParser = require('body-parser')
const app = express();

// Load the JSON file
// Serve the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Load the JSON file from the public folder
const jsonFilePath = path.join(__dirname, 'public', 'output.json');
let jsonData;
try {
    jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
    console.log('JSON data loaded successfully');
} catch (error) {
    console.error('Error loading JSON file:', error);
    jsonData = null; // Handle gracefully if the file cannot be loaded
}

// const jsonFilePath = './output.json';
// let jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));




// Middleware
app.use(cors());
app.options('*', cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

const MONGODB_URI = process.env.MONGODB_URI
// MongoDB Connection
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Successfully connected to MongoDB.');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});


// mongoose.connection.once('open', async () => {
//     try {
//         // Save the entire JSON as one document
//         await LargeDataModel.create({ data: jsonData });
//         console.log('JSON data saved successfully!');
//     } catch (err) {
//         console.error('Error saving data:', err);
//     } finally {
//         mongoose.connection.close();
//     }
// });


// Endpoint to fetch the entire JSON
app.get('/data', (req, res) => {
    res.json(jsonData);
  });
  console.log(jsonData)
  
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/recommendations', recommendationRoutes);


// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Promise Rejection:', error);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

module.exports = app;