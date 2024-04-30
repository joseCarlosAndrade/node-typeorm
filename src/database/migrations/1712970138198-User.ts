import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1712970138198 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( // criando a tabela users
            new Table({
                name : 'users', // nome da tabela, usada para decorador entities
                columns : [
                    {
                        name: 'user_id',
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
