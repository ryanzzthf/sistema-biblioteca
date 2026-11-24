const db = require('../data/memoria');

exports.listar = (req, res) => {
  res.json(db.emprestimos);
};

exports.historicoPorLivro = (req, res) => {
  const idLivro = Number(req.params.idLivro);
  const historico = db.emprestimos.filter((e) => e.id_livro === idLivro);
  res.json(historico);
};

exports.criar = (req, res) => {
  const { id_livro, id_usuario, data_devolucao_prevista } = req.body;

  if (!id_livro || !id_usuario) {
    return res.status(400).json({ erro: 'id_livro e id_usuario são obrigatórios' });
  }

  const livro = db.livros.find((l) => l.id === id_livro);
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });

  const usuario = db.usuarios.find((u) => u.id === id_usuario);
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

  if (livro.quantidade_disponivel <= 0) {
    return res.status(400).json({ erro: 'Livro indisponível para empréstimo' });
  }

  const novoEmprestimo = {
    id: db.getProximoIdEmprestimo(),
    id_livro,
    id_usuario,
    data_emprestimo: new Date().toISOString().split('T')[0],
    data_devolucao_prevista: data_devolucao_prevista || null,
    data_devolucao_real: null,
    status: 'ativo',
  };

  livro.quantidade_disponivel -= 1;
  db.emprestimos.push(novoEmprestimo);
  res.status(201).json(novoEmprestimo);
};

exports.registrarDevolucao = (req, res) => {
  const id = Number(req.params.id);
  const emprestimo = db.emprestimos.find((e) => e.id === id);
  if (!emprestimo) return res.status(404).json({ erro: 'Empréstimo não encontrado' });

  if (emprestimo.status === 'devolvido') {
    return res.status(400).json({ erro: 'Empréstimo já devolvido' });
  }

  emprestimo.status = 'devolvido';
  emprestimo.data_devolucao_real = new Date().toISOString().split('T')[0];

  const livro = db.livros.find((l) => l.id === emprestimo.id_livro);
  if (livro) livro.quantidade_disponivel += 1;

  res.json(emprestimo);
};