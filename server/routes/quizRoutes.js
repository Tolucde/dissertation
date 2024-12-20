const express = require('express');

const router = express.Router();
const { submitQuiz, getAverageScore } = require('../controllers/quizController');
// const auth = require('../middleware/auth'); 

router.post('/submit', submitQuiz);
router.get('/average/:userId', getAverageScore);

module.exports = router;
