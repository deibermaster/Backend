// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Asegúrate de que esta ruta esté correctamente configurada para aceptar POST
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
