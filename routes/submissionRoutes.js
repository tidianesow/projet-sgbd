const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { submitExercise } = require('../controllers/submissionController');
const pool = require('../config/database');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role === 'teacher') {
      const [rows] = await pool.query('SELECT * FROM submissions');
      res.json(rows);
    } else {
      const [rows] = await pool.query('SELECT * FROM submissions WHERE student_id = ?', [req.user.id]);
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

router.post('/', auth, upload.single('file'), submitExercise);

module.exports = router;