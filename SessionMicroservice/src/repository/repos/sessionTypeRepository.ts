import { FindManyOptions, Repository } from "typeorm";
import { Type } from "../../entities/types/Type";
import NotFoundError from "../../error/4__Error/NotFoundError.error";
import { AppDataSource } from "../../dataSource";
import { ISessionTypeRepositoryImpl } from "../impl/repos/sessionTypeRepositoryImpl";
import { sessionRouter } from '../../router/sessionRouter';
import { BaseRepository } from "../baseRepository";

class SessionTypeRepository extends BaseRepository<Type> implements ISessionTypeRepositoryImpl{
    private sessionTypeRepository: Repository<Type>
    constructor(
        sessionTypeRepository: Repository<Type>, 
    ){
        super(Type)
        this.sessionTypeRepository = sessionTypeRepository

    }

    public async findSessionType(sessionTypeId: number): Promise<Type> {
        const sessionType = await this.sessionTypeRepository.findOne({ where: { id: sessionTypeId } });
        if (!sessionType) throw new NotFoundError("Session type doesnt exist");
        return sessionType;
    }

    public async findAll(options?: FindManyOptions<Type>): Promise<Type[]> {
        const alghorithms = await this.sessionTypeRepository.find(options)
        return alghorithms
    }

    public async setImage(imagePath: string, sessionTypeId: number): Promise<void>{
        try{
            const sessionType = await this.findSessionType(sessionTypeId)
            sessionType.imagePath = imagePath
        } catch(error){
            throw error
        }
    }
}

export default new SessionTypeRepository(AppDataSource.getRepository(Type))