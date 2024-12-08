// /models/Order.js
const db = require('../config/db');
// Asegúrate de tener la conexión a la base de datos configurada

// Función para crear un nuevo pedido (order)
createOrder = (userId, total, callback) => {
  if (!Number.isInteger(userId) || !Number.isFinite(total)) {
    return callback(new Error('Datos inválidos: userId debe ser un número entero y total debe ser un número válido.'));
  }

  const query = 'INSERT INTO orders (user_id, total) VALUES (?, ?)';
  db.query(query, [userId, total], (err, results) => {
    if (err) {
      console.error('Error al crear el pedido:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

// Función para agregar un artículo a un pedido
addItem = (orderId, productId, quantity, price, callback) => {
  if (
    !Number.isInteger(orderId) ||
    !Number.isInteger(productId) ||
    !Number.isInteger(quantity) ||
    !Number.isFinite(price)
  ) {
    return callback(new Error('Datos inválidos: orderId, productId y quantity deben ser enteros; price debe ser un número válido.'));
  }

  const query = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
  db.query(query, [orderId, productId, quantity, price], (err, results) => {
    if (err) {
      console.error('Error al agregar el artículo al pedido:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  createOrder,
  addItem,
};


