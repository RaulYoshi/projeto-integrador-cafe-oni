const categoryModel = require('../models/categoryModel');

const getCategories = (req, res) => {
  categoryModel.getAllCategories((err, categories) => {
    if (err) {
      return res.status(500).send('Erro ao buscar categorias');
    }    
    res.json(categories); 
  });
};

module.exports = {
  getCategories,
};