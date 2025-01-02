// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Si estás usando el modelo User, asegúrate de que esté bien importado

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Obtener el token de los encabezados

  if (!token) {
    return res.status(401).send('Acceso no autorizado');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token con la clave secreta
    const user = await User.findById(decoded.id); // Obtener el usuario basado en el ID decodificado

    if (!user) {
      return res.status(401).send('Usuario no encontrado');
    }

    req.user = user; // Agregar el usuario a la solicitud para las siguientes rutas
    next(); // Continuar con el siguiente middleware o la ruta
  } catch (error) {
    return res.status(401).send('Token inválido');
  }
};


// Middleware para verificar el token y el rol del usuario
const verifyTokenAndRole = (requiredRole = 'usuario') => async (req, res, next) => {
  try {
      // Obtenemos el token del encabezado Authorization
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
          return res.status(401).json({ message: 'Acceso denegado. Token requerido.' });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
          return res.status(401).json({ message: 'Acceso denegado. Token requerido.' });
      }

      // Verificamos el token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Validamos el rol
      if (decoded.role !== requiredRole) {
          return res.status(403).json({ message: 'Acceso denegado. Rol no autorizado.' });
      }

      // Añadimos la información del usuario al request
      req.user = decoded;
      next();
  } catch (error) {
      // Manejo de errores
      return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};


module.exports = {
    authenticateToken,
    verifyTokenAndRole
};




