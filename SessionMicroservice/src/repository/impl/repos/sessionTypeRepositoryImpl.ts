import { FindManyOptions } from "typeorm";
import { SessionTypes } from "../../../entities/types/SessionTypes";
import { IBaseRepositoryImpl } from "../baseRepositoryImpl";
import { Session } from '../../../entities/Session';

export interface ISessionTypeRepositoryImpl extends IBaseRepositoryImpl<SessionTypes>{
    findSessionType(sessionTypeId: number): Promise<SessionTypes>
    findAll(options?: FindManyOptions<SessionTypes>): Promise<SessionTypes[]>
}