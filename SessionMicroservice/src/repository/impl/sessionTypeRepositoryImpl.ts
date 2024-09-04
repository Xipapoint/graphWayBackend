import { FindManyOptions } from "typeorm";
import { SessionTypes } from "../../entities/SessionTypes";

export interface ISessionTypeRepositoryImpl{
    findSessionType(sessionTypeId: number): Promise<SessionTypes>
    findAll(options?: FindManyOptions<SessionTypes>): Promise<SessionTypes[]>
}