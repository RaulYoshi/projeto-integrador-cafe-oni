const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../controllers/authMiddleware');


router.post('/', authMiddleware.verifyToken, PedidoController.criarPedido);


router.put('/:pedidoId/status',  authMiddleware.verifyToken, PedidoController.atualizarStatus);

router.get('/listar', authMiddleware.verifyToken, PedidoController.listarPedidos);


module.exports = router;
