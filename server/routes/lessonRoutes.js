const express = require('express');
const router = express.Router();

const {generate, findCourse, saveCourse} = require('../controllers/lessonController');

router.post('/generate', generate)
router.post('/find', findCourse);
router.post('/save', saveCourse);

module.exports = router;