// routes/protectedRoutes.js
const express = require('express');
const {authenticateToken,verifyTokenAndRole}  = require('../middlewares/authMiddleware'); // Asegúrate de que la ruta esté correcta
const router = express.Router();

router.get('/protected-endpoint', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso autorizado a este endpoint protegido' });
});


module.exports = router;

