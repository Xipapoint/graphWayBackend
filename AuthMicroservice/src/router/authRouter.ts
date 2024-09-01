import { Router } from "express";
import AuthController from "../contollers/authController";

export const authRouter = Router();

authRouter.post('/register', AuthController.registration)
authRouter.post('/login', AuthController.login)
authRouter.post('/refresh', AuthController.refresh)