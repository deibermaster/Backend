// /utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role }, // Datos que quieres incluir en el token
    process.env.JWT_SECRET, // Clave secreta para firmar el token
    { expiresIn: '1h' } // Tiempo de expiración del token
  );
};

module.exports = generateToken;

