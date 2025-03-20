const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const register = async (req, res) => {
  const { email, password, role } = req.body;
  const userId = await User.create({ email, password, role });
  res.status(201).json({ message: 'Utilisateur créé', userId });
};

module.exports = { login, register };