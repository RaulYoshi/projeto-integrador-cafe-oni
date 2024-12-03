const db = require('../db');

const ItemPedidoModel = {
    async adicionarItem(pedidoId, produtoId, quantidade, precoUnitario) {
        const query = `
            INSERT INTO ItemPedido (pedido_id, produto_id, quantidade, preco_unitario)
            VALUES (?, ?, ?, ?)
        `;
        await db.execute(query, [pedidoId, produtoId, quantidade, precoUnitario]);
    },

    async buscarItensPorPedido(pedidoId) {
        const query = `
            SELECT ip.*, p.nome AS produto_nome
            FROM ItemPedido ip
            JOIN Produto p ON ip.produto_id = p.id
            WHERE ip.pedido_id = ?
        `;
        const [rows] = await db.execute(query, [pedidoId]);
        return rows;
    },
};

module.exports = ItemPedidoModel;
