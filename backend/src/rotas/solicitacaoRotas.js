const express = require("express");

const {
    criarSolicitacao,
    listarSolicitacoes,
    buscarSolicitacaoPorId,
    editarSolicitacao,
    excluirSolicitacao,
} = require("../controladores/solicitacaoControlador");

const verificarAutenticacao = require("../middlewares/autenticacaoMiddleware");

const router = express.Router()

router.use(verificarAutenticacao); // Todas as rotas daqui pra baixo exigem autenticação

router.post("/", criarSolicitacao); // Criar uma nova solicitação

router.get("/", listarSolicitacoes); // Listar todas as solicitações

router.get("/:id", buscarSolicitacaoPorId); // Consultar uma solicitação específica

router.put("/:id", editarSolicitacao); //editar uma solicitação
 
router.delete("/:id", excluirSolicitacao); // excluir uma solicitação

module.exports = router;
