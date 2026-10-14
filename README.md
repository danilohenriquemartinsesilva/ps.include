# Blog Include Jr.

Aplicação web full stack de blog: é possível **criar, listar, editar e excluir publicações** (com imagem opcional). O front-end em React consome uma API REST em Node.js que grava os dados em um banco MySQL.

> Projeto criado a partir de um desafio de processo seletivo e depois finalizado e melhorado por mim.

<!-- Dica: adicione aqui um print da tela (ex.: docs/screenshot.png) -->
<!-- ![Tela do blog](docs/screenshot.png) -->

## Funcionalidades

- Listagem de publicações vindas do banco de dados (mais recentes primeiro)
- Criação de publicação com título, texto e imagem (por URL)
- Edição e exclusão de publicações (com confirmação)
- Barra lateral "Últimas publicações" com link direto para cada post
- Estados de carregando, lista vazia e erro (ex.: servidor fora do ar, com botão "Tentar de novo")
- Layout responsivo (desktop e celular)

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Front-end | React 18, Vite, Axios, CSS puro |
| Back-end | Node.js, Express, mysql2, dotenv, CORS |
| Banco de dados | MySQL |

## Estrutura do projeto

```
backend/
  database.sql               # criação do banco e da tabela
  src/
    server.js                # sobe o servidor
    app.js                   # middlewares e tratamento de erros
    routes.js                # rotas da API
    app/
      controllers/           # recebe a requisição, valida e responde
      repositories/          # comandos SQL (acesso ao banco)
      database/conexao.js    # pool de conexões MySQL
frontend/
  src/
    App.jsx                  # estado da aplicação e fluxo principal
    components/              # NewPostForm, PostCard, RecentPosts
    services/api.js          # chamadas HTTP à API
    styles/                  # CSS
```

O back-end segue uma separação em camadas (**rotas → controller → repository → banco**), o que deixa cada arquivo com uma única responsabilidade.

## Como rodar localmente

**Pré-requisitos:** Node.js 18+ e MySQL 8 (ou MariaDB) instalados e rodando.

### 1. Banco de dados

```bash
mysql -u root -p < backend/database.sql
```

Isso cria o banco `blog_include`, a tabela `posts` e dois posts de exemplo.

### 2. Back-end

```bash
cd backend
cp .env.example .env     # no Windows: copy .env.example .env
# abra o .env e coloque a senha do seu MySQL em DB_PASSWORD
npm install
npm run dev
```

A API sobe em `http://localhost:3000`.

### 3. Front-end (em outro terminal)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Abra `http://localhost:5173`.

## API

| Método | Rota | Descrição | Resposta |
| --- | --- | --- | --- |
| GET | `/posts` | Lista todos os posts | 200 |
| GET | `/posts/:id` | Busca um post | 200 / 404 |
| POST | `/posts` | Cria um post | 201 / 400 |
| PUT | `/posts/:id` | Atualiza um post | 200 / 400 / 404 |
| DELETE | `/posts/:id` | Exclui um post | 204 / 404 |

Corpo esperado em `POST` e `PUT`:

```json
{
  "titulo": "Meu primeiro post",
  "conteudo": "Texto da publicação",
  "imagem": "https://exemplo.com/foto.png"
}
```

`titulo` e `conteudo` são obrigatórios; `imagem` é opcional e precisa ser uma URL `http(s)`.

## Decisões técnicas

- **Queries parametrizadas** (`?`) em todas as consultas, evitando SQL injection.
- **Validação no servidor:** só os campos esperados são gravados, `id` precisa ser inteiro positivo e a URL da imagem precisa ser `http(s)`.
- **Tratamento centralizado de erros:** erros em rotas assíncronas caem em um middleware, então uma falha no banco devolve `500` em vez de derrubar o servidor.
- **Pool de conexões** em vez de uma conexão única, para se recuperar caso o MySQL reinicie.
- **Configuração por variáveis de ambiente** (`.env`), sem senhas no código.

## Possíveis melhorias futuras

- Autenticação (login) e posts por usuário
- Upload real de imagens em vez de URL
- Paginação da listagem
- Testes automatizados (API e componentes)
- Deploy (front na Vercel/Netlify, back e banco em um serviço em nuvem)
