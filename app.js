const express = require('express');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(cookieParser());

// Rotas da aplicação
app.use('/produtos', productRoutes); 
app.use('/categorias', categoriaRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/endereco', enderecoRoutes);


app.get('/', (req, res) => {
  res.render('index'); 
});

app.get('/carrinho', (req, res) => {
  res.render('cart', { cartItems: [] }); 
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.get('/configuracao', (req, res) => {
  res.render('configuracao');
});

app.get('/pedidos', (req, res) => {
  res.render('pedidos'); 
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
