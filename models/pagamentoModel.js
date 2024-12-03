const db = require('../db');

const PagamentoModel = {
    async criarPagamento(pedidoId, metodoPagamento, valor)  {
        const query = `INSERT INTO Pagamento (pedido_id, metodo_pagamento, valor)
            VALUES (?, ?, ?)`;
    
        return new Promise((resolve, reject) => {
          db.query(query, [pedidoId, metodoPagamento, valor], (err, results) => {
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

    async atualizarStatus(pagamentoId, status) {
        const query = `
            UPDATE Pagamento
            SET status = ?
            WHERE id = ?
        `;
        await db.execute(query, [status, pagamentoId]);
    },
};

module.exports = PagamentoModel;
