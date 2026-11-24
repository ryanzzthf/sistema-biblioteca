const db = require('../data/memoria');

exports.listar = (req, res) => {
  res.json(db.livros);
};

exports.buscarPorId = (req, res) => {
  const id = Number(req.params.id);
  const livro = db.livros.find((l) => l.id === id);
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
  res.json(livro);
};

exports.criar = (req, res) => {
  const { titulo, autor, isbn, categoria, quantidade_total } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({ erro: 'Título e autor são obrigatórios' });
  }

  const novoLivro = {
    id: db.getProximoIdLivro(),
    titulo,
    autor,
    isbn: isbn || null,
    categoria: categoria || 'Geral',
    quantidade_total: quantidade_total || 1,
    quantidade_disponivel: quantidade_total || 1,
  };

  db.livros.push(novoLivro);
  res.status(201).json(novoLivro);
};

exports.atualizar = (req, res) => {
  const id = Number(req.params.id);
  const livro = db.livros.find((l) => l.id === id);
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });

  const { titulo, autor, isbn, categoria, quantidade_total } = req.body;

  if (titulo) livro.titulo = titulo;
  if (autor) livro.autor = autor;
  if (isbn) livro.isbn = isbn;
  if (categoria) livro.categoria = categoria;
  if (quantidade_total !== undefined) {
    const diferenca = quantidade_total - livro.quantidade_total;
    livro.quantidade_total = quantidade_total;
    livro.quantidade_disponivel = Math.max(0, livro.quantidade_disponivel + diferenca);
  }

  res.json(livro);
};

exports.excluir = (req, res) => {
  const id = Number(req.params.id);
  const index = db.livros.findIndex((l) => l.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Livro não encontrado' });

  const temEmprestimoAtivo = db.emprestimos.some(
    (e) => e.id_livro === id && e.status === 'ativo'
  );
  if (temEmprestimoAtivo) {
    return res.status(400).json({ erro: 'Não é possível excluir livro com empréstimo ativo' });
  }

  const removido = db.livros.splice(index, 1);
  res.json({ mensagem: 'Livro excluído', livro: removido[0] });
};