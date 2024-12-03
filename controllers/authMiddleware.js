const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

const verifyToken = async (req, res, next) => {  

    const token = req.cookies.token; 
    if (!token) {
      return res.status(403).json({ message: 'Token necessário' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secreta_chave');
      Usuario.findByID(decoded.id, (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Erro interno do servidor' });
        }

        if (!results || results.length === 0) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        req.user = results[0]; 
        next();
      });
  } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Token inválido' });
  }
  };
  
  module.exports = { verifyToken };
  

