import exp from "constants";
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock";
import { User } from "../database/entities/User";
import { UserRepository } from "./UserRepository";
import { EntityManager } from "typeorm";

describe('UserRepository', () => {
    let userRepository : UserRepository;
    let managerMock: Partial<EntityManager>;

    const mockUser : User = {
        user_id : '123',
        name: 'my test',
        email: 'my email',
        password: 'my_password'   
    }

    beforeAll( async () => {
        managerMock = await getMockEntityManager({
            saveReturn: mockUser
        });
        userRepository = new UserRepository(managerMock as EntityManager);
    }) // ser executado antes dos testes

    it('Deve cadastrar um novo usuario', async () => {
        const response = await userRepository.createUser(mockUser);

        expect(managerMock.save).toHaveBeenCalled();
        expect(response).toMatchObject(mockUser);
    })
})