// app.js
const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const protectedRoutes = require('./routes/protectedRoutes')
const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500',  // Aquí va la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  })); // El puerto donde está corriendo tu frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', protectedRoutes); // Asegúrate de usar el prefijo adecuado

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else if (err) {
    res.status(500).json({ error: err.message });
  } else {
    next();
  }
});


// Servidor en ejecución
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
