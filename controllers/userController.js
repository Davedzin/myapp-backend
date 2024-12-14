const db = require('../db/connection');

exports.listUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, nome, email FROM usuarios');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  try {
    await db.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email, id]);
    res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o usuário.' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar o usuário.' });
  }
};
