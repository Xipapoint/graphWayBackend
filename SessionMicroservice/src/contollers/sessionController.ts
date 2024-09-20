import { NextFunction, Request, Response } from "express";
import { ICreateSessionRequestDTO } from "../dto/request/createSession/CreateGraphSessionRequestDTO";
import { IUpdateSessionRequestDTO } from "../dto/request/updateSession/UpdateSessionRequestDTO";
import { ISessionServiceImpl } from "../services/impl/sessionServiceImpl";
import sessionService from "../services/sessionService";

class SessionController {
    private sessionService: ISessionServiceImpl;

    constructor(sessionService: ISessionServiceImpl) {
        this.sessionService = sessionService;
    }

    async createSession(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const createSessionData: ICreateSessionRequestDTO = req.body;
            const response = await this.sessionService.createSession(createSessionData);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    async getSessionTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sessionTypes = await this.sessionService.getSessionTypes();
            res.status(200).json(sessionTypes);
        } catch (error) {
            next(error);
        }
    }

    async getAlgosByStruct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const algorithms = await this.sessionService.getAlgosByStruct();
            res.status(200).json(algorithms);
        } catch (error) {
            next(error);
        }
    }

    async getSessionStructures(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const structures = await this.sessionService.getSessionStructures();
            res.status(200).json(structures);
        } catch (error) {
            next(error);
        }
    }

    async updateSession(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sessionUpdate: IUpdateSessionRequestDTO = req.body;
            const updatedSession = await this.sessionService.updateSession(sessionUpdate);
            res.status(200).json(updatedSession);
        } catch (error) {
            next(error);
        }
    }
}
export default new SessionController(sessionService)