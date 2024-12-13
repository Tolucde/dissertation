const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const userController = require('../controllers/userController');

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// Protected routes
router.get('/me', auth, userController.getCurrentUser);
router.put('/interests', auth, userController.updateUserInterests);
// router.put('/me', auth, userController.updateUser);
// router.delete('/me', auth, userController.deleteUser);

// Password management
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// Admin routes (optional)
// router.get('/users', auth, userController.getAllUsers);
// router.get('/users/:id', auth, userController.getUserById);

module.exports = router;