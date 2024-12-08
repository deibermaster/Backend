// /routes/orderRoutes.js
const express = require('express');
const { checkout } = require('../controllers/orderController');  // Asegúrate de que se importe correctamente
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta de checkout que usa el middleware de autenticación
router.post('/checkout', authMiddleware, checkout);

module.exports = router;
