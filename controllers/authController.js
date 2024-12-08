// /controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');


const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validación de la longitud de la contraseña
    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOneByEmail(email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Generar un id único
    const id = crypto.randomUUID();

    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    // Crear el usuario con la contraseña cifrada
    await User.create({
      id,
      username,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).send('Usuario registrado con éxito');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar al usuario por nombre de usuario
    const user = await User.findByUsername(username);

    // Si el usuario no existe
    if (!user) {
      return res.status(400).send('Usuario no encontrado');
    }

    // Comparar la contraseña proporcionada con la guardada
    const validPassword = await bcrypt.compare(password, user.password);

    // Si la contraseña es incorrecta
    if (!validPassword) {
      return res.status(401).send('Contraseña incorrecta');
    }

    // Generar token JWT si las credenciales son correctas
    const token = generateToken(user); // Utiliza tu función de utilidades

    // Enviar el token en la respuesta
    res.json({ token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).send('Error interno del servidor');
  }
};
