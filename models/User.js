const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async create({ email, password, role, oauthId = null, provider = null }) {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const [result] = await pool.query(
      'INSERT INTO users (email, password, role, oauth_id, provider) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, role, oauthId, provider]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findByOAuthId(oauthId) {
    const [rows] = await pool.query('SELECT * FROM users WHERE oauth_id = ?', [oauthId]);
    return rows[0];
  }
}

module.exports = User;