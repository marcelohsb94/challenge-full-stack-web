## Bibliotecas
No backend foram utilizadas as seguintes bibliotecas:
  - bcrypt - para comparar e validar senha dos usuários cadastrados
  - cors - para que as requisições sejam atendidas apenas pelo frontend
  - dotenv - para criar variáveis de ambiente
  - express - framework para auxiliar no desenvolvimento e em especial no gerenciamento das rotas e middlewares
  - jsonwebtoken - para gerar e validar um token para troca de informações entre api e frontend
  - mysql2 - cliente mysql para o node
  - nodemon - para recarregar a aplicação em caso de alterações
  - sequelize - ORM para gerenciar as queries, migrations, seeders e conexão com o banco de dados
  - sequelize-cli - para gerenciar migrations e seeders

Já no frontend:
  - axios - para fazer as requisições http
  - bcryptjs - para criptografar senhas
  - vee-validate - para validar campos
  - vue - como framework js
  - vue-router - para gerenciamento das rotas
  - vuetify - como framework css e js
  - vuex - para padronizar o gerenciamento de estado do vue

## Se tivesse mais tempo o que melhoraria:
- O tratamento das mensagens de sucesso e erro vindas da api ou da aplicação.
- Adicionar feedback para o usuário no frontend
- Separar melhor as páginas em componentes

## Requisitos obrigatórios não entregues
- Todos os requisitos atendidos
-------

## Variáveis de ambiente

ALLOWED_FROM=http://localhost:8080

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=""
DB_DATABASE="challenge-full-stack-web"

SECRET=7e0638ea90936043d7a54fc3b83d8fa1