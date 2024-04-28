import express, {Request, Response} from 'express';
import { router } from './routes';
import 'reflect-metadata'
import { AppDataSource } from './database';

// inicialiando o servidor
const server = express();



server.use(express.json()) // permite trabalhar com json
server.use(router)

// rota raiz
server.get('/', (req : Request, res : Response) => {
    return res.status(200).json({message : "Success"})
})



server.listen(5000, () => {
    console.log("Rodando na porta 5000");
});