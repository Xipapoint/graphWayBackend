import { FindManyOptions } from "typeorm";
import { SessionStructures } from "../../../entities/types/Structures";
import { IBaseRepositoryImpl } from "../baseRepositoryImpl";

export interface ISessionStructRepositoryImpl extends IBaseRepositoryImpl<SessionStructures>{
    findSessionStructure(sessionStructId: number): Promise<SessionStructures> 
    findAll(options?: FindManyOptions<SessionStructures>): Promise<SessionStructures[]>
}