const db = require('../config/db');

const Product = {
  // Usando promesas con then/catch
  findAll: () => {
    return db.query('SELECT * FROM products')
      .then(([results]) => {
        return results; // Retornar los productos obtenidos
      })
      .catch((err) => {
        throw err; // Lanzar error si algo falla
      });
  },

  create: (name, price, description, expirationDate, imagenurl) => {
    if (!name || !price || !description || !expirationDate || !imagenurl) {
      return Promise.reject(new Error('Todos los campos son requeridos'));
    }

    return db.query(
      'INSERT INTO products (name, price, description, expiration_date, imagenurl) VALUES (?, ?, ?, ?, ?)', 
      [name, price, description, expirationDate, imagenurl]
    )
    .then(([result]) => {
      return result; // Retornar el resultado
    })
    .catch((err) => {
      throw err; // Lanzar error si algo falla
    });
  }
};

module.exports = Product;
