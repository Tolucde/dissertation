const User = require('../models/User');

const submitQuiz = async (req, res) => {
  try {
    const { userId,lessonId, quizIndex, score } = req.body;
    const user = await User.findById(userId);
    
    // Find the lesson in lessonDetails array
    let lessonDetail = user.lessonDetails.find(
      detail => detail.lessonId.toString() === lessonId
    );

    if (!lessonDetail) {
      // If lesson doesn't exist in details, create it
      lessonDetail = {
        lessonId,
        quizzes: []
      };
      user.lessonDetails.push(lessonDetail);
    }

    // Find the quiz by index
    const existingQuiz = lessonDetail.quizzes.find(
      quiz => quiz.index === quizIndex
    );

    if (existingQuiz) {
      // Update existing quiz score
      existingQuiz.score = Math.max(existingQuiz.score, score); // Keep highest score
    } else {
      // Add new quiz score
      lessonDetail.quizzes.push({
        index: quizIndex,
        score: score
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Quiz score submitted successfully',
      score: score
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz score',
      error: error.message
    });
  }
};

module.exports = {
  submitQuiz
};