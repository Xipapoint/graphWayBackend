import { FindManyOptions } from "typeorm";
import { Alghorithm } from '../../../entities/types/Alghorithm';
import { IBaseRepositoryImpl } from "../baseRepositoryImpl";

export interface ISessionAlghoRepositoryImpl extends IBaseRepositoryImpl<Alghorithm>{
    findSessionAlghorithm(alghorithmId: number): Promise<Alghorithm>
    findAll(options?: FindManyOptions<Alghorithm>): Promise<Alghorithm[]>
}