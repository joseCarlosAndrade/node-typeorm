import { Router } from "express";
import { UserController } from "./controllers/UserController";

// arquivo dedicado para isolar as rotas criadas para a nossa api

export const router = Router();
const userController = new UserController();

router.post('/user', userController.createUser);
router.get('/user', userController.getUser);
router.delete('/user', userController.deleteUser);
