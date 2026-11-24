const express = require('express');
const router = express.Router();
const controller = require('../controllers/emprestimoController');

router.get('/', controller.listar);
router.get('/livro/:idLivro', controller.historicoPorLivro);
router.post('/', controller.criar);
router.put('/:id/devolucao', controller.registrarDevolucao);

module.exports = router;