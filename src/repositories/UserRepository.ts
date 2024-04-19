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