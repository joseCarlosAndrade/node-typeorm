import { UserController } from "./UserController"
import { UserService } from "../services/UserService"

// import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";



describe('UserController', () => {
    // usando o operador partial podemos usar apenas
    // as propriedades que nos interessam no objeto
    const mockUserService: Partial<UserService> = {
        createUser : jest.fn() // simular chamada dessa funcao com jest
    }

    // passando mockuserservice como o tipo UserService
    // para nao passar o userService real
    const userController = new UserController(mockUserService as UserService);

    

   

    it('Should add a new user', ()=> {
        // console.log(userController);
        // const mockRequest = makeMockRequest({
            // body : {}
        // });
        const mockRequest = {
            body : {
                name : 'jose',
                email: 'email.com'
            }
        } as Request;

        const mockResponse = makeMockResponse();

        userController.createUser(mockRequest,mockResponse);

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message : "Created"})
    })
})