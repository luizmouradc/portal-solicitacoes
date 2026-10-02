const conectarBanco = require("../banco/conexao");

//Categorias permitidas pelo sistema
const categoriasPermitidas = [
    "TI",
    "RH",
    "Compras",
    "Financeiro",
    "Infraestrutura"
]

async function criarSolicitacao(req, res) {
    try {
        //Dados enviados pelo usuário
        const { titulo, descricao, categoria } = req.body;

        // Verifica se os campos obrigatorios foram preenchidos
        if (!titulo || !descricao || !categoria) {
            return res.status(400).json({
                mensagem: "Categoria inválida"
            });
        }

        // Verifica se a categoria enviada existe no sistema
        if (!categoriasPermitidas.includes(categoria)) {
            return res.status(400).json({
                mensagem: "Categoria inválida."
            });
        }

        // ID do usuario que veio do token JWT
        const usuarioId = req.usuario.id;

        const banco = await conectarBanco();

        const resultado = await banco.run(
            `
            INSERT INTO solicitacoes (
                titulo,
                descricao,
                categoria,
                usuario_id
            )
            VALUES (?, ?, ?, ?)
            `,
            [titulo, descricao, categoria, usuarioId]
        );

        // Busca a solicitação que acabou de ser criada
        const solicitacaoCriada = await banco.get(
            `
            SELECT *
            FROM solicitacoes
            WHERE id = ?
        `,
            [resultado.lastID]
        );

        return res.status(201).json({
            mensagem: "Solicitação criada com sucesso",
            solicitacao: solicitacaoCriada
        });
    } catch (erro) {
        console.error("Error ao criar solicitação: ", erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        });
    }
}

async function listarSolicitacoes(req, res) {
    try{
        const banco = await conectarBanco()

        // buscando varios registros
        const solicitacoes = await banco.all(` 
            SELECT
                s.id,
                s.titulo,
                s.categoria,
                u.nome AS solicitante,
                s.data_criacao,
                s.status
            FROM solicitacoes s
            INNER JOIN usuarios u ON u.id = s.usuario_id
            ORDER BY s.data_criacao DESC            
            `);

            return res.json({
                solicitacoes
            })
    }catch (erro){
        console.error("Erro ao listar solicitações: ", erro);

        return res.status(500).json({
            mensagem: "Erro interno do  servidor"
        })
    }
}

module.exports = {
    criarSolicitacao,
    listarSolicitacoes
};
