const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const validateToken = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');

const router = express.Router();

router.get('/profile', validateToken, getUserProfile);
router.get('/admin-only', validateToken, requireAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

module.exports = router;
