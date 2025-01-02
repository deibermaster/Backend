// routes/productRoutes.js

const express = require('express');
const productController = require('../controllers/productController');
const uploadMiddleware = require('../middlewares/multer');
const router = express.Router();

router.post('/create', uploadMiddleware, productController.createProduct)


// Ruta para obtener todos los productos
router.get('/', productController.getAllProducts);

module.exports = router;
