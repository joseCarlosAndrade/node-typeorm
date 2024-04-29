// import { User } from "../entities/User";
import { UserService } from "./UserService"

// copiando o endereco de user repository para mock. faz com que ele procure o mock ao inves de chamar o user repository real quando estiver esta importacao
jest.mock("../repositories/UserRepository")

// mokando user repository
const mockUserRepository = require('../repositories/UserRepository');

describe('UserService', () => {

    const userService = new UserService(mockUserRepository);

    const mockUser = {
        name: 'jose',
        email : 'jose@jose',
        password : 'minhasenha'
    }

    it('Should add a new user', async () => {
        // implementando createUser do nosso mock user repository
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        
        const response = await userService.createUser(mockUser.name, mockUser.email, mockUser.password);

        // validando retornos
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject(mockUser)
    })
})