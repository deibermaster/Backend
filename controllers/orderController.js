// /controllers/orderController.js
const Order = require('../models/Order');

exports.checkout = (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).send('El carrito está vacío');
  }

  let total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  Order.createOrder(userId, total, (err, result) => {
    if (err) return res.status(500).send('Error al crear la orden');
    const orderId = result.insertId;

    items.forEach((item) => {
      Order.addItem(orderId, item.productId, item.quantity, item.price, (err) => {
        if (err) return res.status(500).send('Error al añadir productos a la orden');
      });
    });

    res.status(200).send('Compra realizada con éxito');
  });
};
