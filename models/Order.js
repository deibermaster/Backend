/**
 * Creates a new order in the database.
 * 
 * @param {number} userId - The ID of the user creating the order.
 * @param {number} total - The total amount of the order.
 * @returns {Promise<Object>} - A promise that resolves to the result of the database query.
 * @throws {Error} - Throws an error if the database query fails.
 */
exports.createOrder = async (userId, total) => {};

/**
 * Adds an item to an existing order in the database.
 * 
 * @param {number} orderId - The ID of the order to which the item is being added.
 * @param {number} productId - The ID of the product being added to the order.
 * @param {number} quantity - The quantity of the product being added.
 * @param {number} price - The price of the product being added.
 * @returns {Promise<Object>} - A promise that resolves to the result of the database query.
 * @throws {Error} - Throws an error if the database query fails.
 */
exports.addItem = async (orderId, productId, quantity, price) => {};
// models/Order.js

const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

// Crear una orden
exports.createOrder = async (userId, total) => {
  try {
    const [rows] = await db.execute(
      'INSERT INTO orders (user_id, total) VALUES (?, ?)',
      [userId, total]
    );
    return rows; // Devuelve las filas afectadas
  } catch (error) {
    console.error('Error creando la orden:', error);
    throw error; // Lanza el error para manejarlo en el controlador
  }
};

// Añadir un producto a la orden
exports.addItem = async (orderId, productId, quantity, price) => {
  try {
    const [rows] = await db.execute(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
      [orderId, productId, quantity, price]
    );
    return rows; // Devuelve las filas afectadas
  } catch (error) {
    console.error('Error añadiendo el producto:', error);
    throw error; // Lanza el error para manejarlo en el controlador
  }
};




