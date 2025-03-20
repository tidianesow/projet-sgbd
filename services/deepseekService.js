const axios = require('axios');
const pdfParse = require('pdf-parse');
const fs = require('fs').promises;
const minioClient = require('../config/minio');
const pool = require('../config/database');
const stringSimilarity = require('string-similarity');

class DeepSeekService {
  static async correctSubmission(submissionId, exerciseId) {
    const submission = await pool.query('SELECT * FROM submissions WHERE id = ?', [submissionId]);
    const exercise = await pool.query('SELECT * FROM exercises WHERE id = ?', [exerciseId]);
    if (!submission[0].length || !exercise[0].length) throw new Error('Soumission ou exercice introuvable');

    const fileUrl = submission[0][0].file_url;
    const correctionModel = exercise[0][0].correction_model;

    // Télécharge le fichier depuis MinIO
    const fileName = fileUrl.split('/').pop();
    const filePath = `./uploads/${fileName}`;
    await minioClient.fGetObject(process.env.MINIO_BUCKET, fileName, filePath);

    // Décrypte le fichier
    const [fileKey] = await pool.query('SELECT encryption_key FROM file_keys WHERE file_name = ?', [fileName]);
    const key = Buffer.from(fileKey[0].encryption_key, 'hex');
    const iv = Buffer.from((await minioClient.statObject(process.env.MINIO_BUCKET, fileName)).metaData['x-amz-meta-iv'], 'hex');
    const encryptedData = await fs.readFile(filePath);
    const decipher = require('crypto').createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    // Extrait le texte du PDF
    const pdfData = await pdfParse(decrypted);
    const studentResponse = pdfData.text;

    // Vérifie le plagiat
    const [allSubmissions] = await pool.query('SELECT * FROM submissions WHERE exercise_id = ? AND id != ?', [exerciseId, submissionId]);
    let plagiarismWarning = '';
    for (const sub of allSubmissions) {
      const subFileName = sub.file_url.split('/').pop();
      const subFilePath = `./uploads/${subFileName}`;
      await minioClient.fGetObject(process.env.MINIO_BUCKET, subFileName, subFilePath);
      const subEncryptedData = await fs.readFile(subFilePath);
      const subKey = (await pool.query('SELECT encryption_key FROM file_keys WHERE file_name = ?', [subFileName]))[0][0].encryption_key;
      const subIv = Buffer.from((await minioClient.statObject(process.env.MINIO_BUCKET, subFileName)).metaData['x-amz-meta-iv'], 'hex');
      const subDecipher = require('crypto').createDecipheriv('aes-256-cbc', Buffer.from(subKey, 'hex'), subIv);
      const subDecrypted = Buffer.concat([subDecipher.update(subEncryptedData), subDecipher.final()]);
      const subText = (await pdfParse(subDecrypted)).text;

      const similarity = stringSimilarity.compareTwoStrings(studentResponse, subText);
      if (similarity > 0.85) {
        plagiarismWarning = `Attention : Similarité élevée (${(similarity * 100).toFixed(2)}%) détectée avec la soumission #${sub.id}. Possible plagiat.`;
        break;
      }
      await fs.unlink(subFilePath);
    }

    // Prépare la requête pour DeepSeek
    const prompt = `
      Vous êtes un expert en bases de données. Voici un modèle de correction pour un exercice :
      "${correctionModel}"
      Voici la réponse d’un étudiant :
      "${studentResponse}"
      Évaluez la réponse sur 20 en comparant avec le modèle de correction. Fournissez une note et un feedback détaillé expliquant les erreurs et les points à améliorer.
      ${plagiarismWarning ? 'Note : ' + plagiarismWarning : ''}
      Répondez au format JSON : { "grade": number, "feedback": string }
    `;

    // Appelle Ollama avec DeepSeek
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'deepseek-coder',
      prompt,
      stream: false,
    });

    const result = JSON.parse(response.data.response);
    let { grade, feedback } = result;

    // Ajuste la note si plagiat détecté
    if (plagiarismWarning) {
      grade = Math.min(grade, 5); // Note maximale de 5/20 en cas de plagiat
      feedback += '\n' + plagiarismWarning;
    }

    // Met à jour la soumission
    await pool.query('UPDATE submissions SET grade = ?, feedback = ? WHERE id = ?', [grade, feedback, submissionId]);

    await fs.unlink(filePath); // Supprime le fichier temporaire
    return { grade, feedback };
  }
}

module.exports = DeepSeekService;