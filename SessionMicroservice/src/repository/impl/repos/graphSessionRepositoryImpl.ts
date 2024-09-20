import { ICreateGraphSessionFieldsDTO } from "../../../dto/request/createSession/CreateGraphSessionFieldsRequestDTO";
import { GraphSessions } from "../../../entities/session/GraphSession";
import { IBaseRepositoryImpl } from "../baseRepositoryImpl";

export interface IGraphSessionRepositoryImpl extends IBaseRepositoryImpl<GraphSessions>{
    create(data: ICreateGraphSessionFieldsDTO): GraphSessions
    findGraphSession(graphSessionId: string): Promise<GraphSessions>
}