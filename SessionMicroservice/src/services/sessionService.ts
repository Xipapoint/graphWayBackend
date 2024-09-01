import { Repository } from "typeorm";
import { Session } from "../entities/Session";
import { ISessionServiceImpl } from "./impl/sessionServiceImpl";
import { IGetAlgosResponseDTO } from "../dto/response/session/getAlgosResponseDTO";
import { IGetSessionTypesResponseDTO } from "../dto/response/session/getSessionTypesResponseDTO";

class SessionService implements ISessionServiceImpl{
    private sessionRepository: Repository<Session>
    constructor(sessionRepository: Repository<Session>){
        this.sessionRepository = sessionRepository
    }
    createSession(): Promise<Session> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            
        }
    }
    getSessionTypes(): Promise<IGetSessionTypesResponseDTO> {
        throw new Error("Method not implemented.");
    }
    getAlgosByStruct(): Promise<IGetAlgosResponseDTO> {
        throw new Error("Method not implemented.");
    }
    updateSession(): Promise<Session> {
        throw new Error("Method not implemented.");
    }
    deleteSession(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    changeNameSession(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getSessionsByUserId(): Promise<Session[]> {
        throw new Error("Method not implemented.");
    }
}