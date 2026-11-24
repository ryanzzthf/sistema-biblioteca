const db = require('../data/memoria');

exports.listar = (req, res) => {
  res.json(db.usuarios);
};

exports.buscarPorId = (req, res) => {
  const id = Number(req.params.id);
  const usuario = db.usuarios.find((u) => u.id === id);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
  res.json(usuario);
};

exports.criar = (req, res) => {
  const { nome, email, tipo } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  }

  const emailJaExiste = db.usuarios.some((u) => u.email === email);
  if (emailJaExiste) {
    return res.status(400).json({ erro: 'Email já cadastrado' });
  }

  const novoUsuario = {
    id: db.getProximoIdUsuario(),
    nome,
    email,
    tipo: tipo || 'aluno',
  };

  db.usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
};

exports.atualizar = (req, res) => {
  const id = Number(req.params.id);
  const usuario = db.usuarios.find((u) => u.id === id);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

  const { nome, email, tipo } = req.body;
  if (nome) usuario.nome = nome;
  if (email) usuario.email = email;
  if (tipo) usuario.tipo = tipo;

  res.json(usuario);
};

exports.excluir = (req, res) => {
  const id = Number(req.params.id);
  const index = db.usuarios.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Usuário não encontrado' });

  const temEmprestimoAtivo = db.emprestimos.some(
    (e) => e.id_usuario === id && e.status === 'ativo'
  );
  if (temEmprestimoAtivo) {
    return res.status(400).json({ erro: 'Não é possível excluir usuário com empréstimo ativo' });
  }

  const removido = db.usuarios.splice(index, 1);
  res.json({ mensagem: 'Usuário excluído', usuario: removido[0] });
};