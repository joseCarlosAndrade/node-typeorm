import { Request, Response} from 'express';
import { User, UserService } from '../services/UserService';

// Arquivo usado para a definição dos handlers de rota relacionados ao usuario
// dessa forma, podemos usar no index.ts:
/*
server.post('/user', userController.createUser);
*/

// controller trabalha apenas com validaçoes do request.
// manipular banco de dados, acessar links, etc, fazemos em `services`




export class UserController {
    // Proposito desta funçao eh validar o request e chamar o service necessario

    userService : UserService
    // construtor que aceita um userService como parametro, mas ainda tem um valor default caso nenhum seja passado
    constructor ( userService = new UserService()) {
        this.userService = userService
    }

    createUser = (req: Request, res : Response) => {
        const user  = req.body;

        if (!user.name || !user.email) 
            return res.status(400).json({message: "User or email tag not found. Bad request."});

        // const userService = new UserService();

        this.userService.createUser(user["name"], user["email"])        
        return res.status(201).json({message : "Created"})
    }

    getAccounts = (req : Request, res : Response) => {
        // const userService = new UserService();
        const users = this.userService.getUsers()
        return res.status(200).json(users)
    }

    deleteUser = (req : Request, res : Response) => {
        const user = req.body;

        // const userService = new UserService();
        if (this.userService.deleteUsers(user.name)) {
            return res.status(200).json({message : "User deleted."})
        } else {
            return res.status(400).json({message : "User not found"})
        }
    }
}

