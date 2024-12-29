const express = require('express');
const router = express.Router();

const {generate, findCourse, saveCourse, markLessonAsCompleted, getUserCourses} = require('../controllers/lessonController');

router.post('/generate', generate)
router.post('/find', findCourse);
router.post('/save', saveCourse);
router.post('/mark', markLessonAsCompleted);
router.get('/:userId', getUserCourses);

module.exports = router;
