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

async function buscarSolicitacaoPorId(req, res){
    try{

        const {id} = req.params; // pega o ID que veio na URL

        const banco = await conectarBanco();

        const solicitacao = await banco.get(
        `
            SELECT
                s.id,
                s.titulo,
                s.descricao,
                s.categoria,
                s.status,
                s.data_criacao,
                s.data_atualizacao,
                u.nome AS solicitante
            FROM solicitacoes s
            INNER JOIN usuarios u ON u.id = s.usuario_id
            WHERE s.id = ?
        `,
        [id]
        );

        //caso nao exista uma solicitação com esse id
        if(!solicitacao) {
            return res.status(404).json({
                mensagem: "Solicitação não encontrada"
            });
        }

        return res.json({
            solicitacao
        })

    }catch (erro){
        console.erro("Erro ao buscar solicitação: ", erro);

        return res.status(500);json({
            mensagem: "Erro interno do servidor"
        })
    }
}

async function editarSolicitacao(req, res) {
    try{
        const {id} = req.params;
        const {titulo, descricao, categoria} = req.body;

        // verificando se todos os campos foram enviados
        if(!titulo || !descricao || !categoria){
            return res.status(400).json({
                mensagem: "Título, descrição e categoria são obrigatorias"
            });
        }

        // verificando se a categoria é permitida
        if (!categoriasPermitidas.includes(categoria)){
            return res.status(400).json({
                mensagem: "Categoria invalida"
            });
        }

        const banco = await conectarBanco();

        // primeiro verifica se a solicitação existe
        const solicitacao = await banco.get(
            "SELECT * FROM solicitacoes WHERE id = ?",
            [id]            
        );

        if(!solicitacao){
            return res.status(404).json({
                mensagem: "solicitação não encontrada"
            });
        }

        // editar APENAS solitações abertas
        if(solicitacao.status !== "Aberto"){
            return res.status(400).json({
                mensagem:"Apenas solicitações abertas podem ser editadas"
            })
        }

        // Atualiza os dados
        await banco.run(
        `
            UPDATE solicitacoes
            SET
            titulo = ?,
            descricao = ?,
            categoria = ?,
            data_atualizacao = CURRENT_TIMESTAMP
            WHERE id = ?
        `,
        [titulo, descricao, categoria, id]
        );

        // Busca novamente pra decolcer os dados ja atualizados
        const solicitacaoAtualizada = await banco.get(
            `
                SELECT
                s.id,
                s.titulo,
                s.descricao,
                s.categoria,
                s.status,
                s.data_criacao,
                s.data_atualizacao,
                u.nome AS solicitante
                FROM solicitacoes s
                INNER JOIN usuarios u ON u.id = s.usuario_id
                WHERE s.id = ?
            `,
            [id]
        );

        return res.json({
            mensagem: "Solicitação atualizada com sucesso",
            solicitacao: solicitacaoAtualizada
        })

    }catch (erro){
        console.error("Erro ao editar solicitação:", erro);

        return res.status(500).json({
        mensagem: "Erro interno do servidor."
        });
    }
}

module.exports = {
    criarSolicitacao,
    listarSolicitacoes,
    buscarSolicitacaoPorId,
    editarSolicitacao,
};
