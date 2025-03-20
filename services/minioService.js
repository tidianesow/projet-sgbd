const minioClient = require('../config/minio');
const fs = require('fs').promises;
const crypto = require('crypto');
const pool = require('../config/database');

class MinioService {
  static async uploadFile(filePath, fileName) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const input = await fs.readFile(filePath);
    const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

    await minioClient.putObject(
      process.env.MINIO_BUCKET,
      fileName,
      encrypted,
      { 'Content-Type': 'application/pdf', 'x-amz-meta-iv': iv.toString('hex') }
    );

    await pool.query('INSERT INTO file_keys (file_name, encryption_key) VALUES (?, ?)', [fileName, key.toString('hex')]);
    return `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${fileName}`;
  }
}

module.exports = MinioService;