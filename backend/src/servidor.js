const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // permitindo que o front converse com o back
app.use(express.json()); // permite receber dados em JSON

// primeira rota
app.get("/api", (req, res) => {
    res.json({
        mensagem:"API funcionando!"
    })
})

const PORTA = 3000; // porta definida

// iniciando o sservidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
})
