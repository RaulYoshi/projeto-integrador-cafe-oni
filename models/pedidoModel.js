const db = require('../db');

const PedidoModel = {
    async criarPedido(clienteId, enderecoId, total) {
        const query = `INSERT INTO Pedido (cliente_id, endereco_id, total) VALUES (?, ?, ?)`;
    
        return new Promise((resolve, reject) => {
          db.query(query, [clienteId, enderecoId, total], (err, results) => {
            if (err) {
              console.error('Erro ao executar o INSERT:', err);
              reject(err);
            } else {
              const insertId = results.insertId; 
              resolve(insertId); 
            }
          });
        });
      },
    

    async atualizarStatus(pedidoId, status) {
        const query = `
            UPDATE Pedido
            SET status = ?
            WHERE id = ?
        `;
        await db.execute(query, [status, pedidoId]);
    },

    listarPorCliente: (cliente_id) => {
    const query = 'SELECT * FROM Pedido WHERE cliente_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [cliente_id], (error, results) => {
        if (error) reject(error);
        else resolve(results);
        });
    });
    },
};

module.exports = PedidoModel;
