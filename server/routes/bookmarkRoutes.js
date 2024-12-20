const express = require('express');
const router = express.Router();

const bookmarksController = require('../controllers/bookmarksController');

router.post('/', bookmarksController.toggleBookmark);
router.get('/', bookmarksController.getBookmarks);
router.post('/check', bookmarksController.checkBookmark);

module.exports = router;