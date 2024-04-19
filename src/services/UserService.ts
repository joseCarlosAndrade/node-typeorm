// arquivo destinado aos servicos que serao chamados a partir do userController
// ex: controller nao pode ter a responsabilidade de alterar o banco de dados,
// essa responsabilidade é do service

export interface User {
    name: string,
    email: string
}

// simulando um banco de dados
const db = [
    {
        name : "jose",
        email : "jose@jose.com"
    }
]

export class UserService {
    db: User[] 

    // this way we can mock a db for testing pourposes while allowing the code to reproduce in production environment
    constructor(database = db) {
        this.db = database
    }

    createUser = (name : string , email : string) => {
        const user = {
            name, 
            email
        }
        
        this.db.push(user);
        console.log("Adicionado: ", this.db);
    }

    getUsers = () => {
        return this.db;
    }

    deleteUsers = (user : string) : boolean => {
        let success = false;
        this.db.forEach(us => {
            
            if (us.name == user) {
                
                const index = this.db.indexOf(us);

                this.db.splice(index, 1);
                success = true;
            }
        });
        return success;
    }

}