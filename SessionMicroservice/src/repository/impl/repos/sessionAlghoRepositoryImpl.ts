import { FindManyOptions } from "typeorm";
import { Alghorithm } from "../../../entities/types/Alghorithm";

export interface ISessionAlghoRepositoryImpl{
    findSessionAlghorithm(alghorithmId: number): Promise<Alghorithm>
    findAll(options?: FindManyOptions<Alghorithm>): Promise<Alghorithm[]>
}