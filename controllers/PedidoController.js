const PedidoModel = require('../models/pedidoModel');
const ItemPedidoModel = require('../models/itemPedidoModel');
const PagamentoModel = require('../models/pagamentoModel');

const PedidoController = {
    async criarPedido(req, res) {
        try {
            const { clienteId, itens, metodoPagamento, enderecoId } = req.body;     

            if (!itens.length) {
                return res.status(400).json({ message: 'Carrinho vazio.' });
            }
    
            const total = itens.reduce((sum, item) => sum + item.quantidade * item.precoUnitario, 0);    
            
            const pedidoId = await PedidoModel.criarPedido(clienteId, enderecoId, total);    
           
            for (const item of itens) {
                await ItemPedidoModel.adicionarItem(pedidoId, item.produtoId, item.quantidade, item.precoUnitario);
            }

            await PagamentoModel.criarPagamento(pedidoId, metodoPagamento, total);
    
            res.status(201).json({ message: 'Pedido finalizado com sucesso!', pedidoId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar o pedido.' });
        }
    },

    async atualizarStatus(req, res) {
        try {
            const { pedidoId } = req.params;
            const { status } = req.body;

            await PedidoModel.atualizarStatus(pedidoId, status);

            res.json({ message: 'Status do pedido atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar o status do pedido.' });
        }
    },

    async listarPedidos(req, res){
        try {
          const cliente_id = req.user.id; 
          const pedidos = await PedidoModel.listarPorCliente(cliente_id);
          res.json(pedidos);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erro ao listar pedidos' });
        }
    }
};

module.exports = PedidoController;
