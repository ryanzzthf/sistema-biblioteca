const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const rotasLivros = require('./routes/livros');
const rotasUsuarios = require('./routes/usuarios');
const rotasEmprestimos = require('./routes/emprestimos');

app.use('/livros', rotasLivros);
app.use('/usuarios', rotasUsuarios);
app.use('/emprestimos', rotasEmprestimos);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Sistema de Biblioteca funcionando' });
});

// Tratamento de erro genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});