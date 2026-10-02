const express = require("express");

const {
    criarSolicitacao,
    listarSolicitacoes,
    buscarSolicitacaoPorId,
    editarSolicitacao,
} = require("../controladores/solicitacaoControlador");

const verificarAutenticacao = require("../middlewares/autenticacaoMiddleware");

const router = express.Router()

// Todas as rotas daqui pra baixo exigem autenticação
router.use(verificarAutenticacao);

// Criar uma nova solicitação
router.post("/", criarSolicitacao);

// Listar todas as solicitações
router.get("/", listarSolicitacoes);

// Consultar uma solicitação específica
router.get("/:id", buscarSolicitacaoPorId);

//editar uma solicitação
router.put("/:id", editarSolicitacao)

module.exports = router;
