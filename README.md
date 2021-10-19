# NLW Heat 

Back-end do projeto produzido durante a Next Level Week Heat (NLW Heat) da Rocketseat

Este projeto exercita o uso de banco de dados usando [Prisma](https://www.prisma.io/) e também o conceito de real-time com o [Socket.io](https://socket.io/), além de fazer autenticação usando o GitHub

### Tecnologias
Prisma
Typescript
Socket.io
Node.js
Yarn

### Executando o projeto

Configure o arquivo `.env` da aplicação conforme o `.env.sample`, para isso siga as instruções abaixo

Configure uma aplição em seu GitHub:
Settings > Developer Settings:
Adicione uma aplicação e configure o arquivo `.env` com as informações: ClientId e ClientSecret

Adicione um valor que servirá de chave para o JWT_TOKEN no arquivo `.env`

``` bash
yarn
yarn prisma migrate dev #criar banco de daddos
yarn dev
```
O projeto estará escutando a porta 4000
