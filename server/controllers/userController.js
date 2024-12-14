const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
  // Auth Controllers
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      user = new User({
        name,
        email,
        password,
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Create token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      res.status(201).json({ token, user});
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email account does not exist' });
      }

      // Validate password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Wrong password' });
      }

      // Create token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });

      res.status(201).json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      // In a token-based system, client-side should handle token removal
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Protected Controllers
  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, email },
        { new: true }
      ).select('-password');
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Password Management
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Here you would typically:
      // 1. Generate a password reset token
      // 2. Save it to the user document with an expiry
      // 3. Send an email with the reset link
      
      res.json({ message: 'Password reset instructions sent to email' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      
      // Here you would typically:
      // 1. Verify the reset token
      // 2. Check if it's expired
      // 3. Hash the new password
      // 4. Update the user's password
      
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Admin Controllers
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
  updateUserInterests: async (req, res) => {
      try {
        const { interests, difficulty } = req.body;
        
        // Validate interests array
        if (!Array.isArray(interests)) {
          return res.status(400).json({ message: 'Interests must be an array' });
        }
  
        const user = await User.findByIdAndUpdate(
          req.user.id,
          { interests, difficulty },
          { new: true }
        ).select('-password');
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user, message: 'Your interests have been updated✅' });
  

      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    },
};




module.exports = userController;