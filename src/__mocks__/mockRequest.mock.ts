import { Request } from "express";
import { Params} from 'express-serve-static-core';

// mockando request e response
// corpo desta funcao eh um padrao
export const makeMockRequest = ({params, query} : {params?:  Params, query?: Params} ) : Request => {
    const request = {
        params : params ||  {},
        query : query || {}
    } as unknown;

    return request as Request;
}