const db = require('../config/db'); // Suponiendo que usas MySQL
const bcrypt = require('bcrypt');

const User = {
  // Crear un nuevo usuario
  create: ({ id, username, email, password, role }) => {
    const query = 'INSERT INTO users (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [id, username, email, password, role], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  findOneByEmail: (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [email], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null); // No se encontró el usuario
        resolve(results[0]); // Retorna el primer resultado
      });
    });
  },

   // Buscar un usuario por nombre de usuario
  findByUsername: (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [username], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result[0]);
      });
    });
  },
};


module.exports = User;