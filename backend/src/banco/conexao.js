// ====== Fazendo a conexao com o SQLite e Node ======

//bibliotecas que permite trabalhar com sqlite
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const fs = require("fs");

let banco;

async function conectarBanco(){
    if(!banco){
        // montando o caminho do arquivo do banco
        const caminhoBanco = path.join(
            __dirname, "../../../database/portal.db"
        );

        // abrindo o banco
        banco = await open({
            filename: caminhoBanco,
            driver:sqlite3.Database
        });

        await banco.exec("PRAGMA foreign_keys = ON"); // ativando as chaves estrangeiras

        const caminhoEstrutura = path.join(
            __dirname, "../../../database/estrutura.sql"
        );

        const estrutura = fs.readFileSync(caminhoEstrutura, "utf-8");

        await banco.exec(estrutura);
    }

    return banco;
}

module.exports = conectarBanco;
