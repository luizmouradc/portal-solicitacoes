const express = require("express");
const {login} = require("../controladores/autenticacaoControlador");
const verificarAutenticacao = require("../middlewares/autenticacaoMiddleware");

const router = express.Router();

router.post("/login", login) // mandando usar a função login

router.get("/perfil", verificarAutenticacao, (req, res) => {
    res.json({
        mensagem: "Usário autenticado",
        usuario: req.usuario
    });
});

module.exports = router;
