import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../dataSource";
import { Structure } from "../../entities/types/Structures";
import NotFoundError from "../../error/4__Error/NotFoundError.error";
import { ISessionStructRepositoryImpl } from "../impl/repos/sessionStructRepositoryImpl";
import { BaseRepository } from "../baseRepository";

class SessionStructService extends BaseRepository<Structure> implements ISessionStructRepositoryImpl{
    private sessionStructRepository: Repository<Structure>
    constructor(
        sessionStructRepository: Repository<Structure> 
    ){
        super(Structure)
        this.sessionStructRepository = sessionStructRepository

    }

    public async findSessionStructure(sessionStructId: number): Promise<Structure> {
        const sessionStructure = await this.sessionStructRepository.findOne({ where: { id: sessionStructId } });
        if (!sessionStructure) throw new NotFoundError("Session structure doesnt exist");
        return sessionStructure;
    }

    public async findAll(options?: FindManyOptions<Structure>): Promise<Structure[]> {
        const alghorithms = await this.sessionStructRepository.find(options)
        return alghorithms
    }
}

export default new SessionStructService(AppDataSource.getRepository(Structure))