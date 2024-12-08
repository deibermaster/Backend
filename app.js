// app.js
const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {  
    res.send('¡Hola, mundo!');  
});  

// Servidor en ejecución
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
