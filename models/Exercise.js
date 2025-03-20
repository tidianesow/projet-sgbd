const pool = require('../config/database');

class Exercise {
  static async create({ title, description, teacherId, correctionModel }) {
    const [result] = await pool.query(
      'INSERT INTO exercises (title, description, teacher_id, correction_model) VALUES (?, ?, ?, ?)',
      [title, description, teacherId, correctionModel]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM exercises WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Exercise;