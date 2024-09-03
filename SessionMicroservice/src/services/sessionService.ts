import { Repository } from "typeorm";
import { Session } from "../entities/Session";
import { ISessionServiceImpl } from "./impl/sessionServiceImpl";
import { IGetAlgosResponseDTO } from "../dto/response/session/getAlgosResponseDTO";
import { IGetSessionTypesResponseDTO } from "../dto/response/session/getSessionTypesResponseDTO";
import { ICreateSessionRequestDTO } from "../dto/request/CreateSessionRequestDTO";
import { SessionStructures } from "../entities/SessionStructures";
import { SessionTypes } from "../entities/SessionTypes";
import { Alghorithm } from '../entities/Alghorithm';

class SessionService implements ISessionServiceImpl{
    private sessionRepository: Repository<Session>
    private sessionStructRepository: Repository<SessionStructures>
    private sessionTypeRepository: Repository<SessionTypes>
    private sessionAlghorithmRepository: Repository<Alghorithm>
    constructor(
        sessionRepository: Repository<Session>, 
        sessionStructRepository: Repository<SessionStructures>, 
        sessionTypeRepository: Repository<SessionTypes>, 
        sessionAlghorithmRepository: Repository<Alghorithm>
    ){
        this.sessionRepository = sessionRepository
        this.sessionStructRepository = sessionStructRepository
        this.sessionTypeRepository = sessionTypeRepository
        this.sessionAlghorithmRepository = 
    }
    async createSession(createSessionData: ICreateSessionRequestDTO): Promise<Session> {
        try {
            const {sessionTypeId, sessionStructId, alghorithmId, userId} = createSessionData
            const existingSessionType = await this.sessionTypeRepository.findOne({where: {id: sessionTypeId} })
            if(!existingSessionType) throw new Error("Session type doesnt exist")
            const existingSessionStructure = await this.sessionStructRepository.findOne({where: {id: sessionStructId} })
            if(!existingSessionStructure) throw new Error("Session structure doesnt exist")
            const existingAlghorithm = await this.sessionAlghorithmRepository.findOne({where: {id: alghorithmId}})
            if(!existingAlghorithm) throw new Error("Session alghorithm doesnt exist")
            //TODO: Implement rabbitmq logic to check whether the user exists
            const session: Session =await this.sessionRepository.create(
            {
                sessionType: existingSessionType, 
                structType: existingSessionStructure, 
                alghorithm: existingAlghorithm,
                userId: userId,
            })
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