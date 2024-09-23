import { FindManyOptions } from "typeorm";
import { Type } from "../../../entities/types/Type";
import { IBaseRepositoryImpl } from "../baseRepositoryImpl";
import { Session } from '../../../entities/Session';

export interface ISessionTypeRepositoryImpl extends IBaseRepositoryImpl<Type>{
    findSessionType(sessionTypeId: number): Promise<Type>
    findAll(options?: FindManyOptions<Type>): Promise<Type[]>
}