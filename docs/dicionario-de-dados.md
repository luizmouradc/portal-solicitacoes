# Dicionário de Dados

Este documento descreve as tabelas e os campos utilizados no banco de dados do Portal de Solicitações Internas.

O sistema utiliza SQLite e possui duas tabelas principais: `usuarios` e `solicitacoes`.

---

## Tabela: usuarios

Armazena os usuários que podem acessar o sistema.

| Campo | Tipo | Obrigatório | Chave | Descrição |
|---|---|---|---|---|
| id | INTEGER | Sim | PK | Identificador único do usuário |
| nome | TEXT | Sim | - | Nome do usuário |
| usuario | TEXT | Sim | UNIQUE | Nome utilizado para login no sistema |
| senha_hash | TEXT | Sim | - | Senha armazenada de forma criptografada utilizando bcrypt |
| data_criacao | DATETIME | Não | - | Data e hora de criação do usuário |

### Regras

- O campo `id` é gerado automaticamente.
- O campo `usuario` deve ser único.
- A senha não é armazenada em texto puro.
- `data_criacao` recebe automaticamente a data e hora atual.

---

## Tabela: solicitacoes

Armazena as solicitações internas criadas pelos usuários.

| Campo | Tipo | Obrigatório | Chave | Descrição |
|---|---|---|---|---|
| id | INTEGER | Sim | PK | Identificador único da solicitação |
| titulo | TEXT | Sim | - | Título da solicitação |
| descricao | TEXT | Sim | - | Descrição detalhada da solicitação |
| categoria | TEXT | Sim | - | Categoria da solicitação |
| status | TEXT | Sim | - | Situação atual da solicitação |
| data_criacao | DATETIME | Não | - | Data e hora em que a solicitação foi criada |
| data_atualizacao | DATETIME | Não | - | Data e hora da última atualização |
| usuario_id | INTEGER | Sim | FK | Identificador do usuário que criou a solicitação |

### Categorias permitidas

As solicitações podem pertencer às seguintes categorias:

- TI
- RH
- Compras
- Financeiro
- Infraestrutura

### Status permitidos

As solicitações podem possuir os seguintes status:

- Aberto
- Em Atendimento
- Concluído

Novas solicitações são criadas automaticamente com o status `Aberto`.

---

## Relacionamento entre as tabelas

Cada solicitação pertence a um usuário.

O relacionamento é feito através do campo:

```text
solicitacoes.usuario_id -> usuarios.id
```

O campo `usuario_id` é uma chave estrangeira que referencia o campo `id` da tabela `usuarios`. Dessa forma, cada solicitação fica relacionada ao usuário que realizou seu cadastro.
