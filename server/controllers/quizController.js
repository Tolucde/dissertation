const User = require('../models/User');

const submitQuiz = async (req, res) => {
  try {
    const { userId, lessonId, courseId, quizIndex, score } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Ensure courseDetails is initialized
    if (!user.courseDetails) {
      user.courseDetails = [];
    }

    // Find the course in courseDetails array
    let courseDetail = user.courseDetails.find(
      detail => detail.courseId.toString() === courseId
    );

    if (!courseDetail) {
      // If course doesn't exist in details, create it
      courseDetail = { courseId, quizzes: [] };
      user.courseDetails.push(courseDetail);
    }

    // Find the quiz by index
    let existingQuiz = courseDetail.quizzes.find(
      quiz => quiz.lessonId.toString() === lessonId
    );

    if (existingQuiz) {
      // Update existing quiz score
      existingQuiz.score = Math.max(existingQuiz.score, score); // Keep highest score
    } else {
      // Add new quiz score
      const newQuiz = {
        quizIndex,
        lessonId,
        score,
      };
      courseDetail.quizzes.push(newQuiz);
    }

    // Reassign the updated courseDetail back to user.courseDetails
    user.courseDetails = user.courseDetails.map(detail =>
      detail.courseId.toString() === courseId ? courseDetail : detail
    );

    // Save the updated user document
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Quiz score submitted successfully',
      score,
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz score',
      error: error.message,
    });
  }
};


const getAverageScore = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract quiz scores from lessonDetails
    const scores = [];
    user.lessonDetails.forEach((lesson) => {
      lesson.quizzes.forEach((quiz) => {
        scores.push(quiz.score);
      });
    });

    // Calculate the total and average
    if (scores.length === 0) {
      return res.status(200).json({ message: 'No quizzes taken', averageScore: 0 });
    }

    const totalScore = scores.reduce((acc, score) => acc + score, 0);
    const averageScore = totalScore / scores.length;

    // Respond with the calculated average
    res.status(200).json({
      message: 'Average quiz score calculated successfully',
      totalScore,
      averageScore,
      quizzesCount: scores.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while calculating quiz scores', error });
  }
};

module.exports = {
  submitQuiz,
  getAverageScore
};