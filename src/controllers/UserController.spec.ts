import { UserController } from "./UserController"
import { UserService } from "../services/UserService"


// import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

// jest.mock('../database' , () => {
//     initialize : jest.fn()
// })

const mockUserService = {
    createUser : jest.fn()
}

// faz com que a chamada de ../services/UserService retorne o objeto mockado com a funcao createUser mockada tambem
jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService;
        })
    }
})

describe('UserController', () => {
    // usando o operador partial podemos usar apenas
    // as propriedades que nos interessam no objeto
    const mockUserService: Partial<UserService> = {
        createUser : jest.fn() // simular chamada dessa funcao com jest
    }

    // passando mockuserservice como o tipo UserService
    // para nao passar o userService real
    // const userController = new UserController(mockUserService as UserService);

    // podemos chamar assim mesmo, pois ja mockamos o userservice la em cima com jest fn implementation 
    const userController = new UserController(); 

    const mockResponse = makeMockResponse();

   

    it('Should add a new user', ()=> {
        // console.log(userController);
        // const mockRequest = makeMockRequest({
            // body : {}
        // });
        const mockRequest = {
            body : {
                name : 'jose',
                email: 'email.com',
                password : 'mypassword'
            }
        } as Request;

        

        userController.createUser(mockRequest,mockResponse);

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message : "Created"})
    })

    it('Should return a bad request for password empty', () => {
        const mockRequest = {
            body : {
                name : 'name',
                email : 'email',
                password : ''
            }
        } as Request;

        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message : "User, email or password tag not found. Bad request."});
    })
})