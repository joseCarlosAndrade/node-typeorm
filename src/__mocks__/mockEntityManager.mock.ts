import { EntityManager } from "typeorm";

interface mockManagerArgs { // mockando retornos
    saveReturn? : object | [object] // informando o tipo de retorno do metodo save
    findOneReturn? : object 
}

export const getMockEntityManager = async ( 
    {
        saveReturn = undefined,
        findOneReturn = undefined
    } : mockManagerArgs) : Promise<EntityManager> => {
    const manager: Partial<EntityManager> = {} // partial : tem algumas propriedades de entity manager, mas nao todas
    
    // mockando cada funcionalidade do entity manager. mockImplementation nos permite observar os parametros e retorno da funcao implementada
    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn)); // jest.fn eh uma forma de mockar uma chamada de funcao dentro do jest

    manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn));

    return manager as EntityManager;
}