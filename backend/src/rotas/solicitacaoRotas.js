const express = require("express");

const {
    criarSolicitacao,
    listarSolicitacoes
} = require("../controladores/solicitacaoControlador");

const verificarAutenticacao = require("../middlewares/autenticacaoMiddleware");

const router = express.Router()

// Todas as rotas daqui pra baixo exigem autenticação
router.use(verificarAutenticacao);

// Criar uma nova solicitação
router.post("/", criarSolicitacao);


router.get("/", listarSolicitacoes)

module.exports = router;
