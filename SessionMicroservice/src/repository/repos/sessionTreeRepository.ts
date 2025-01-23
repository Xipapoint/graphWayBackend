import { Repository } from "typeorm"
import { AppDataSource } from "../../dataSource"
import { TreeSessions } from "../../entities/session/TreeSession"
import { BaseRepository } from "../baseRepository"
import { ITreeSessionRepositoryImpl } from "../impl/repos/treeSessionRepositoryImpl"
import NotFoundError from "../../error/4__Error/NotFoundError.error"
import { ICreateTreeSessionFieldsDTO } from "../../dto/request/createSession/CreateTreeSessionFieldsResponseDTO"

class TreeSessionRepository extends BaseRepository<TreeSessions> implements ITreeSessionRepositoryImpl{
    treeSessionRepository: Repository<TreeSessions>
    constructor(treeSessionRepository: Repository<TreeSessions>){
        super(TreeSessions)
        this.treeSessionRepository = treeSessionRepository
    }

    create(data: ICreateTreeSessionFieldsDTO): TreeSessions{
        return this.treeSessionRepository.create({userId: data.userId, structType: data.structure})
    }

    async findTreeSession(treeSessionId: string): Promise<TreeSessions>{
        const sessionType = await this.treeSessionRepository.findOne({ where: { id: treeSessionId } });
        if (!sessionType) throw new NotFoundError("Session type doesnt exist");
        return sessionType;
    }

    getRepository(){
        return this.treeSessionRepository
    }
}
export default new TreeSessionRepository(AppDataSource.getRepository(TreeSessions))