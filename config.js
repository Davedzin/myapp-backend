const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'bdilanda.mysql.dbaas.com.br',        // Substitua pelo seu host
  user: 'bdilanda',             // Substitua pelo seu usuário do MySQL
  password: 'Aguaviva77@',             // Substitua pela sua senha do MySQL
  database: 'bdilanda', // Substitua pelo nome do seu banco de dados
});

module.exports = pool.promise();
