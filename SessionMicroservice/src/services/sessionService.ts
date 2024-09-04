import { DeepPartial, FindOptionsWhere, Not, ObjectLiteral, Repository } from "typeorm";
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
import { IUpdateSessionRequestDTO } from "../dto/request/updateSession/UpdateSessionRequestDTO";
import { Vertex } from "../entities/Vertex";
import { IVertex } from "../dto/request/updateSession/interfaces/vertex";
import { Edge } from "../entities/Edge";
import { IEdge } from "../dto/request/updateSession/interfaces/edge";
import { ISessionStructRepositoryImpl } from "../repository/impl/sessionStructRepositoryImpl";
import { ISessionTypeRepositoryImpl } from "../repository/impl/sessionTypeRepositoryImpl";
import { ISessionAlghoRepositoryImpl } from '../repository/impl/sessionAlghoRepositoryImpl';
import { IUpdateOrDeleteSessionVertexRequestDTO } from "../dto/request/updateSession/UpdateSessionVertexRequestDTO";
import { IUpdateOrDeleteSessionEdgeRequestDTO } from "../dto/request/updateSession/UpdateSessionEdgeRequestDTO";

class SessionService implements ISessionServiceImpl{
    private sessionRepository: Repository<Session>
    private sessionStructRepository: ISessionStructRepositoryImpl
    private sessionTypeRepository: ISessionTypeRepositoryImpl
    private sessionAlghorithmRepository: ISessionAlghoRepositoryImpl
    private sessionVertexRepository: Repository<Vertex>
    private sessionEdgeRepository: Repository<Edge>;
    constructor(
        sessionRepository: Repository<Session>, 
        sessionStructRepository: ISessionStructRepositoryImpl,
        sessionTypeRepository: ISessionTypeRepositoryImpl, 
        sessionAlghorithmRepository: ISessionAlghoRepositoryImpl,
        sessionVertexRepository: Repository<Vertex>,
        sessionEdgeRepository: Repository<Edge>
    ){
        this.sessionRepository = sessionRepository
        this.sessionStructRepository = sessionStructRepository
        this.sessionTypeRepository = sessionTypeRepository
        this.sessionAlghorithmRepository = sessionAlghorithmRepository
        this.sessionVertexRepository = sessionVertexRepository
        this.sessionEdgeRepository = sessionEdgeRepository
    }

    private async verifyUserExists(userId: string): Promise<void> {
        const checkUserExistsRabbitMQMessage: CheckUserExistsRequestMessage = {
            serviceType: 'checkUserExists',
            data: { id: userId }
        };
        const responseRabbitMQ = await producer.publishMessage<CheckUserExistsResponse>(checkUserExistsRabbitMQMessage);
        if (!responseRabbitMQ.isUserExists) throw new NotFoundError("User doesnt exist");
    }

    private async deleteEntity(repository: Repository<any>, id: number): Promise<void> {
        await repository.delete(id);
    }

    private async createOrUpdateEntity<T extends ObjectLiteral>(
        repository: Repository<T>, 
        data: DeepPartial<T>, 
        where?: FindOptionsWhere<T>
    ): Promise<void> {
        if (where) {
            const entity = await repository.findOne({ where });
            if (!entity) throw new NotFoundError(`Entity with the specified condition not found: ${where}`);
            Object.assign(entity, data);
            await repository.save(entity);
        } else {
            const createdEntity = repository.create(data);
            await repository.save(createdEntity);
        }
    }
    

    private async updateVertices(updateVertices: IUpdateOrDeleteSessionVertexRequestDTO[], sessionId: string) {
        for (const updateVertex of updateVertices) {
            if (updateVertex.updateType === 'delete') {
                await this.deleteEntity(this.sessionVertexRepository, updateVertex.id);
            } else {
                const vertex = updateVertex.vertex!
                await this.createOrUpdateEntity(this.sessionVertexRepository, {
                    vertexId: vertex.vertexId,
                    xCord: vertex.xCord,
                    yCord: vertex.yCord,
                    isShortest: vertex.isShortest,
                    pair: vertex.pair,
                    session: await this.sessionRepository.findOne({ where: { id: sessionId } }) as Session
                }as DeepPartial<Vertex>);
            }
        }
    }

    private async updateEdges(updateEdges: IUpdateOrDeleteSessionEdgeRequestDTO[], sessionId: string) {
        for (const updateEdge of updateEdges) {
            if (updateEdge.updateType === 'delete') {
                await this.deleteEntity(this.sessionEdgeRepository, updateEdge.id);
            } else {
                const edge = updateEdge.edge!
                await this.createOrUpdateEntity(this.sessionEdgeRepository, {
                    edgeId: edge.id,
                    weight: edge.weight,
                    left: edge.left,
                    top: edge.top,
                    angle: edge.angle,
                    startVertex: edge.startVertex,
                    endVertex: edge.endVertex,
                    session: await this.sessionRepository.findOne({ where: { id: sessionId } }) as Session
                }as DeepPartial<Edge>);
            }
        }
    }

    //PUBLIC
    async createSession(createSessionData: ICreateSessionRequestDTO): Promise<ICreateSessionResponseDTO> {
        try {
            const {sessionTypeId, sessionStructId, alghorithmId, userId} = createSessionData
            const existingSessionType = await this.sessionTypeRepository.findSessionType(sessionTypeId);
            const existingSessionStructure = await this.sessionStructRepository.findSessionStructure(sessionStructId);
            const existingAlghorithm = await this.sessionAlghorithmRepository.findSessionAlghorithm(alghorithmId);
            await this.verifyUserExists(userId);
            const session: Session = this.sessionRepository.create(
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
            const sessionTypes = await this.sessionTypeRepository.findAll({select: ['sessionTypeName', 'sessionTypeImage']})
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
            const alghorithms = await this.sessionAlghorithmRepository.findAll(
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
            const structures = await this.sessionStructRepository.findAll(
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

    async updateSession(sessionUpdate: IUpdateSessionRequestDTO): Promise<Session> {
        const sessionId = sessionUpdate.sessionId
        const session = await this.sessionRepository.findOne({where: {id: sessionId}})
        if(!session) throw new NotFoundError("Session doesnt exist")
        const vertices = sessionUpdate.vertices
        const edges = sessionUpdate.edges
        if(vertices){
            await this.updateVertices(vertices, sessionId)
        }
        if(edges){
            await this. updateEdges(edges, sessionId)
        }

        await this.sessionRepository.save(session)
        return session
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