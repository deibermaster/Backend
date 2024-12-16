// routes/productRoutes.js

const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/productController');
const upload = require('../middlewares/multer'); // Middleware de multer para manejar imágenes
const router = express.Router();

// Ruta para crear un producto y subir imagen directamente a Cloudinary
router.post('/create', upload.single('imagen'), createProduct);

// Ruta para obtener todos los productos
router.get('/', getAllProducts);

module.exports = router;
