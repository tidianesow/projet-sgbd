const Exercise = require('../models/Exercise');

const createExercise = async (req, res) => {
  const { title, description, correctionModel } = req.body;
  const teacherId = req.user.id;
  const exerciseId = await Exercise.create({ title, description, teacherId, correctionModel });
  res.status(201).json({ message: 'Exercice créé', exerciseId });
};

module.exports = { createExercise };