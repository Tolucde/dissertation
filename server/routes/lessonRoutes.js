const express = require('express');
const router = express.Router();
const { generateLessons } = require('../utils/openAIService')

// Route to fetch lessons for a specific course
router.post('/generate', async (req, res) => {
  const { courseTitle } = req.body;

  if (!courseTitle) {
    return res.status(400).json({ error: 'Course title is required' });
  }

  try {
    const lessons = await generateLessons(courseTitle);
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate lessons' });
  }
});

module.exports = router;
