# Backend com NODE express e TypeORM com JWT


Init a npm repository:

```bash
    npm init --y
```

Install typescript:

```bash
    npm i typescript ts-node-dev
```

Init typescript:

```bash
    npx tsc --init
```

### Installing express and its typescript typing

```bash
    npm i express
    npm i -D @types/express
```

## TypeORM

Instalando typeORM (do tutorial do site oficial [neste  link](https://typeorm.io/)):

```bash

    npm i typeorm

```

```bash

    npm install reflect-metadata --save

```

```bash

    npm install @types/node --save-dev #  node typings

```

Instalando CLI

```bash
    npm install ts-node # caso ainda nao instaladao

```

Instalando drivers das bases de dados

```bash

    npm install sqlite3 --save # para sqlite
    # escolher um
    npm install pg --save # para postgresql

```

## Usando SQLite

SQLite usa arquivos, é uma base pequena.

## Migrations

Script a ser salvo:

```json

"scripts" : {
    ...
    "typeorm" : "typeorm-ts-node-commonjs",
    "migration:create" : "npm run typeorm migration:create -n"
}

```

Para criar uma migration:

```bash

    # npm run typeorm migration:create path/relativo/migrations
    npm run migration:create src/database/migrations/User

```

Rodando as migrations:

```bash

    # npm run typeorm migration:run -d path/to/dataSource
    npm run typeorm migration:run -d 

    npx typeorm-ts-node-commonjs migration:run -d src/database/index.ts # ou migration:reverse para deletar


```

## Scripts finais em package.json

```json
{
    ...

    "typeorm" : "typeorm-ts-node-commonjs",
    "migration:create" : "npm run typeorm migration:create -n",
    "migration:run" : "npx typeorm-ts-node-commonjs migration:run -d src/database/index.ts",
    "migration:revert" : "npx typeorm-ts-node-commonjs migration:revert -d src/database/index.ts"
}
```

## Criando tabelas

Após a criação de uma migration, podemos colocar informações como:

```typescript

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1712970138198 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( // criando a tabela users
            new Table({
                name : 'users',
                columns : [
                    {
                        name: 'id_user',
                        type: 'string',
                        isPrimary : true // indica que eh a coluna primaria
                    },
                    {
                        name : 'name',
                        type : 'string',
                        isNullable : false
                    },
                    {
                        name : 'email',
                        type : 'stirng',
                        isNullable : false,
                        isUnique : true // cada usuario deve ter um email diferente
                    },
                    {
                        name : 'password',
                        type : 'string',
                        isNullable : false,
                        
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users'); // revertendo a tabela users
    }

}

```

E executar

```bash

    npm run migration:run # cas ja tenha rodado isso, deve ser dropado antes, com migration:revert

```

## Entities e Repository

Entidades são a abstração dos tipos dados e colunas do nosso banco de dados definidos em `migrations/`. São a forma com que pensamos em dados em `typescript` (ou na linguagem que estmaos usando). Já os repositórios são interfaces que usam essa abstração de entidades para manipular o banco de dados em si.

### Criação Entity

Criar cada entity como em `entities/User.ts`, no padrão deste diretório. Usar o decorador `@Entity()` para referenciar a tabela criada em migrations. Por exemplo:

```typescript

import { randomUUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users') // nome da tabela que esta entidade fará referencia.
export class User{
    // de acordo com as colunas qeu a tabela users tem:

    @PrimaryGeneratedColumn() // coluna primaria da tabela users, gerada gerada pelo bd, nao por nos
    user_id : string
    
    @Column( { nullable : false}) // coluna que nao pode ser nula
    name : string

    @Column({ nullable : false, unique: true}) //coluna que nao pode ser nula nem repetir
    email : string

    @Column({ nullable : false}) // coluna que nao pode ser nula
    password : string

    constructor( // definindo construtor que atribui os dados pra cada entidade
        
        name: string,
        email : string,
        password : string
    ) {
        this.user_id = randomUUID(); // gerando um id aleatorio para cada usuario
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

```

### Criação Repository

Para respotitorios, criar em `repositories/UserRepository` neste padrão:

```typescript

import { EntityManager } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../entities/User";

export class UserRepository {
    // funcao do typeorm manage, para gerenciar, deletar, criar, editar
    private manager: EntityManager

    constructor(
        manager = AppDataSource.manager // pegar o manager do nosso datasource
    ) {
        this.manager = manager;
    }

    createUser =  async (user : User) => { // funcoes de manipulaçoes sao assincronas
        return this.manager.save(user);
    }
}

```

## Rodando projeto

Após criação e configuração, validação com testes etc das rotas com seus respectivos callbacks, iniciamos a aplicação rodando primeiramente as migrations para sincronizar a base de dados, e, em seguida, podemos inciar o servidor para aceitar requisições.

```bash

    npm run migration:run
    npm run dev

```
