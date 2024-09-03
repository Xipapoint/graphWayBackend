import { Not, Repository } from "typeorm";
import { Session } from "../entities/Session";
import { ISessionServiceImpl } from "./impl/sessionServiceImpl";
import { ICreateSessionRequestDTO } from "../dto/request/CreateSessionRequestDTO";
import { SessionStructures } from "../entities/SessionStructures";
import { SessionTypes } from "../entities/SessionTypes";
import { Alghorithm } from '../entities/Alghorithm';
import { CheckUserExistsRequestMessage } from "../rabbitMQ/types/request/requestTypes";
import producer from "../rabbitMQ/producer";
import { CheckUserExistsResponse } from "../rabbitMQ/types/response/responseTypes";
import { ICreateSessionResponseDTO } from "../dto/response/session/CreateSessionResponseDTO";
import NotFoundError from "../error/4__Error/NotFoundError.error";
import { IGetSessionStructuresResponseDTO } from "../dto/response/session/GetSessionStructuresResponseDTO";
import { IGetAlgosResponseDTO } from "../dto/response/session/GetAlgosResponseDTO";
import { IGetSessionTypesResponseDTO } from "../dto/response/session/GetSessionTypesResponseDTO";

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
        this.sessionAlghorithmRepository = sessionAlghorithmRepository
    }
    //PRIVATE
    private async findSessionType(sessionTypeId: number): Promise<SessionTypes> {
        const sessionType = await this.sessionTypeRepository.findOne({ where: { id: sessionTypeId } });
        if (!sessionType) throw new NotFoundError("Session type doesnt exist");
        return sessionType;
    }

    private async findSessionStructure(sessionStructId: number): Promise<SessionStructures> {
        const sessionStructure = await this.sessionStructRepository.findOne({ where: { id: sessionStructId } });
        if (!sessionStructure) throw new NotFoundError("Session structure doesnt exist");
        return sessionStructure;
    }

    private async findSessionAlghorithm(alghorithmId: number): Promise<Alghorithm> {
        const alghorithm = await this.sessionAlghorithmRepository.findOne({ where: { id: alghorithmId } });
        if (!alghorithm) throw new NotFoundError("Session alghorithm doesnt exist");
        return alghorithm;
    }

    private async verifyUserExists(userId: string): Promise<void> {
        const checkUserExistsRabbitMQMessage: CheckUserExistsRequestMessage = {
            serviceType: 'checkUserExists',
            data: { id: userId }
        };
        const responseRabbitMQ = await producer.publishMessage<CheckUserExistsResponse>(checkUserExistsRabbitMQMessage);
        if (!responseRabbitMQ.isUserExists) throw new NotFoundError("User doesnt exist");
    }
    //PUBLIC
    async createSession(createSessionData: ICreateSessionRequestDTO): Promise<ICreateSessionResponseDTO> {
        try {
            const {sessionTypeId, sessionStructId, alghorithmId, userId} = createSessionData
            const existingSessionType = await this.findSessionType(sessionTypeId);
            const existingSessionStructure = await this.findSessionStructure(sessionStructId);
            const existingAlghorithm = await this.findSessionAlghorithm(alghorithmId);
            await this.verifyUserExists(userId);
            const session: Session =await this.sessionRepository.create(
            {
                sessionType: existingSessionType, 
                structType: existingSessionStructure, 
                alghorithm: existingAlghorithm,
                userId: userId,
            })
            await this.sessionRepository.save(session)
            const response: ICreateSessionResponseDTO = {
                id: session.id, 
                sessionType: session.sessionType.sessionTypeName,
                sessionStruct: session.sessionType.sessionTypeName
            }
            return response
        } catch(error){
            console.error(error)
            throw error
        }
    }    
    async getSessionTypes(): Promise<IGetSessionTypesResponseDTO[]> {
        try {
            const sessionTypes = await this.sessionTypeRepository.find({select: ['sessionTypeName', 'sessionTypeImage']})
            const response: Promise<IGetSessionTypesResponseDTO>[] = sessionTypes.map(async sessionType => ({
                sessionTypeName: sessionType.sessionTypeName,
                sessionImage: sessionType.sessionTypeImage
            }))
            return await Promise.all(response)
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async getAlgosByStruct(): Promise<IGetAlgosResponseDTO[]> {
        try {
            const alghorithms = await this.sessionAlghorithmRepository.find(
                {select: ['alghorithmName', 'alghorithmImage', 'alghorithmDescription']}
            )
            const response: Promise<IGetAlgosResponseDTO>[] = alghorithms.map(async alghorithm => ({
                alghorithm: alghorithm.alghorithmName,
                alghorithmDescription: alghorithm.alghorithmDescription,
                alghorithmImage: alghorithm.alghorithmImage
            }))
            return await Promise.all(response)
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async getSessionStructures(): Promise<IGetSessionStructuresResponseDTO[]> {
        try {
            const structures = await this.sessionStructRepository.find(
                {select: ['sessionStructureName', 'structDescription', 'sessionStructureImage']}
            )
            const response: Promise<IGetSessionStructuresResponseDTO>[] = structures.map(async structure => ({
                sessionStructureName: structure.sessionStructureName,
                structDescription: structure.structDescription,
                sessionStructureImage: structure.sessionStructureImage
            }))
            return await Promise.all(response)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateSession(): Promise<Session> {
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