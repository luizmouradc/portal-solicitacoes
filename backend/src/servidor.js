require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conectarBanco = require("./banco/conexao")
const autenticacaoRotas = require("./rotas/autenticacaoRotas");
const solitacaoRotas = require("./rotas/solicitacaoRotas")
const painelRotas = require("./rotas/painelRotas");

const app = express();

app.use(cors()); // permitindo que o front converse com o back
app.use(express.json()); // permite receber dados em JSON

// primeira rota
app.get("/api", (req, res) => {
    res.json({
        mensagem:"API funcionando!"
    })
})

app.use("/api/autenticacao", autenticacaoRotas);
app.use("/api/solicitacoes", solitacaoRotas);
app.use("/api/dashboard", painelRotas);

const PORTA = 3000; // porta definida

// servidor so inicia depois que conseguir preparar o banco
async function iniciarServidor() {
    try{
        await conectarBanco();

        // iniciando o sservidor
        app.listen(PORTA, () => {
            console.log(`Servidor rodando na porta ${PORTA}`);
        });
    } catch (erro){
        console.error("Erro ao iniciar servidor: ", erro)
    }
}

iniciarServidor()
