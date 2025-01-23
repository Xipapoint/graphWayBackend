import { EntityManager, ObjectLiteral } from 'typeorm';
import { Session } from '../entities/Session';
import { ISessionServiceImpl } from "./impl/sessionServiceImpl";
import { ICreateSessionRequestDTO } from "../dto/request/createSession/CreateGraphSessionRequestDTO";
import { CheckUserExistsRequestMessage } from "../rabbitMQ/types/request/requestTypes";
import producer from "../rabbitMQ/producer";
import { CheckUserExistsResponse } from "../rabbitMQ/types/response/responseTypes";
import { ICreateGraphSessionResponseDTO } from "../dto/response/session/CreateGraphSessionResponseDTO";
import NotFoundError from "../error/4__Error/NotFoundError.error";
import { IGetSessionStructuresResponseDTO } from "../dto/response/session/GetSessionStructuresResponseDTO";
import { IGetAlgosResponseDTO } from "../dto/response/session/GetAlgosResponseDTO";
import { IGetSessionTypesResponseDTO } from "../dto/response/session/GetSessionTypesResponseDTO";
import { Vertex } from "../entities/structures/base/Vertex";
import { ISessionStructRepositoryImpl } from "../repository/impl/repos/sessionStructRepositoryImpl";
import { ISessionTypeRepositoryImpl } from "../repository/impl/repos/sessionTypeRepositoryImpl";
import { ISessionAlghoRepositoryImpl } from '../repository/impl/repos/sessionAlghoRepositoryImpl';
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
import { IGraphSessionRepositoryImpl } from '../repository/impl/repos/graphSessionRepositoryImpl';
import { ITreeSessionRepositoryImpl } from '../repository/impl/repos/treeSessionRepositoryImpl';
import { ICreateTreeSessionResponseDTO } from '../dto/response/session/CreateTreeSessionRepository.interface';
import sessionGraphRepository from '../repository/repos/sessionGraphRepository';
import sessionTreeRepository from '../repository/repos/sessionTreeRepository';
import { GraphSessions } from '../entities/session/GraphSession';
import { TreeSessions } from '../entities/session/TreeSession';
import { decodeUpdateCoordsGraphSessionRequestDTO, decodeUpdateCoordsTreeSessionRequestDTO, decodeUpdateGraphSessionRequestDTO, decodeUpdateTreeSessionRequestDTO, decodeUpdateWeightedCoordsGraphSessionRequestDTO, decodeUpdateWeightedCoordsTreeSessionRequestDTO, decodeUpdateWeightedGraphSessionRequestDTO, decodeUpdateWeightedTreeSessionRequestDTO, EdgeBase, UPDATE_TYPE, UpdateCoordsGraphSessionRequestDTO, UpdateCoordsTreeSessionRequestDTO, UpdateGraphSessionRequestDTO, UpdateOrDeleteSessionVertexBaseRequestDTO, UpdateOrDeleteSessionVertexPairRequestDTO, UpdateSessionEdgeRequestDTO, UpdateSessionWeightedEdgeRequestDTO, UpdateTreeSessionRequestDTO, UpdateWeightedCoordsGraphSessionRequestDTO, UpdateWeightedGraphSessionRequestDTO, VertexBase, VertexPair, UpdateWeightedTreeSessionRequestDTO, UpdateWeightedCoordsTreeSessionRequestDTO, UpdateSessionEdgeCoordsRequestDTO, WeightedEdgeWithCoords, EdgeWithCoords } from '../config/proto/session_pb';
import { ConflictError } from '../error/4__Error/ConflictError.error';
import { IVertexBase } from '../dto/request/updateSession/interfaces/structures/base/VertexBase.interface';
import { IVertexPair } from '../dto/request/updateSession/interfaces/structures/VertexPair.interface';
import { WeightedEdge } from '../entities/structures/WeightedEdge';

