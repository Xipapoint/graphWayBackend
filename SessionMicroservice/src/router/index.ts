import { Router } from "express";
import { sessionRouter } from "./sessionRouter";

export const router = Router();

router.use('/session', sessionRouter)