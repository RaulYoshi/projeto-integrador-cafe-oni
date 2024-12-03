const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cadastrarUsuario = (req, res) => {
    
  const { nome, email, telefone, senha } = req.body;

  Usuario.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao verificar usuário.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criar senha.' });
      }

      const novoUsuario = { nome, email, telefone, senha: hashedPassword };
      Usuario.create(novoUsuario, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao criar usuário.' });
        }

        return res.status(201).json({ message: 'Usuário criado com sucesso!' });
      });
    });
  });
};

const loginUsuario = (req, res) => {
  const { email, senha } = req.body;

  Usuario.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const usuario = results[0];

    bcrypt.compare(senha, usuario.senha, (err, match) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao comparar a senha.' });
      }

      if (!match) {
        return res.status(400).json({ message: 'Senha incorreta.' });
      }

      const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'secreta_chave', { expiresIn: '1h' });

      res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000, path: '/' });
      return res.status(200).json({ message: 'Login realizado com sucesso!' });
    });
  });
};

const listarPedidos = (req, res) => {  
  const usuarioId = req.user.id; 

  Usuario.getPedidosByUsuarioId(usuarioId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar pedidos.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Nenhum pedido encontrado.' });
    }

    return res.status(200).json({ pedidos: results });
  });
};

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  listarPedidos
};
