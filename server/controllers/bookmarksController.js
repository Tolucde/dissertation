const Bookmark = require('../models/Bookmark');

exports.toggleBookmark = async (req, res) => {
  try {
    const { courseId, userId, title } = req.body;
    // Check if bookmark exists
    const existingBookmark = await Bookmark.findOne({
      userId,
      courseId,
      
    });

    if (existingBookmark) {
      // Remove bookmark if it exists
      await Bookmark.deleteOne({
        userId,
        courseId,
      });
      return res.status(200).json({ message: 'Bookmark removed successfully' });
    }

    // Create new bookmark if it doesn't exist
    const newBookmark = new Bookmark({
      userId,
      courseId,
      title
    });

    await newBookmark.save();
    return res.status(201).json({ message: 'Bookmark added successfully' });

  } catch (error) {
    console.error('Bookmark operation failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getBookmarks = async (req, res) => {
  const { userId } = req.body;
  try {
    const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(bookmarks);
  } catch (error) {
    console.error('Failed to fetch bookmarks:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.checkBookmark = async (req, res) => {
    try {
      const { courseId, userId } = req.body;
  
      const bookmark = await Bookmark.findOne({
        userId,
        courseId,
      });
  
      return res.status(200).json({ isBookmarked: !!bookmark });
    } catch (error) {
      console.error('Failed to check bookmark status:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }