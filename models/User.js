
const db = require('../config/db'); // Importa el pool configurado con promesas

const User = {
  // Crear un nuevo usuario
  create: async ({ username, email, password, role }) => {
    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    try {
      const [result] = await db.execute(query, [username, email, password, role]);
      return result;
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw error;
    }
  },

  // Buscar un usuario por email
  findOneByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    try {
      const [rows] = await db.execute(query, [email]);
      return rows.length > 0 ? rows[0] : null; // Devuelve el primer resultado o null
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw error;
    }
  },

  // Buscar un usuario por nombre de usuario
  findByUsername: async (username) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    try {
      const [rows] = await db.execute(query, [username]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error al buscar usuario por nombre de usuario:', error);
      throw error;
    }
  }
};

module.exports = User;