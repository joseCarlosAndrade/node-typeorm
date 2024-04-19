import { UserService, User } from "./UserService"

describe('UserService', () => {
    // mocking a database for testing enviornment
    const mockdb : User[] = []
    const userService = new UserService(mockdb);

    it('Should add a new user', () => {
        const mockConsole = jest.spyOn(global.console, 'log');
        userService.createUser('jose', 'jose@jose');

        expect(mockConsole).toHaveBeenCalled()
    })
})