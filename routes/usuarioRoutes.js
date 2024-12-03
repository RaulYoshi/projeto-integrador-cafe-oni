const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../controllers/authMiddleware');


router.post('/cadastro', usuarioController.cadastrarUsuario);


router.post('/login', usuarioController.loginUsuario);


router.get('/pedidos', authMiddleware.verifyToken, usuarioController.listarPedidos);


router.get('/info', authMiddleware.verifyToken, (req, res) => {
  const user = req.user;  
  res.json(user); 
});

module.exports = router;
