import { Router } from "express";
import sessionController from "../contollers/sessionController";

export const sessionRouter = Router();

sessionRouter.post('/security/createSession', sessionController.createSession)
sessionRouter.put('/security/updateSession', sessionController.updateSession)
sessionRouter.get('/getsessiontypes', sessionController.getSessionTypes)
