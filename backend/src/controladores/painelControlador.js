const conectarBanco = require("../banco/conexao");

async function buscarIndicadores(req, res){
    try{
        const banco = await conectarBanco();

        const indicadores = await banco.get(`
            SELECT
                COUNT(*) AS total,
                COUNT(CASE WHEN status = 'Aberto' THEN 1 END) AS abertas,
                COUNT(CASE WHEN status = 'Em Atendimento' THEN 1 END) AS emAtendimento,
                COUNT(CASE WHEN status = 'Concluído' THEN 1 END) AS concluidas
            FROM solicitacoes
            `)

            return res.json(indicadores);
    } catch (erro){
        console.error("Erro ao buscar indicadores: ", erro);

        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}

module.exports = {
    buscarIndicadores
}
