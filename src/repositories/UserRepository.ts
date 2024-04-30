import { EntityManager } from "typeorm";
// import { AppDataSource } from "../database";
import { User } from "../database/entities/User";

export class UserRepository {
    // funcao do typeorm manage, para gerenciar, deletar, criar, editar
    private manager: EntityManager

    constructor(
        manager : EntityManager // pegar o manager do nosso datasource
    ) {
        this.manager = manager;
    }

    createUser =  async (user : User) : Promise<User> => { // funcoes de manipulaçoes sao assincronas
        console.log("saving: ", user)
        return this.manager.save(user);
    }

    getuser = async (userId: string) : Promise<User | null>  => {
        return this.manager.findOne(User, { // find just one element of type User where user_id matches userId
            where : {
                user_id : userId
            }
        })
    }
}