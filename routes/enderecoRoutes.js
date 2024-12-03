const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');
const authMiddleware = require('../controllers/authMiddleware');

router.get('/listar', authMiddleware.verifyToken, enderecoController.listarEnderecos);
router.post('/cadastrar', authMiddleware.verifyToken, enderecoController.cadastrarEndereco);
router.put('/editar/:id', authMiddleware.verifyToken, enderecoController.editarEndereco);
router.get('/:id', authMiddleware.verifyToken, enderecoController.buscarPorId);
module.exports = router;
