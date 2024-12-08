const db = require('../config/db');

const Product = {
  findAll: (callback) => {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  create: (name, price, expirationDate, imagenurl, callback) => {
    if (!name || !price || !expirationDate || !imagenurl) {
      return callback(new Error('Todos los campos son requeridos'), null);
    }

    db.query('INSERT INTO products (name, price, expiration_date, imagenurl) VALUES (?, ?, ?, ?)', 
    [name, price, expirationDate, imagenurl], 
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }
};

module.exports = Product;
