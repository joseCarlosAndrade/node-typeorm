// arquivo destinado aos servicos que serao chamados a partir do userController
// ex: controller nao pode ter a responsabilidade de alterar o banco de dados,
// essa responsabilidade é do service

import { stringify } from "querystring";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository"



export class UserService {
    private userRepository : UserRepository; // manager do repositorio para alterar o bd

    constructor( 
        userRepository = new UserRepository(AppDataSource.manager)
    ) {
        // caso userRepository nao seja passado por parametro, usa o valor de AppDataSource
        this.userRepository = userRepository;
    }

    // create user do services, cria um usuario usando o user repository que foi passado na instanciaçao do repositorio. por padrao, usa o appdatasource.manager como manager.
    createUser = async (name : string , email : string, password : string) : Promise<User> => {
       const user = new User(name, email, password);
        return this.userRepository.createUser(user);
    }

    getUser = () => {
      
    }

}