const db = require('../db/connection');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se o usuário já existe
    const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (user.length) {
      return res.status(400).json({ message: 'Email já cadastrado!' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Insere o usuário no banco
    await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [
      nome,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar o usuário.' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (!user.length) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const isValidPassword = await bcrypt.compare(senha, user[0].senha);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    res.status(200).json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
};
