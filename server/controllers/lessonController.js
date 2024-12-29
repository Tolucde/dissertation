const express = require('express');

const { generateLessons } = require('../utils/openAIService')
const Course = require('../models/Course');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
// Route to fetch lessons for a specific course
exports.generate = async (req, res) => {
  const { courseTitle, difficulty } = req.body;

  if (!courseTitle) {
    return res.status(400).json({ error: 'Course title is required' });
  }

  try {
    // Generate lessons
    let lessons = await generateLessons(courseTitle, difficulty);

    // Check if lessons are a string and parse them into JSON
    if (typeof lessons === 'string') {
      try {
        lessons = JSON.parse(lessons);
         lessons = lessons.lessons
      } catch (parseError) {
        console.error('Error parsing lessons JSON:', parseError);
        return res.status(400).json({ error: 'Invalid JSON format in lessons data' });
      }
    }

    // Save generated course
    const createdLessons = [];
    for (const lessonData of lessons) {
      const lesson = new Lesson({
        title: lessonData.title,
        description: lessonData.description,
        actual_lesson: lessonData.actual_lesson,
        summary: lessonData.summary,
        flashcards: lessonData.flashcards,
        quiz: lessonData.quiz,
      });

      const savedLesson = await lesson.save();
      createdLessons.push(savedLesson._id);
    }

    const newCourse = new Course({
      title: courseTitle,
      difficulty,
      lessons: createdLessons,
    });

    const savedCourse = await newCourse.save();

    return res.status(201).json({
      success: true,
      message: 'Course generated and saved successfully',
      data: {
        courseId: savedCourse._id,
        lessons,
      },
    });
  } catch (error) {
    console.error('Error generating and saving course:', error);
    return res.status(500).json({
      error: 'Failed to generate and save course',
    });
  }
};

// Find a course by title
exports.findCourse = async (req, res) => {
  try {
    const { courseTitle } = req.body;
    
    // Case-insensitive search for the course
    const course = await Course.findOne({ 
      title: { $regex: new RegExp(`^${courseTitle}$`, 'i') }
    }).populate('lessons'); 

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
    const createdLessons = [];
    for (let lessonData of lessons) {
      const lesson = new Lesson({
        title: lessonData.title,
        description: lessonData.description,
        actual_lesson: lessonData.actual_lesson,
        summary: lessonData.summary,
        flashcards: lessonData.flashcards,
        quiz: lessonData.quiz,
      });

      // Save each lesson and push the saved lesson's ID to the createdLessons array
      const savedLesson = await lesson.save();
      createdLessons.push(savedLesson._id);
    }

    // Now, create the course and associate it with the lessons
    const newCourse = new Course({
      title,
      difficulty,
      lessons: createdLessons,  // Store the array of created lesson IDs in the course
    });

    // Save the course
    await newCourse.save();

    return res.status(201).json({
      success: true,
      message: 'Course saved successfully',
      data: newCourse
    });

  } catch (error) {
    console.error('Error saving course:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};


exports.markLessonAsCompleted = async (req, res) => {
  try {
    const { userId, courseId, lessonId } = req.body;
    const user = await User.findById(userId);

    const lessonDetail = user.lessonDetails.find(
      detail => detail.courseId.toString() === courseId
    );
    console.log(lessonDetail.quizzes)
    // const isAlreadyCompleted = user.completedCourses.some(
    //   lesson => lesson.lessonId === lessonId
    // );
    // if (!isAlreadyCompleted) {
    //   user.completedLessons.push(lessonId);
    // }

    // console.log(user)
    if (lessonDetail) {
      if (lessonDetail.quizzes.length >= 3) {
        const isAlreadyCompleted = user.completedCourses.some(
          course => course.courseId === courseId
        );

        if (!isAlreadyCompleted) {
          user.completedCourses.push(courseId);
        }

        // Save the updated user document
        await user.save();

        console.log('Lesson marked as completed.');
      }
    }
  } catch (error) {
    console.error('Error marking lesson as completed:', error);
  }
};


exports.getUserCourses = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('courseDetails')
      .populate('courseDetails.courseId')
    
    if (!user || !user.courseDetails) {
      return res.status(404).json({ completedCourses: [], activeCourses: [] });
    }
    
    const courseDetails = user.courseDetails;
    
    const completedCourses = courseDetails
      .filter(course => course.quizzes.length === 3)
      .map(course => course.courseId);
    
    const activeCourses = courseDetails
      .filter(course => course.quizzes.length < 3)
      .map(course => ({
        courseId: course.courseId._id,
        quizzesCompleted: course.quizzes.length,
        title: course.courseId.title
      }));
    
    return res.json({ completedCourses, activeCourses });

  } catch (error) {
    console.error("Error fetching user courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





