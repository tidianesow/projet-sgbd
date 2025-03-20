const express = require('express');
const { createExercise } = require('../controllers/exerciseController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createExercise);

module.exports = router;