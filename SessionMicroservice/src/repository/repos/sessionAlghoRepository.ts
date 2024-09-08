import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../dataSource";
import { Alghorithm } from "../../entities/types/Alghorithm";
import NotFoundError from "../../error/4__Error/NotFoundError.error";
import { ISessionAlghoRepositoryImpl } from "../impl/repos/sessionAlghoRepositoryImpl";
import { BaseRepository } from "../baseRepository";

class SessionAlghoRepository extends BaseRepository<Alghorithm> implements ISessionAlghoRepositoryImpl{
    private sessionAlghorithmRepository: Repository<Alghorithm>
    constructor(
        sessionAlghorithmRepository: Repository<Alghorithm>, 
    ){
        super();
        this.sessionAlghorithmRepository = sessionAlghorithmRepository

    }

    public async findSessionAlghorithm(alghorithmId: number): Promise<Alghorithm> {
        const alghorithm = await this.sessionAlghorithmRepository.findOne({ where: { id: alghorithmId } });
        if (!alghorithm) throw new NotFoundError("Session alghorithm doesnt exist");
        return alghorithm;
    }

    public async findAll(options?: FindManyOptions<Alghorithm>): Promise<Alghorithm[]> {
        const alghorithms = await this.sessionAlghorithmRepository.find(options)
        return alghorithms
    }
}

export default new SessionAlghoRepository(AppDataSource.getRepository(Alghorithm))