# Fractal React Challenge

This is a small project, that uses react on the frontend and node.js in the backend. 

## First Steps 🚀

_This instructions will allow you to have a copy of the proyect fully functional on your local machine for development and testing purpouses._

### Pre-requisites 📋

```
yarn package manager
postgresql or mysql database
node cli
```

### Instalación 🔧

_Clone this repo and get inside the generated folder_

```
 git clone https://github.com/Xrls9/fractal-test.git
 cd fractal-test
```

_Here are two folders, containing client and api side of the app, first we will do the api setup_

```
cd api                    //Inside the fractal-test
yarn or npm install       //Install dependencies
```

_Then you will need to setup a mysql or postgresql database, please do so, then create a .env file, here you have and example_

```
PORT=
# DATABASE_URL=mysql://root:@localhost:3306/fractal-test
# Connect to Supabase via connection pooling.
DATABASE_URL=
# Direct connection to the database. Used for migrations.
DIRECT_URL=

// DATABASE_URL and DIRECT_URL, for a local instalation can be the same, example: mysql://root:@localhost:3306/fractal-test

prisma/schema.prisma:

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  // provider  = "mysql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

//Modify as you need for your database provider

```
For more information about db config regarding this files, please check:

* [Prisma Documentation](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction)
* [Supabase Prisma PostgreSQL connection](https://supabase.com/docs/guides/database/prisma)

_Run the following command to expose the api_ ``` yarn dev or npm run dev```

```
$ tsx src/server.ts
Servidor corriendo en http://localhost:3000

```

## Deploy 📦

_You need a new env file, name it .env.production, the variables should point to your DB,
then choose a provider, in this case I used heroku_

_For my particular situation, heroku has a git integration, so you need to install heroku cli, login and then make a push into your heroku app
Note that this app is a monorepo, so you will need to push with heroku git only the /api folder, use the following:_

```git subtree push --prefix api heroku main```

* For more, checkout [Heroku git documentation](https://devcenter.heroku.com/articles/git)

_Once the app is deployed, run this command ```npm run db-push```_

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Yarn](https://yarnpkg.com/) - Dependencies manager
* [Typescript](https://www.typescriptlang.org/)
* [Tailwind](https://tailwindcss.com/) - Styiling
* [Express.js](https://expressjs.com/es/) - Framework for REST API
* [Vite-React](https://vite.dev/) - Webpack for React
* [PrismaORM](https://www.prisma.io/) - ORM and DB management

## Authors ✒️

* **Carlos Zapata** - *Developer* - [xrls9](https://github.com/Xrls9)

## Thanks 🎁

* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
  
---


⌨️ con ❤️ por [Xrls9](https://github.com/Xrls9) 😊
