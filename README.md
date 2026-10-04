# Portal de Solicitações Internas

Projeto desenvolvido como parte de um desafio técnico para uma vaga de Desenvolvedor Full Stack Júnior.

O sistema permite que usuários autenticados criem e acompanhem solicitações internas de diferentes setores da empresa, além de realizar alterações de status, edição, exclusão, filtros e consulta de indicadores.

## Funcionalidades

- Login com usuário e senha
- Autenticação utilizando JWT
- Criação de solicitações
- Listagem de solicitações
- Consulta dos detalhes de uma solicitação
- Edição de solicitações abertas
- Exclusão de solicitações abertas
- Alteração de status
- Filtros por:
  - título
  - categoria
  - status
  - período
- Dashboard com indicadores:
  - total de solicitações
  - abertas
  - em atendimento
  - concluídas
- Layout responsivo para diferentes tamanhos de tela

## Tecnologias utilizadas

### Frontend

- React
- Vite
- React Router DOM
- Axios
- CSS

### Backend

- Node.js
- Express
- JWT
- bcryptjs
- SQLite

## Estrutura do projeto

```text
portal-solicitacoes/
├── backend/
│   └── src/
│       ├── banco/
│       ├── controladores/
│       ├── middlewares/
│       ├── rotas/
│       └── servidor.js
│
├── database/
│   └── estrutura.sql
│
├── docs/
│
├── frontend/
│   └── src/
│       ├── componentes/
│       ├── paginas/
│       ├── servicos/
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

## Pré-requisitos

Para executar o projeto é necessário ter instalado:

- Node.js
- npm
- Git

O SQLite utilizado pelo sistema é criado automaticamente pela aplicação, portanto não é necessário instalar ou configurar um servidor de banco de dados.

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/luizmouradc/portal-solicitacoes.git
cd portal-solicitacoes
```

### 2. Configurar o backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo disponível:

```text
CHAVE_JWT=sua_chave_aqui
```

Para execução local, substitua `sua_chave_aqui` por uma chave de sua escolha.

Exemplo:

```text
CHAVE_JWT=chave_portal_solicitacoes
```

### 3. Criar o usuário inicial

Execute:

```bash
npm run criar-usuario
```

Esse comando cria o banco de dados, caso ele ainda não exista, e adiciona o usuário utilizado para demonstração.

Credenciais:

```text
Usuário: admin
Senha: 123456
```

### 4. Executar o backend

```bash
npm run dev
```

O servidor ficará disponível em:

```text
http://localhost:3000
```

A API utiliza o endereço:

```text
http://localhost:3000/api
```

### 5. Executar o frontend

Abra outro terminal e, a partir da raiz do projeto, acesse:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

O frontend ficará disponível normalmente em:

```text
http://localhost:5173
```

## Banco de dados

O projeto utiliza SQLite.

O arquivo:

```text
database/estrutura.sql
```

contém a criação das tabelas utilizadas pelo sistema.

Ao iniciar a aplicação, o banco:

```text
database/portal.db
```

é criado automaticamente quando necessário.

O arquivo `portal.db` não é enviado ao repositório, pois cada ambiente pode gerar sua própria base local.

## Usuário de demonstração

Para testar o sistema:

```text
Usuário: admin
Senha: 123456
```

Caso o usuário ainda não exista, execute dentro da pasta `backend`:

```bash
npm run criar-usuario
```

## Status das solicitações

As solicitações podem possuir os seguintes status:

- Aberto
- Em Atendimento
- Concluído

Novas solicitações são criadas automaticamente com o status `Aberto`.

Solicitações abertas podem ser editadas ou excluídas.

## Categorias disponíveis

- TI
- RH
- Compras
- Financeiro
- Infraestrutura

## Autor

Luiz Inácio Moura da Costa