const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',     
  password: '',     
  database: 'cafesabor', 
});

connection.connect((err) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados com id ' + connection.threadId);
});

module.exports = connection;