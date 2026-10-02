const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conectarBanco = require("../banco/conexao");

async function login(req, res){
    try{

        // recebendo usuario e senha
        const {usuario, senha} = req.body
        if(!usuario || !senha){
            return res.status(400).json({mensagem: "Usuário e senha são obrigatorios"});
        }

        const banco = await conectarBanco();

        // procura usuario no banco
        const usuarioEncontrado = await banco.get(
            "SELECT * FROM usuarios WHERE usuario = ?",
            [usuario]
        );
        if(!usuarioEncontrado) {
            return res.status(401).json({mensagem:"Usuário ou senha inválida."})
        };

        // procura senha no banco e compara com bcrypt
        const senhaCorreta = await bcrypt.compare(
            senha, usuarioEncontrado.senha_hash
        );
        if (!senhaCorreta){
            return res.status(401).json({mensagem:"Usuário ou senha inválida."})
        };

        const token = jwt.sign(
            {
                id: usuarioEncontrado.id,
                usuario: usuarioEncontrado.usuario
            },
            process.env.CHAVE_JWT,
            {expiresIn: "8h"}
        );

        return res.json({
            mensagem:"Login realizado com sucesso",
            token,
            usuario:{
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                usuario: usuarioEncontrado.usuario
            }
        });

    }catch (erro){
        console.error("Erro ao realizar login: ", erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        })
    }
}

module.exports = {
    login
}
