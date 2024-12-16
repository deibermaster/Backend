// routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');
const  authMiddleware = require('../middlewares/authMiddleware'); // Importar el middleware

const router = express.Router();

// Usar el middleware de autenticación para las rutas protegidas
router.post('/checkout', authMiddleware.authenticateToken, orderController.checkout);

module.exports = router;
