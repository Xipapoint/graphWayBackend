import { ObjectLiteral, Repository } from "typeorm";

export interface IBaseRepositoryImpl<T extends ObjectLiteral>{
    batchDeleteEntities(ids: number[] | string[], repository: Repository<T>): Promise<void>
}