const express = require("express");

const {
    buscarIndicadores
} = require("../controladores/painelControlador");

const verificarAutenticacao = require("../middlewares/autenticacaoMiddleware");

const router = express.Router()

router.use(verificarAutenticacao); // dashboard so ppde ser acessaso por ususario autenticado

router.get("/", buscarIndicadores);

module.exports = router;
