const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validación de la longitud de la contraseña
    if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOneByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Crear el usuario con la contraseña cifrada
    await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por email
    const user = await User.findOneByEmail(email);

    // Si el usuario no existe
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña proporcionada con la guardada
    const validPassword = await bcrypt.compare(password, user.password);

    // Si la contraseña es incorrecta
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token JWT si las credenciales son correctas
    const token = generateToken(user);

    // Enviar el token en la respuesta
    res.json({ token, redirect: 'http://127.0.0.1:5500/Frontend/' }); // Redirigir al index.html con el token
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

