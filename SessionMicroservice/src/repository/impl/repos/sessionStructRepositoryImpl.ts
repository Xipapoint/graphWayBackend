import { FindManyOptions } from "typeorm";
import { Structure } from "../../../entities/types/Structures";
import { IBaseRepositoryImpl } from "../baseRepositoryImpl";

export interface ISessionStructRepositoryImpl extends IBaseRepositoryImpl<Structure>{
    findSessionStructure(sessionStructId: number): Promise<Structure> 
    findAll(options?: FindManyOptions<Structure>): Promise<Structure[]>
}