import { Session } from "../../entities/Session";

import { ICreateSessionRequestDTO } from "../../dto/request/createSession/CreateGraphSessionRequestDTO";
import { IGetAlgosResponseDTO } from "../../dto/response/session/GetAlgosResponseDTO";
import { IGetSessionTypesResponseDTO } from "../../dto/response/session/GetSessionTypesResponseDTO";
import { IGetSessionStructuresResponseDTO } from "../../dto/response/session/GetSessionStructuresResponseDTO";
import { ICreateGraphSessionResponseDTO } from "../../dto/response/session/CreateGraphSessionResponseDTO";
import { ICreateTreeSessionResponseDTO } from "../../dto/response/session/CreateTreeSessionRepository.interface";


export interface ISessionServiceImpl{
    createSession(createSessionData: ICreateSessionRequestDTO): Promise<ICreateGraphSessionResponseDTO | ICreateTreeSessionResponseDTO>
    getSessionTypes(): Promise<IGetSessionTypesResponseDTO[]>
    getSessionStructures(): Promise<IGetSessionStructuresResponseDTO[]>
    getAlgosByStruct(): Promise<IGetAlgosResponseDTO[]>
    updateSession(serializedSessionData: Uint8Array, sessionType: SESSIONTYPE, weightType: WEIGHTTYPE, dataType: DATATYPE): Promise<boolean>
    deleteSession(): Promise<boolean>
    changeNameSession(): Promise<string>
    getSessionsByUserId(): Promise<Session[]>
}