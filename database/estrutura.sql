CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    usuario TEXT NOT NULL UNIQUE,
    senha_hash TEXT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP   -- Preenche sozinho a data e hora exatas em que o cadastro foi feito
);

CREATE TABLE IF NOT EXISTS solicitacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    categoria TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Aberto', -- Se não for informada, o sistema assume 'Aberto'
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP, -- Registra automaticamente quando o pedido foi criado
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP, -- Registra quando o pedido foi alterado pela última vez
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) -- Garante que o 'usuario_id' pertença a uma pessoa que realmente existe na tabela 'usuarios'
);