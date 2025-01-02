
/**
 * Handles the checkout process for an order.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {Array} req.body.items - The items in the cart.
 * @param {string} req.body.items[].productId - The ID of the product.
 * @param {number} req.body.items[].quantity - The quantity of the product.
 * @param {number} req.body.items[].price - The price of the product.
 * @param {Object} req.user - The user object.
 * @param {string} req.user.id - The ID of the user.
 * @param {Object} res - The response object.
 *
 * @returns {Promise<void>} - A promise that resolves when the checkout process is complete.
 *
 * @throws {Error} - If there is an error during the checkout process.
 */
const Order = require('../models/Order');

checkout = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id; // Suponiendo que el id del usuario está en req.user

    // Validar que el carrito no esté vacío
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío' });
    }

    // Validar que cada producto tenga los campos necesarios
    for (const item of items) {
      if (!item.productId || !item.quantity || !item.price) {
        return res.status(400).json({ message: 'Los productos deben incluir productId, quantity y price' });
      }
      if (item.quantity <= 0 || item.price <= 0) {
        return res.status(400).json({ message: 'La cantidad y el precio deben ser mayores a 0' });
      }
    }

    // Calcular el total de la compra
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Crear la orden en la base de datos
    const result = await Order.createOrder(userId, total);
    const orderId = result.insertId;

    // Añadir los productos a la orden
    const addItemsPromises = items.map((item) =>
      Order.addItem(orderId, item.productId, item.quantity, item.price)
    );

    // Esperar a que todos los productos sean añadidos
    await Promise.all(addItemsPromises);

    res.status(200).json({ message: 'Compra realizada con éxito', orderId });
  } catch (error) {
    console.error('Error en el proceso de checkout:', error);
    res.status(500).json({ message: 'Error al procesar la compra' });
  }
};

module.exports = {
  checkout,
};
