const db = require('../db');

const Usuario = {
  create: (data, callback) => {
    const query = 'INSERT INTO cliente (nome, email, telefone, senha) VALUES (?, ?, ?, ?)';
    db.query(query, [data.nome, data.email, data.telefone, data.senha], callback);
  },

  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM cliente WHERE email = ?';
    db.query(query, [email], callback);
  },

   findByID: (id, callback) => {
    const query = 'SELECT * FROM cliente WHERE id = ?';
    db.query(query, [id], callback);
  },

};

module.exports = Usuario;
