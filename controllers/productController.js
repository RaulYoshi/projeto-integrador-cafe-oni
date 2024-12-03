const productModel = require('../models/productModel');

const getHomePage = (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) {
      return res.status(500).send('Erro ao buscar produtos');
    }
    res.json(products); 
  });
};


module.exports = {
  getHomePage,
};

