const Submission = require('../models/Submission');
const MinioService = require('../services/minioService');
const DeepSeekService = require('../services/deepseekService');
const fs = require('fs').promises;

const submitExercise = async (req, res) => {
  const { exerciseId } = req.body;
  const studentId = req.user.id;
  const file = req.file;

  const fileUrl = await MinioService.uploadFile(file.path, file.filename);
  const submissionId = await Submission.create({ studentId, exerciseId, fileUrl });

  await fs.unlink(file.path); // Supprime le fichier temporaire

  // Corrige automatiquement la soumission
  const { grade, feedback } = await DeepSeekService.correctSubmission(submissionId, exerciseId);

  res.status(201).json({ message: 'Soumission créée et corrigée', submissionId, grade, feedback });
};

module.exports = { submitExercise };