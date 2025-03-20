const pool = require('../config/database');

class Submission {
  static async create({ studentId, exerciseId, fileUrl, grade = null, feedback = null }) {
    const [result] = await pool.query(
      'INSERT INTO submissions (student_id, exercise_id, file_url, grade, feedback) VALUES (?, ?, ?, ?, ?)',
      [studentId, exerciseId, fileUrl, grade, feedback]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM submissions WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Submission;