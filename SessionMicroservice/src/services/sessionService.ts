import { BaseEntity, DeepPartial, FindOptionsWhere, Not, ObjectLiteral, Repository } from "typeorm";
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
import { BaseRepository } from "../repository/baseRepository";
import { IVertexRepositoryImpl } from "../repository/impl/repos/vertexRepositoryImpl";
import VertexRepository from "../repository/repos/vertexRepository";
import { IBaseRepositoryImpl } from "../repository/impl/baseRepositoryImpl";
import { IEdgeRepositoryImpl } from "../repository/impl/repos/edgeRepositoryImpl";
import edgeRepository from "../repository/repos/edgeRepository";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

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

    private async deleteEntity<K extends BaseEntity, T extends BaseRepository<K>>(repository: IBaseRepositoryImpl<T>, ids: number[]): Promise<void> {
        await repository.batchDeleteEntities(ids)
    }

    private async createOrUpdateEntity<K extends BaseEntity, T extends BaseRepository<K>>(
        repository: IBaseRepositoryImpl<T>, 
        data: QueryDeepPartialEntity<T>, 
        where?: FindOptionsWhere<T>
    ): Promise<void> {
        if (where) {
            repository.batchUpdateEntity(data, where)
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
        const creatOperationVertices = []
        const updateOperationVertices = []
        const deleteOperationVertices: number[] = []
        for (const updateVertex of updateVertices) {
            const updateType = updateVertex.updateType
            if (updateType === 'delete') {
                deleteOperationVertices.push(updateVertex.id)
            } else {
                const vertex = updateVertex.vertex!
                const whereCondition = updateType === 'update' ? vertex.vertexId : undefined
                whereCondition ? updateOperationVertices.push(vertex) : creatOperationVertices.push(vertex)
                // await this.createOrUpdateEntity(this.sessionVertexRepository, {
                //     vertexId: vertex.vertexId,
                //     xCord: vertex.xCord,
                //     yCord: vertex.yCord,
                //     isShortest: vertex.isShortest,
                //     pair: vertex.pair,
                //     session: await this.sessionRepository.findOne({ where: { id: sessionId } }) as Session
                // }as DeepPartial<Vertex>, whereCondition as FindOptionsWhere<Vertex> | undefined);
            }
        }
        await this.deleteEntity(this.sessionVertexRepository, deleteOperationVertices)
        await this.createOrUpdateEntity()
    }

    private async updateEdges(updateEdges: IUpdateOrDeleteSessionEdgeRequestDTO[], sessionId: string) {
        const creatOperationVertices = []
        const updateOperationVertices = []
        const deleteOperationVertices: number[] = []
        for (const updateEdge of updateEdges) {
            const updateType = updateEdge.updateType
            if (updateType === 'delete') {
                deleteOperationVertices.push(updateEdge.id)
            } else {
                const edge = updateEdge.edge!
                const whereCondition = updateType === 'update' ? edge.id : undefined
                await this.createOrUpdateEntity(this.sessionEdgeRepository, {
                    edgeId: edge.id,
                    weight: edge.weight,
                    left: edge.left,
                    top: edge.top,
                    angle: edge.angle,
                    startVertex: edge.startVertex,
                    endVertex: edge.endVertex,
                    session: await this.sessionRepository.findOne({ where: { id: sessionId } }) as Session
                }as DeepPartial<Edge>, whereCondition as FindOptionsWhere<Edge> | undefined);
            }
        }
        await this.deleteEntity(this.sessionEdgeRepository, deleteOperationVertices)
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

    async updateSession(sessionUpdate: IUpdateSessionRequestDTO): Promise<Session> {
        const sessionId = sessionUpdate.sessionId
        const session = await this.sessionRepository.findOne({where: {id: sessionId}})
        if(!session) throw new NotFoundError("Session doesnt exist")
        const imageBase64 = sessionUpdate.imageBase64
        const vertices = sessionUpdate.vertices
        const edges = sessionUpdate.edges
        if(vertices){
            await this.updateVertices(vertices, sessionId)
        }
        if(edges){
            await this. updateEdges(edges, sessionId)
        }
        let imagePath: string | undefined;

        if (imageBase64) {
          const base64Data = imageBase64.replace(/^data:image\/png;base64,/, '');
          const filename = `${Date.now()}_${sessionId}.png`;
          const filePath = path.join(__dirname, 'uploads', filename); 
    
          fs.writeFileSync(filePath, base64Data, 'base64');
          imagePath = filePath;
        }
        session.sessionImagePath = imagePath
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

export default new SessionService(
    AppDataSource.getRepository(Session), 
    sessionStructRepository, 
    sessionTypeRepository, 
    sessionAlghoRepository, 
    VertexRepository, 
    edgeRepository
)