
const Product = require('../models/Product');
const { uploadImage } = require('../utils/cloudinary');
const upload = require('../middlewares/multer'); // Aquí requerimos Multer

// Crear un producto con imagen subida a Cloudinary
exports.createProduct = async (req, res) => {
  const { name, price, description, expirationDate } = req.body;

  // Validamos que se haya subido un archivo
  if (!req.file) {
    return res.status(400).json({ error: 'Debes subir un archivo de imagen' });
  }

  try {
    // Subir el archivo directamente desde el buffer de Multer a Cloudinary
    const result = await uploadImage(req.file.buffer); // Pasamos el buffer de la imagen
    const imagenurl = result.secure_url;  // Guardamos la URL de Cloudinary

    // Crear el producto con la URL de la imagen
    const productResult = await Product.create(name, price, description, expirationDate, imagenurl);  // Usamos await para la creación

    // Si todo fue bien, respondemos con un mensaje de éxito
    res.status(201).json({
      message: 'Producto creado exitosamente',
      product: productResult,
    });
  } catch (err) {
    // Si ocurre algún error en la subida de la imagen o la creación del producto
    console.error('Error al crear el producto o al subir la imagen:', err);
    res.status(500).json({
      error: 'Error al crear el producto o al subir la imagen a Cloudinary',
      details: err.message,
    });
  }
};

// Listar productos
exports.getAllProducts = (req, res) => {
  Product.findAll()
    .then((productos) => {
      // Convertir el campo 'price' a un número antes de enviarlo
      productos.forEach((producto) => {
        producto.price = parseFloat(producto.price); // Asegurarse de que 'price' sea un número
      });

      res.json(productos); // Enviar productos como respuesta JSON
    })
    .catch((err) => {
      console.error('Error al obtener productos:', err);
      res.status(500).json({ message: 'Error al obtener productos' });
    });
};


