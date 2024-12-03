const db = require('../db'); 

const Endereco = {
    listarPorCliente: (cliente_id) => {
    const query = 'SELECT * FROM enderecoentrega WHERE cliente_id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [cliente_id], (error, results) => {
        if (error) reject(error);
        else resolve(results);
        });
    });
    },

    cadastrar: (endereco) => {
    const query = `
        INSERT INTO enderecoentrega (cliente_id, rua, numero, bairro, cidade, estado, cep, tipo_endereco)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
        endereco.cliente_id,
        endereco.rua,
        endereco.numero,
        endereco.bairro,
        endereco.cidade,
        endereco.estado,
        endereco.cep,
        endereco.tipo_endereco
    ];


    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
        });
    });
    },

    editar: (id, endereco) => {
    const query = `
        UPDATE enderecoentrega 
        SET rua = ?, numero = ?, bairro = ?, cidade = ?, estado = ?, cep = ?, tipo_endereco = ? 
        WHERE id = ?
    `;
    const params = [
        endereco.rua,
        endereco.numero,
        endereco.bairro,
        endereco.cidade,
        endereco.estado,
        endereco.cep,
        endereco.tipo_endereco,
        id
    ];

    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
    },

  
    buscarPorId: (id) => {
        const query = 'SELECT * FROM enderecoentrega WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (error, results) => {
                if (error) reject(error);
                else resolve(results[0]);
            });
        });
    },

};

module.exports = Endereco;
