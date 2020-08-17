# Ioasys Challenge

## Overview
O desafio consiste em criar um chat em tempo real entre os usuários, que só deverão ser permitidos usar o chat se estiverem autenticados. O chat será separados por salas e os usuários podem estar em mais de uma sala ao mesmo tempo. A sala também deve possuir um moderador que será automaticamente quem a criou. O moderador e somente ele poderá remover outros usuários da sala.
A aplicacão não precisa ter uma interface e deve seguir a arquitetura de microservicos, padrão REST, JWT e usar qualquer ORM.

Decidi seguir com o padrão monorepo usando o yarn workspaces para gerenciar pacotes, utilizei tambem o lerna para facilitar a iniciacão do projeto. Tentei seguir alguns padrões de SOLID, como por exemplo responsabilidade única e dentre outros.

Se eu tivesse mais tempo provavelmente iria seguir como padrao de desenvolvimento o TDD, estudaria e contruiria melhor os workspaces com mais código compartilhado para não me repetir muito em algumas partes dos packages e também aprender mais como eles podem se comunicar.

## Getting started

No diretório da sua escolha, execute:
```sh
  https://github.com/arthurgrigoletto/ioasys_challenge.git
```

Esse comando irá clonar o repositório para sua máquina local.

Navegue até o diretório ```ioasys_challenge``` e rode os seguintes comandos:

```sh
  yarn
  docker-compose up -d
  cp ormconfig.example.json ormconfig.json
  yarn typeorm migration:run
  yarn dev
```

Esses comandos irão:
1. Instalar todas as dependências e linkar elas nos packages do projeto
2. Subirá nossos servicos como: Redis, Mongo e Postegres (já criando o database)
3. Copiará o ormconfig example para o ormconfig (usado pelo typeorm para rodar migrations)
4. Executará as migrations - **Recomendado esperar alguns instrantes até o docker tiver criado o banco corretamente**
5. Rodará através do lerna todos os nossos servicos: Autenticacão, mensagens e salas

## Testando as rotas

<div style="display:flex;align-content:center;justify-content:center">

<div style="margin-right:10px;">

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Ioasys_challenge&uri=https%3A%2F%2Fgithub.com%2Farthurgrigoletto%2Fioasys_challenge%2Fblob%2Fmaster%2Finsominia.json)

</div>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5873344ef0f230ab40c3#?env%5BIoasys_challenge%5D=W3sia2V5IjoiYXV0aGVudGljYXRpb25VcmwiLCJ2YWx1ZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMSIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiY2hhdEJhc2VVcmwiLCJ2YWx1ZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMyIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibWVzc2FnZUJhc2VVcmwiLCJ2YWx1ZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoidG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9XQ==)

</div>



## Built With
- [Yarn](https://yarnpkg.com/pt-BR/) - Gerenciador de Pacotes
- [ESLint](https://eslint.org/) - Linting para Typescript.
- [Axios](https://github.com/axios/axios) - Http requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Encoding JWTs token
- [Lerna](https://github.com/lerna/lerna) - Gerenciar Workspaces
- [Class Transformer](https://github.com/typestack/class-transformer) - Expor ou Excluir Parametros de Entidades
- [Dotenv](https://github.com/motdotla/dotenv) - Lidar com variáveis de ambiente
- [Mongodb](https://github.com/mongodb/node-mongodb-native) - Lidar com banco não relacional
- [Pg](https://github.com/brianc/node-postgres) - Lidar com banco relacional
- [TypeOrm](https://typeorm.io/#/) - ORM com integracão com Typescript e decorators
- [tsyringe](https://github.com/microsoft/tsyringe) - Lidar com inversão de dependencias
- [Babel](https://babeljs.io) - Compilador de Código para producão
- [Ts-node-dev](https://github.com/whitecolor/ts-node-dev#readme) - Compilador em tempo de desenvolvimento
- [Celebrate](https://github.com/arb/celebrate) - Middleware para validacão de parâmetros
- [Express](https://expressjs.com/pt-br/) - Framework
- [express-async-errors](https://github.com/davidbanham/express-async-errors#readme) - Lidar com erros assíncronos do express
- [SocketIO](https://socket.io) - Emitir eventos RealTime
- [Handlebars](https://handlebarsjs.com) - Template Engine para emails
- [Nodemailer](https://nodemailer.com/about/) - Usado para o envio de emails

