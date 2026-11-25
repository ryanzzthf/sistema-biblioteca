# Sistema de Biblioteca

Trabalho final da disciplina de Programação Web II.

## 📝 Descrição
Aplicação web para gerenciamento de uma biblioteca, permitindo o cadastro de livros, usuários e o controle de empréstimos e devoluções. O projeto conta com uma API REST no back-end e uma interface (front-end) para interação.

## 🚀 Tecnologias Utilizadas
- **Node.js** e **Express.js** (Back-end)
- **JavaScript**, **HTML5** e **CSS3** (Front-end)
- **Git** e **GitHub** (Versionamento)

## ⚙️ Como executar o projeto localmente
1. Clone este repositório:
   `git clone https://github.com/ryanzthf/sistema-biblioteca.git`
2. Entre na pasta do projeto e instale as dependências:
   `npm install`
3. Inicie o servidor:
   `node src/app.js`
4. Abra o navegador e acesse:
   `http://localhost:3000`

## 🛣️ Principais Rotas da API
- `GET /livros` - Lista todos os livros
- `POST /livros` - Cadastra um novo livro
- `PUT /livros/:id` - Atualiza os dados de um livro
- `DELETE /livros/:id` - Exclui um livro
- `GET /usuarios` - Lista todos os usuários
- `POST /emprestimos` - Registra um novo empréstimo
- `PUT /emprestimos/:id/devolucao` - Registra a devolução de um livro

## 👥 Integrantes
- [Seu Nome Completo - Ex: Ryan Melo Emidio]
- [Nome do seu Colega de Dupla]
