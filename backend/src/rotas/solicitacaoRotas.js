const express = require("express");

const {
    criarSolicitacao
} = require("../controladores/solicitacaoControlador");

const verificarAutenticacao = require("../middlewares/autenticacaoMiddleware");
const router = express.Router()

// Todas as rotas daqui pra baixo exigem autenticação
router.use(verificarAutenticacao);

// Criar uma nova solicitação
router.post("/", criarSolicitacao);

module.exports = router;
