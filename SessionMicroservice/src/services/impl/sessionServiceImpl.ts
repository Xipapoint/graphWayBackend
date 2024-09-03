import { Session } from "../../entities/Session";

import { ICreateSessionRequestDTO } from "../../dto/request/CreateSessionRequestDTO";
import { ICreateSessionResponseDTO } from "../../dto/response/session/CreateSessionResponseDTO";
import { IGetAlgosResponseDTO } from "../../dto/response/session/GetAlgosResponseDTO";
import { IGetSessionTypesResponseDTO } from "../../dto/response/session/GetSessionTypesResponseDTO";
import { IGetSessionStructuresResponseDTO } from "../../dto/response/session/GetSessionStructuresResponseDTO";


export interface ISessionServiceImpl{
    createSession(createSessionData: ICreateSessionRequestDTO): Promise<ICreateSessionResponseDTO>
    getSessionTypes(): Promise<IGetSessionTypesResponseDTO[]>
    getSessionStructures(): Promise<IGetSessionStructuresResponseDTO>
    getAlgosByStruct(): Promise<IGetAlgosResponseDTO[]>
    updateSession(): Promise<Session>
    deleteSession(): Promise<boolean>
    changeNameSession(): Promise<string>
    getSessionsByUserId(): Promise<Session[]>
}