const db = require('../db');

const getAllProducts = (callback) => {
  db.query('SELECT * FROM Produto', (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return callback(err, null);
    }
    callback(null, results); 
  });
};

module.exports = {
  getAllProducts,
};