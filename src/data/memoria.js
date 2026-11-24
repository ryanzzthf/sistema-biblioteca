let livros = [
  { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis", isbn: "978-85-359-0277-6", categoria: "Romance", quantidade_total: 3, quantidade_disponivel: 3 },
  { id: 2, titulo: "O Hobbit", autor: "J.R.R. Tolkien", isbn: "978-85-9508-022-0", categoria: "Fantasia", quantidade_total: 2, quantidade_disponivel: 2 },
];

let usuarios = [
  { id: 1, nome: "Ana Silva", email: "ana@email.com", tipo: "aluno" },
  { id: 2, nome: "Carlos Souza", email: "carlos@email.com", tipo: "professor" },
];

let emprestimos = [];

let proximoIdLivro = 3;
let proximoIdUsuario = 3;
let proximoIdEmprestimo = 1;

module.exports = {
  livros,
  usuarios,
  emprestimos,
  getProximoIdLivro: () => proximoIdLivro++,
  getProximoIdUsuario: () => proximoIdUsuario++,
  getProximoIdEmprestimo: () => proximoIdEmprestimo++,
};