const express = require('express');
const router = express.Router();

const {generate, findCourse, saveCourse, markLessonAsCompleted} = require('../controllers/lessonController');

router.post('/generate', generate)
router.post('/find', findCourse);
router.post('/save', saveCourse);
router.post('/mark', markLessonAsCompleted);

module.exports = router;