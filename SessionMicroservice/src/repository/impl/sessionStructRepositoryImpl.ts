import { FindManyOptions } from "typeorm";
import { SessionStructures } from "../../entities/SessionStructures";

export interface ISessionStructRepositoryImpl{
    findSessionStructure(sessionStructId: number): Promise<SessionStructures> 
    findAll(options?: FindManyOptions<SessionStructures>): Promise<SessionStructures[]>
}