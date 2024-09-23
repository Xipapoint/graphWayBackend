import { Repository } from "typeorm"
import { AppDataSource } from "../../dataSource"
import { GraphSessions } from "../../entities/session/GraphSession"
import { BaseRepository } from "../baseRepository"
import { IGraphSessionRepositoryImpl } from "../impl/repos/graphSessionRepositoryImpl"
import { ICreateGraphSessionFieldsDTO } from "../../dto/request/createSession/CreateGraphSessionFieldsRequestDTO"
import NotFoundError from "../../error/4__Error/NotFoundError.error"

class GraphSessionRepository extends BaseRepository<GraphSessions> implements IGraphSessionRepositoryImpl{
    graphSessionRepository: Repository<GraphSessions>
    constructor(graphSessionRepository: Repository<GraphSessions>){
        super(GraphSessions)
        this.graphSessionRepository = graphSessionRepository
    }

    create(data: ICreateGraphSessionFieldsDTO): GraphSessions{
        return this.graphSessionRepository.create({userId: data.userId, alghorithm: data.alghorithm})
    }

    async findGraphSession(graphSessionId: string): Promise<GraphSessions>{
        const sessionType = await this.graphSessionRepository.findOne({ where: { id: graphSessionId } });
        if (!sessionType) throw new NotFoundError("Session type doesnt exist");
        return sessionType;
    }
    
}
export default new GraphSessionRepository(AppDataSource.getRepository(GraphSessions))