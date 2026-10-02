const bcrypt = require("bcryptjs"); // guarda a senhar de forma "segura" no banco
const conectarBanco = require("./conexao");

async function criarUsuarioInicial(){
    try{
        const banco = await conectarBanco();

        // perguntando ao banco se tem alguem com usuario "admin"
        const usuarioExistente = await banco.get(
            "SELECT * FROM usuarios WHERE usuario = ?", ["admin"]
        );

        // se tiver, ai nao criamos 
        if(usuarioExistente){
            console.log("Usuario inicial já existe.");
            await banco.close();
            return
        }
        const senhaCriptografada = await bcrypt.hash("123456", 10)

        await banco.run(
            `
            INSERT INTO usuarios (nome, usuario, senha_hash) 
            VALUES (?, ?, ?)
            `,
            ["Administrador", "admin", senhaCriptografada]
        );

        console.log("Usuario inicial criado com sucesso.");
        
        await banco.close()

    } catch (erro){
        console.error("Erro ao criar usuário inicial: " , erro)
    }
}

criarUsuarioInicial();