class SessionService implements ISessionServiceImpl{
    private sessionGraphRepository: IGraphSessionRepositoryImpl
    private sessionTreeRepository: ITreeSessionRepositoryImpl
    private sessionStructRepository: ISessionStructRepositoryImpl
    private sessionTypeRepository: ISessionTypeRepositoryImpl
    private sessionAlghorithmRepository: ISessionAlghoRepositoryImpl
    private sessionVertexRepository: IVertexRepositoryImpl
    private sessionEdgeRepository:  IEdgeRepositoryImpl;
    constructor(
        sessionGraphRepository: IGraphSessionRepositoryImpl, 
        sessionStructRepository: ISessionStructRepositoryImpl,
        sessionTypeRepository: ISessionTypeRepositoryImpl, 
        sessionAlghorithmRepository: ISessionAlghoRepositoryImpl,
        sessionVertexRepository: IVertexRepositoryImpl,
        sessionEdgeRepository: IEdgeRepositoryImpl,
        sessionTreeRepository: ITreeSessionRepositoryImpl
    ){
        this.sessionGraphRepository = sessionGraphRepository
        this.sessionStructRepository = sessionStructRepository
        this.sessionTypeRepository = sessionTypeRepository
        this.sessionAlghorithmRepository = sessionAlghorithmRepository
        this.sessionVertexRepository = sessionVertexRepository
        this.sessionEdgeRepository = sessionEdgeRepository
        this.sessionTreeRepository = sessionTreeRepository
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
        const session = await this.sessionRepository({where: {id: sessionId}})
        createData.length !== 0 ? repository.batchCreateEntity(createData, manager, session!) : null
        updateData.length !== 0
            ? updateData.forEach(data => {
                repository.batchUpdateEntity(data, data.id, manager)     
            })
            : null
    }
    

    private async updateVertices(updateVertices: UpdateOrDeleteSessionVertexPairRequestDTO[], manager: EntityManager, sessionId: string, dataType: DATA_TYPE) {
        const creatOperationVertices: VertexPair[] = []
        const updateOperationVertices: VertexPair[] = []
        const deleteOperationVertices: number[] = []
        const promises: Promise<void>[] = []
        for (const updateVertex of updateVertices) {
            const updateType = updateVertex.updateType!
            if (updateType === UPDATE_TYPE.DELETE) {
                deleteOperationVertices.push(updateVertex.id!)
            } else {
                const vertex = updateVertex.vertex!
                updateType === UPDATE_TYPE.MODIFY ? updateOperationVertices.push(vertex) : creatOperationVertices.push(vertex)
            }
        }
        promises.push(this.deleteEntity<Vertex>(this.sessionVertexRepository, deleteOperationVertices, manager))
        promises.push(this.createOrUpdateEntity<Vertex>(
            this.sessionVertexRepository,
            creatOperationVertices,
            updateOperationVertices,
            manager,
            sessionId
        ))
        await Promise.all(promises)
    }

