const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'bdilanda.mysql.dbaas.com.br', // Substitua pelo host do seu banco de dados
  user: 'bdilanda', // Substitua pelo usuário do banco
  password: 'Aguaviva77@', // Substitua pela senha
  database: 'bdilanda', // Substitua pelo nome do banco de dados
});

module.exports = db;
