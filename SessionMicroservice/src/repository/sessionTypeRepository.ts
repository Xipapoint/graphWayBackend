import { FindManyOptions, Repository } from "typeorm";
import { SessionTypes } from "../entities/SessionTypes";
import NotFoundError from "../error/4__Error/NotFoundError.error";
import { AppDataSource } from "../dataSource";
import { ISessionTypeRepositoryImpl } from "./impl/sessionTypeRepositoryImpl";
import { sessionRouter } from '../router/sessionRouter';

class SessionTypeRepository implements ISessionTypeRepositoryImpl{
    private sessionTypeRepository: Repository<SessionTypes>
    constructor(
        sessionTypeRepository: Repository<SessionTypes>, 
    ){
        this.sessionTypeRepository = sessionTypeRepository

    }

    public async findSessionType(sessionTypeId: number): Promise<SessionTypes> {
        const sessionType = await this.sessionTypeRepository.findOne({ where: { id: sessionTypeId } });
        if (!sessionType) throw new NotFoundError("Session type doesnt exist");
        return sessionType;
    }

    public async findAll(options?: FindManyOptions<SessionTypes>): Promise<SessionTypes[]> {
        const alghorithms = await this.sessionTypeRepository.find(options)
        return alghorithms
    }

    public async setImage(imagePath: string, sessionTypeId: number): Promise<void>{
        try{
            const sessionType = await this.findSessionType(sessionTypeId)
            sessionType.sessionTypeImagePath = imagePath
        } catch(error){
            throw error
        }
    }
}

export default new SessionTypeRepository(AppDataSource.getRepository(SessionTypes))