    private async updateEdges(
        updateEdges: (
            | UpdateSessionEdgeRequestDTO[]
            | UpdateSessionWeightedEdgeRequestDTO[]
            | UpdateSessionEdgeCoordsRequestDTO[]
            | UpdateSessionEdgeCoordsRequestDTO[]
        ),
        manager: EntityManager,
        sessionId: string
    ): Promise<void> {
        const createOperationEdges: EdgeBase[] | WeightedEdge[] | WeightedEdgeWithCoords[] | EdgeWithCoords[] = []
        const updateOperationEdges: EdgeBase[] | WeightedEdge[] | WeightedEdgeWithCoords[] | EdgeWithCoords[] = []
        const deleteOperationEdges: number[] = []
        const promises: Promise<void>[] = []
        const operationHandlers: Record<string, (edge: any, id?: number) => void> = {
            delete: (_, id) => deleteOperationEdges.push(id!),
            update: (edge) => edge && updateOperationEdges.push(edge),
            create: (edge) => edge && createOperationEdges.push(edge),
        };
        for (const updateEdge of updateEdges) {
            const { updateType, edge, id } = updateEdge;
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
        await Promise.all(promises)
    }

    private decodeUpdateSessionData(
        serializedData: Uint8Array, 
        sessionType: SESSIONTYPE, 
        weightType: WEIGHTTYPE, 
        dataType: DATATYPE
    ) {
        const decoders = {
            Graph: {
                Weighted: {
                    visualized: decodeUpdateWeightedCoordsGraphSessionRequestDTO(serializedData),
                    text: decodeUpdateWeightedGraphSessionRequestDTO(serializedData),
                },
                NoWheighted: {
                    visualized: decodeUpdateCoordsGraphSessionRequestDTO(serializedData),
                    text: decodeUpdateGraphSessionRequestDTO(serializedData),
                },
            },
            Tree: {
                Weighted: {
                    visualized: decodeUpdateWeightedCoordsTreeSessionRequestDTO(serializedData),
                    text: decodeUpdateWeightedTreeSessionRequestDTO(serializedData),
                },
                NoWheighted: {
                    visualized: decodeUpdateCoordsTreeSessionRequestDTO(serializedData),
                    text: decodeUpdateTreeSessionRequestDTO(serializedData),
                },
            },
        };
        if (!decoders[sessionType]) {
            throw new Error(`Unsupported session type: ${sessionType}`);
        }
        if (!decoders[sessionType][weightType]) {
            throw new Error(`Unsupported weight type: ${weightType}`);
        }
        if (!decoders[sessionType][weightType][dataType]) {
            throw new Error(`Unsupported data type: ${dataType}`);
        }
    
        const decoder = decoders[sessionType][weightType][dataType];   
        return decoder         
    }

    //PUBLIC
    async createSession(createSessionData: ICreateSessionRequestDTO): Promise<ICreateGraphSessionResponseDTO | ICreateTreeSessionResponseDTO> {
        try {
            const {sessionTypeId, sessionStructId, alghorithmId, userId} = createSessionData
            const existingSessionType = await this.sessionTypeRepository.findSessionType(sessionTypeId);
            const existingSessionStructure = await this.sessionStructRepository.findSessionStructure(sessionStructId);
            const existingAlghorithm = await this.sessionAlghorithmRepository.findSessionAlghorithm(alghorithmId);
            await this.verifyUserExists(userId);
            let session;
            if(existingSessionType.name === 'Graph') {
                session = this.sessionGraphRepository.create({
                    userId,
                    alghorithm: existingAlghorithm
                })
            } else {
                session = this.sessionTreeRepository.create({
                    userId,
                    structure: existingSessionStructure
                })
            }
            let response: ICreateGraphSessionResponseDTO | ICreateTreeSessionResponseDTO
            existingSessionType.name === 'Graph' ? 
            response = {
                id: session.id,
                name: session.sessionName,
                imagePath: session.sessionImagePath,
                alghorithm: existingAlghorithm.name,
                type: existingSessionType.name
            } :
            response = {
                id: session.id,
                name: session.sessionName,
                type: existingSessionType.name,
                structure: existingSessionStructure.name,
                imagePath: session.sessionImagePath,
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

    async updateSession(serializedSessionData: Uint8Array, sessionType: SESSIONTYPE, weightType: WEIGHTTYPE, dataType: DATATYPE): Promise<boolean> {
        const sessionData = this.decodeUpdateSessionData(serializedSessionData, sessionType, weightType, dataType)
        const {sessionId, vertices, edges, imageBase64 } = sessionData
        if(!sessionId) throw new ConflictError("Session id must be provided")
        const graphPromise = this.sessionGraphRepository.findGraphSession(sessionId).then(result => ({ type: 'Graph', result }))
        const treePromise = this.sessionTreeRepository.findTreeSession(sessionId).then(result => ({ type: 'Tree', result }))
        const firstResolved = await Promise.race([graphPromise, treePromise])
        const sessionRepository = firstResolved.type === 'Graph' ? this.sessionGraphRepository : this.sessionTreeRepository
        const session = firstResolved.result


        await sessionRepository.getRepository().manager.transaction(async (manager: EntityManager) => {
            const verticesRepo = this.sessionVertexRepository
            const promises: Promise<void>[] = []
            if(vertices){
                promises.push(this.updateVertices(vertices, manager, sessionId, dataType!))
            }
            if(edges){
                promises.push(this.updateEdges(edges, manager, sessionId))
            }
            await Promise.all(promises)
            let imagePath: string | undefined
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
    sessionGraphRepository,
    sessionStructRepository, 
    sessionTypeRepository, 
    sessionAlghoRepository, 
    VertexRepository, 
    edgeRepository,
    sessionTreeRepository
)