const Endereco = require('../models/enderecoModel');

const listarEnderecos = async (req, res) => {
  try {
    const cliente_id = req.user.id; 
    const enderecos = await Endereco.listarPorCliente(cliente_id);
    res.json(enderecos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar endereços' });
  }
};

const cadastrarEndereco = async (req, res) => {
  try {
    const cliente_id = req.user.id;
    const novoEndereco = { ...req.body, cliente_id };

    await Endereco.cadastrar(novoEndereco);
    res.status(201).json({ message: 'Endereço cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar endereço' });
  }
};

const editarEndereco = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Endereco id:',req.params.id);
        const enderecoAtualizado = req.body;        
        console.log('Endereco:',enderecoAtualizado);

        await Endereco.editar(id, enderecoAtualizado);
        res.json({ message: 'Endereço atualizado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao editar endereço' });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const id = req.params.id;        
        const endereco = await Endereco.buscarPorId(id);
        
        if (!endereco) {
            return res.status(404).json({ message: 'Endereço não encontrado' });
        }

        res.json(endereco);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar endereço' });
    }
};


module.exports = { listarEnderecos, cadastrarEndereco, editarEndereco, buscarPorId };
