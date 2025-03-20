const express = require('express');
const passport = require('../config/oauth');
const jwt = require('jsonwebtoken');
const { login, register } = require('../controllers/authController');
const User = require('../models/User');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);

const handleOAuth = async (req, res) => {
  let user = await User.findByOAuthId(req.user.id);
  if (!user) {
    const userId = await User.create({
      email: req.user.emails[0].value,
      role: 'student',
      oauthId: req.user.id,
      provider: req.user.provider
    });
    user = { id: userId, role: 'student' };
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.redirect(`http://localhost:3000?token=${token}`);
};

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), handleOAuth);
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github'), handleOAuth);
router.get('/microsoft', passport.authenticate('microsoft'));
router.get('/microsoft/callback', passport.authenticate('microsoft'), handleOAuth);

module.exports = router;