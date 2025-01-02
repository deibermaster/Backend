const Product = require('../models/Product');
const  uploadImage = require('../utils/cloudinary');

// Crear un producto con imagen subida a Cloudinary
exports.createProduct = async (req, res) => {
  console.log(req.body); // Log the incoming request body
  const { name, price, description, expirationDate } = req.body;

  // Validate all required fields
  if (!name || !price || !description || !expirationDate) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Por favor, sube una imagen.' });
  }

  try {
    const result = await uploadImage(req.file.buffer);
    const image = result.secure_url;

    const product = await Product.create(name, price, description, expirationDate, image);

    res.status(201).json({ message: 'Producto creado exitosamente', product });
  } catch (err) {
    console.error('Error al crear el producto:', err.message);
    res.status(500).json({ error: 'Error interno del servidor al crear el producto' });
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


