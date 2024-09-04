import { DeepPartial, Not, Repository } from "typeorm";
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

class SessionService implements ISessionServiceImpl{
    private sessionRepository: Repository<Session>
    private sessionStructRepository: Repository<SessionStructures>
    private sessionTypeRepository: Repository<SessionTypes>
    private sessionAlghorithmRepository: Repository<Alghorithm>
    private sessionVertexRepository: Repository<Vertex>
    private sessionEdgeRepository: Repository<Edge>;
    constructor(
        sessionRepository: Repository<Session>, 
        sessionStructRepository: Repository<SessionStructures>, 
        sessionTypeRepository: Repository<SessionTypes>, 
        sessionAlghorithmRepository: Repository<Alghorithm>,
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

    private async deleteVertex(id: number): Promise<void>{
        await this.sessionVertexRepository.delete(id)
    }

    private async deleteEdge(id: number): Promise<void>{
        await this.sessionEdgeRepository.delete(id)
    }

    private async createorUpdateVertex(vertex: IVertex, updateType: UPDATE_TYPE, sessionId: string){
        const {vertexId, isShortest, xCord, yCord, pair}: IVertex = vertex
        switch (updateType) {
            case 'create':
                const createdVertex = this.sessionVertexRepository.create({
                        vertexId: vertexId,
                        xCord: xCord,
                        yCord: yCord,
                        isShortest: isShortest,
                        pair: pair,
                        session: await this.sessionRepository.find({where: {id: sessionId}})
                        
                    } as DeepPartial<Vertex>)
                    await this.sessionVertexRepository.save(createdVertex)
                break;

            case 'update':
                const foundVertex = await this.sessionVertexRepository.findOne({where: {vertexId: vertexId}})
                if(!foundVertex) throw new NotFoundError(`Couldnt find vertex with id: ${vertexId}`)
                foundVertex.isShortest = isShortest
                foundVertex.pair = pair
                foundVertex.xCord = xCord
                foundVertex.yCord = yCord
                await this.sessionVertexRepository.save(foundVertex)
            default:
                break;
        }
    }

    private async createorUpdateEdge(edge: IEdge, updateType: UPDATE_TYPE, sessionId: string){
        const {id, isShortest, startVertex, endVertex, weight, top, left, angle}: IEdge = edge
        switch (updateType) {
            case 'create':
                const createdEdge = this.sessionEdgeRepository.create({
                        edgeId: id,
                        weight: weight,
                        left: left,
                        top: top,
                        angle: angle,
                        startVertex: startVertex,
                        endVertex: endVertex,
                        session: await this.sessionRepository.find({where: {id: sessionId}})
                        
                    } as DeepPartial<Edge>)
                    await this.sessionEdgeRepository.save(createdEdge)
                break;

            case 'update':
                const foundEdge = await this.sessionEdgeRepository.findOne({where: {edgeId: id}})
                if(!foundEdge) throw new NotFoundError(`Couldnt find vertex with id: ${id}`)
                foundEdge.isShortest = isShortest
                foundEdge.weight = weight
                foundEdge.top = top
                foundEdge.left = left
                foundEdge.angle = angle
                foundEdge.startVertex = startVertex
                foundEdge.endVertex = endVertex
                await this.sessionEdgeRepository.save(foundEdge)
        
            default:
                break;
        }
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

    async updateSession(sessionUpdate: IUpdateSessionRequestDTO): Promise<Session> {
        const session = await this.sessionRepository.findOne({where: {id: sessionUpdate.sessionId}})
        if(!session) throw new NotFoundError("Session doesnt exist")
        const updateVertices = sessionUpdate.vertices
        const updateEdges = sessionUpdate.edges
        if(updateVertices){
            updateVertices.forEach(updateVertex => {
                const updateType = updateVertex.updateType
                if(updateType === 'delete') this.deleteVertex(updateVertex.id)
                else{
                    this.createorUpdateVertex(updateVertex.vertex!, updateType, sessionUpdate.sessionId)
                }
            })
        }
        if(updateEdges){
            updateEdges.forEach(updateEdge => {
                const updateType = updateEdge.updateType;
                if(updateType === 'delete') this.deleteEdge(updateEdge.id)
                else{
                    this.createorUpdateEdge(updateEdge.edge!, updateEdge.updateType, sessionUpdate.sessionId)
                }
            })
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