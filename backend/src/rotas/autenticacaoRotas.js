const express = require("express");
const {login} = require("../controladores/autenticacaoControlador");

const router = express.Router();

router.post("/login", login) // mandando usar a função login

module.exports = router;
