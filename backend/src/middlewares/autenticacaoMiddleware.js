const jwt = require("jsonwebtoken");

function verificarAutenticacao(req, res, next) {
    // Pega o token enviado no cabeçalho da requisição
    const autorizacao = req.headers.authorization;

    if(!autorizacao){
        return res.status(401).json({
            mensagem: "Token não informado."
        });
    }

    // O token chega no formato: Bearer TOKEN
    const partes = autorizacao.split(" ");

    if(partes.length !== 2 || partes[0] !== "Bearer"){
        return res.status(401).json({
            mensagem:"Token inválido."
        });
    }

    const token = partes[1];

    try {
        // Verifica se o token foi gerado usando nossa chave
        const dadosToken = jwt.verify(token, process.env.CHAVE_JWT);

        req.usuario = dadosToken; // Guarda os dados do usuário para a próxima função usar

        next();
    }catch (erro){
        return res.status(401).json({
            mensagem:"Token inválido ou expirado."
        });
    }
}

module.exports = verificarAutenticacao;
