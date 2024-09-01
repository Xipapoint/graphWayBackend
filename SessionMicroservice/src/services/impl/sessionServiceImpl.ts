import { Session } from "../../entities/Session";
import { IGetAlgosResponseDTO } from "../../dto/response/session/getAlgosResponseDTO";
import { IGetSessionTypesResponseDTO } from "../../dto/response/session/getSessionTypesResponseDTO";

export interface ISessionServiceImpl{
    createSession(): Promise<Session>
    getSessionTypes(): Promise<IGetSessionTypesResponseDTO>
    getAlgosByStruct(): Promise<IGetAlgosResponseDTO>
    updateSession(): Promise<Session>
    deleteSession(): Promise<boolean>
    changeNameSession(): Promise<string>
    getSessionsByUserId(): Promise<Session[]>
}