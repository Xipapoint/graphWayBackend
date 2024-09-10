import { EntityManager, ObjectLiteral, Repository } from 'typeorm';
import { Session } from '../entities/Session';
import { ISessionServiceImpl } from "./impl/sessionServiceImpl";
import { ICreateSessionRequestDTO } from "../dto/request/CreateSessionRequestDTO";
import { CheckUserExistsRequestMessage } from "../rabbitMQ/types/request/requestTypes";
import producer from "../rabbitMQ/producer";
import { CheckUserExistsResponse } from "../rabbitMQ/types/response/responseTypes";
import { ICreateSessionResponseDTO } from "../dto/response/session/CreateSessionResponseDTO";
import NotFoundError from "../error/4__Error/NotFoundError.error";
import { IGetSessionStructuresResponseDTO } from "../dto/response/session/GetSessionStructuresResponseDTO";
import { IGetAlgosResponseDTO } from "../dto/response/session/GetAlgosResponseDTO";
import { IGetSessionTypesResponseDTO } from "../dto/response/session/GetSessionTypesResponseDTO";
import { IUpdateSessionRequestDTO } from "../dto/request/updateSession/UpdateSessionRequestDTO";
import { Vertex } from "../entities/structures/Vertex";
import { Edge } from "../entities/structures/Edge";
import { ISessionStructRepositoryImpl } from "../repository/impl/repos/sessionStructRepositoryImpl";
import { ISessionTypeRepositoryImpl } from "../repository/impl/repos/sessionTypeRepositoryImpl";
import { ISessionAlghoRepositoryImpl } from '../repository/impl/repos/sessionAlghoRepositoryImpl';
import { IUpdateOrDeleteSessionVertexRequestDTO } from "../dto/request/updateSession/updateSessionData/UpdateSessionVertexRequestDTO";
import { IUpdateOrDeleteSessionEdgeRequestDTO } from "../dto/request/updateSession/updateSessionData/UpdateSessionEdgeRequestDTO";
import { AppDataSource } from "../dataSource";
import sessionStructRepository from "../repository/repos/sessionStructRepository";
import sessionTypeRepository from "../repository/repos/sessionTypeRepository";
import sessionAlghoRepository from "../repository/repos/sessionAlghoRepository";
import * as fs from 'fs'
import * as path from 'path'
import { IVertexRepositoryImpl } from "../repository/impl/repos/vertexRepositoryImpl";
import VertexRepository from "../repository/repos/vertexRepository";
import { IBaseRepositoryImpl } from "../repository/impl/baseRepositoryImpl";
import { IEdgeRepositoryImpl } from "../repository/impl/repos/edgeRepositoryImpl";
import edgeRepository from "../repository/repos/edgeRepository";
import { IVertex } from "../dto/request/updateSession/interfaces/structures/vertex";
import { IEdge } from "../dto/request/updateSession/interfaces/structures/edge";
import { IBaseCreateOrUpdateRequestDTO } from '../dto/request/updateSession/BaseCreateOrUpdateRequestDTO';

