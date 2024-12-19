const express = require('express');

const { generateLessons } = require('../utils/openAIService')
const Course = require('../models/Lesson');

// Route to fetch lessons for a specific course
exports.generate = async (req, res) => {
  const { courseTitle, difficulty } = req.body;

  if (!courseTitle) {
    return res.status(400).json({ error: 'Course title is required' });
  }

  try {
    const lessons = await generateLessons(courseTitle, difficulty);
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate lessons' });
  }
};

// Find a course by title
exports.findCourse = async (req, res) => {
  try {
    const { courseTitle } = req.body;
    
    // Case-insensitive search for the course
    const course = await Course.findOne({ 
      title: { $regex: new RegExp(`^${courseTitle}$`, 'i') }
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: course.lessons,
      courseId: course._id,
      title: course.title,
      difficulty: course.difficulty
    });

  } catch (error) {
    console.error('Error finding course:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Save a new course
exports.saveCourse = async (req, res) => {

  try {
    const { title, difficulty, lessons } = req.body;

    // Check if course already exists
    const existingCourse = await Course.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') }
    });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: 'Course already exists'
      });
    }

    // Create new course
    const course = new Course({
      title,
      difficulty,
      lessons,
      createdAt: new Date()
    });

    await course.save();

    return res.status(201).json({
      success: true,
      message: 'Course saved successfully',
      data: course
    });

  } catch (error) {
    console.error('Error saving course:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
