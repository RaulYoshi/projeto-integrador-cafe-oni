const db = require('../db');  

const getAllCategories = (callback) => {
  const query = 'SELECT * FROM produtocategoria'; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao consultar categorias:', err); 
      return callback(err);
    }    
    callback(null, results); 
  });
};

module.exports = {
  getAllCategories,
};