class SessionService implements ISessionServiceImpl{
    private sessionRepository: Repository<Session>
    private sessionStructRepository: ISessionStructRepositoryImpl
    private sessionTypeRepository: ISessionTypeRepositoryImpl
    private sessionAlghorithmRepository: ISessionAlghoRepositoryImpl
    private sessionVertexRepository: IVertexRepositoryImpl
    private sessionEdgeRepository:  IEdgeRepositoryImpl;
    constructor(
        sessionRepository: Repository<Session>, 
        sessionStructRepository: ISessionStructRepositoryImpl,
        sessionTypeRepository: ISessionTypeRepositoryImpl, 
        sessionAlghorithmRepository: ISessionAlghoRepositoryImpl,
        sessionVertexRepository: IVertexRepositoryImpl,
        sessionEdgeRepository: IEdgeRepositoryImpl
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

    private async deleteEntity<T extends ObjectLiteral>(repository: IBaseRepositoryImpl<T>, ids: number[], manager: EntityManager): Promise<void> {
        await repository.batchDeleteEntities(ids, manager)
    }

    private async createOrUpdateEntity<T extends ObjectLiteral>(
        repository: IBaseRepositoryImpl<T>,
        createData: IBaseCreateOrUpdateRequestDTO<T>[], 
        updateData: IBaseCreateOrUpdateRequestDTO<T>[],
        manager: EntityManager,
        sessionId: string
    ): Promise<void> {
        const session = await this.sessionRepository.findOne({where: {id: sessionId}})
        createData.length !== 0 ? repository.batchCreateEntity(createData, manager, session!) : null
        updateData.length !== 0
            ? updateData.forEach(data => {
                repository.batchUpdateEntity(data, data.id, manager)     
            })
            : null
    }
    

    private async updateVertices(updateVertices: IUpdateOrDeleteSessionVertexRequestDTO[], manager: EntityManager, sessionId: string) {
        const creatOperationVertices: IVertex<Vertex>[] = []
        const updateOperationVertices: IVertex<Vertex>[] = []
        const deleteOperationVertices: number[] = []
        for (const updateVertex of updateVertices) {
            const updateType = updateVertex.updateType
            if (updateType === 'delete') {
                deleteOperationVertices.push(updateVertex.id)
            } else {
                const vertex = updateVertex.vertex!
                const whereCondition = updateType === 'update' ? vertex.id : undefined
                whereCondition ? updateOperationVertices.push(vertex) : creatOperationVertices.push(vertex)
            }
        }
        await this.deleteEntity<Vertex>(this.sessionVertexRepository, deleteOperationVertices, manager)
        await this.createOrUpdateEntity<Vertex>(
            this.sessionVertexRepository,
            creatOperationVertices,
            updateOperationVertices,
            manager,
            sessionId
        )
    }

    private async updateEdges(updateEdges: IUpdateOrDeleteSessionEdgeRequestDTO[], manager: EntityManager, sessionId: string) {
        const createOperationEdges: IEdge<Edge>[] = []
        const updateOperationEdges: IEdge<Edge>[] = []
        const deleteOperationEdges: number[] = []
        const promises: Promise<void>[] = []
        for (const updateEdge of updateEdges) {
            const updateType = updateEdge.updateType
            if (updateType === 'delete') {
                deleteOperationEdges.push(updateEdge.id)
            } else {
                const edge = updateEdge.edge!
                const whereCondition = updateType === 'update' ? edge.id : undefined
                whereCondition ? updateOperationEdges.push(edge) : createOperationEdges.push(edge)
            }
        }
        promises.push(this.deleteEntity<Edge>(this.sessionVertexRepository, deleteOperationEdges, manager))
        promises.push(this.createOrUpdateEntity<Edge>(
            this.sessionEdgeRepository,
            createOperationEdges,
            updateOperationEdges,
            manager,
            sessionId
        ))
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
                sessionType: session.sessionType.name,
                sessionStruct: session.structType.name
            }
            return response
        } catch(error){
            console.error(error)
            throw error
        }
    }    
    async getSessionTypes(): Promise<IGetSessionTypesResponseDTO[]> {
        try {
            const sessionTypes = await this.sessionTypeRepository.findAll({select: ['name', 'imagePath']})
            const response: Promise<IGetSessionTypesResponseDTO>[] = sessionTypes.map(async sessionType => ({
                sessionTypeName: sessionType.name,
                sessionImage: sessionType.imagePath
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
                {select: ['name', 'imagePath', 'description']}
            )
            const response: Promise<IGetAlgosResponseDTO>[] = alghorithms.map(async alghorithm => ({
                alghorithm: alghorithm.name,
                alghorithmDescription: alghorithm.description,
                alghorithmImage: alghorithm.imagePath
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
                {select: ['name', 'description', 'imagePath']}
            )
            const response: Promise<IGetSessionStructuresResponseDTO>[] = structures.map(async structure => ({
                sessionStructureName: structure.name,
                structDescription: structure.description,
                sessionStructureImage: structure.imagePath
            }))
            return await Promise.all(response)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateSession(sessionUpdate: IUpdateSessionRequestDTO): Promise<boolean> {
        await this.sessionRepository.manager.transaction(async (manager: EntityManager) => {
            const sessionId = sessionUpdate.sessionId
            const session = await this.sessionRepository.findOne({where: {id: sessionId}})
            if(!session) throw new NotFoundError("Session doesnt exist")
            const vertices = sessionUpdate.vertices
            const edges = sessionUpdate.edges
            const promises: Promise<void>[] = []
            if(vertices){
                promises.push(this.updateVertices(vertices, manager, sessionId))
            }
            if(edges){
                promises.push(this.updateEdges(edges, manager, sessionId))
            }
            await Promise.all(promises)
            let imagePath: string | undefined;
            const imageBase64 = sessionUpdate.imageBase64
            let filename: string
            if (imageBase64) {
              const base64Data = imageBase64.replace(/^data:image\/png;base64,/, '');
              filename = `${Date.now()}_${sessionId}.png`;
              const filePath = path.join(__dirname, 'uploads', filename); 
        
              fs.writeFileSync(filePath, base64Data, 'base64');
              imagePath = filePath;
            }
            session.sessionImagePath = imagePath
            await manager.save(session)
        })
        return true
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

export default new SessionService(
    AppDataSource.getRepository(Session), 
    sessionStructRepository, 
    sessionTypeRepository, 
    sessionAlghoRepository, 
    VertexRepository, 
    edgeRepository
)