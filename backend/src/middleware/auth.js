const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Check if user is a doctor
const isDoctor = (req, res, next) => {
  if (req.user.role !== 'doctor') {
    return res.status(403).json({ message: 'Access denied. Doctors only.' });
  }
  next();
};

// Check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// Check if user is authorized (either the owner or a doctor/admin)
const isAuthorized = (req, res, next) => {
  const resourceUserId = req.params.userId || req.body.userId;
  
  if (
    req.user._id.toString() === resourceUserId ||
    req.user.role === 'doctor' ||
    req.user.role === 'admin'
  ) {
    return next();
  }
  
  res.status(403).json({ message: 'Access denied' });
};

module.exports = {
  auth,
  isDoctor,
  isAdmin,
  isAuthorized
}; 