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

  create: (name, price, description, expirationDate, image) => {
    if (!name || !price || !description || !expirationDate || !image) {
      return Promise.reject(new Error('Todos los campos son requeridos'));
    }

    return db.query(
      'INSERT INTO products (name, price, description, expiration_date, image) VALUES (?, ?, ?, ?, ?)', 
      [name, price, description, expirationDate, image]
    )
    .then(([result]) => {
      return { id: result.insertId, name, price, description, expirationDate, image };
    })
    .catch((err) => {
      console.error('Error en la inserción del producto:', err);
      throw new Error('Error al crear el producto en la base de datos');
    });
  }
};

module.exports = Product;
