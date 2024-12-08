const Product = require('../models/Product');
const { uploadImage } = require('../utils/cloudinary');
const upload = require('../middlewares/multer'); // Aquí requerimos Multer

exports.createProduct = async (req, res) => {
  const { name, price, expirationDate } = req.body;

  // Validamos que se haya subido un archivo
  if (!req.file) {
    return res.status(400).json({ error: 'Debes subir un archivo de imagen' });
  }

  try {
    // Subir el archivo directamente desde el buffer de Multer a Cloudinary
    const result = await uploadImage(req.file.buffer); // Aquí pasamos el buffer en lugar de una ruta temporal
    const imagenurl = result.secure_url;  // Guardamos la URL de Cloudinary

    // Crear el producto con la URL de la imagen
    Product.create(name, price, expirationDate, imagenurl, (err, productResult) => {
      if (err) {
        return res.status(500).json({ error: 'Error al crear el producto' });
      }
      res.status(201).json({ message: 'Producto creado exitosamente', product: productResult });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al subir la imagen a Cloudinary' });
  }
};

// Listar productos
exports.getAllProducts = (req, res) => {
  Product.findAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }
    res.status(200).json({ products: results });
  });
};

