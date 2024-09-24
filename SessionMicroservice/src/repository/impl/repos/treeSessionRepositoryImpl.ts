import { ICreateTreeSessionFieldsDTO } from "../../../dto/request/createSession/CreateTreeSessionFieldsResponseDTO";
import { TreeSessions } from "../../../entities/session/TreeSession";
import { IBaseRepositoryImpl } from "../baseRepositoryImpl";

export interface ITreeSessionRepositoryImpl extends IBaseRepositoryImpl<TreeSessions>{
    create(data: ICreateTreeSessionFieldsDTO): TreeSessions
    findTreeSession(treeSessionId: string): Promise<TreeSessions>
}