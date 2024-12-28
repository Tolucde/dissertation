const express = require('express');
const { recommendCourse, clusterRecommendations, performanceRecommendations } = require('../controllers/recommendationController');

const router = express.Router();

router.get('/recommend', recommendCourse);  // For specific course recommendations
router.get('/cluster', clusterRecommendations);  // For clustering recommendations
router.post('/performance', performanceRecommendations);  // For performance-based recommendations

module.exports = router;
