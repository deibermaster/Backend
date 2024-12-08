const multer = require('multer');
const path = require('path');

// Almacenamiento en memoria
const storage = multer.memoryStorage();

// Validación de archivos de imagen
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png, gif)'));
  }
};

// Configuración de multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de tamaño de archivo de 5MB
  fileFilter: fileFilter
});

module.exports = upload;
