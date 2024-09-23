import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../dataSource";
import { SessionStructures } from "../../entities/types/Structures";
import NotFoundError from "../../error/4__Error/NotFoundError.error";
import { ISessionStructRepositoryImpl } from "../impl/repos/sessionStructRepositoryImpl";
import { BaseRepository } from "../baseRepository";

class SessionStructService extends BaseRepository<SessionStructures> implements ISessionStructRepositoryImpl{
    private sessionStructRepository: Repository<SessionStructures>
    constructor(
        sessionStructRepository: Repository<SessionStructures> 
    ){
        super(SessionStructures)
        this.sessionStructRepository = sessionStructRepository

    }

    public async findSessionStructure(sessionStructId: number): Promise<SessionStructures> {
        const sessionStructure = await this.sessionStructRepository.findOne({ where: { id: sessionStructId } });
        if (!sessionStructure) throw new NotFoundError("Session structure doesnt exist");
        return sessionStructure;
    }

    public async findAll(options?: FindManyOptions<SessionStructures>): Promise<SessionStructures[]> {
        const alghorithms = await this.sessionStructRepository.find(options)
        return alghorithms
    }
}

export default new SessionStructService(AppDataSource.getRepository(SessionStructures))