import { FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";

export interface IBaseRepositoryImpl<T extends ObjectLiteral>{
    batchDeleteEntities(ids: number[] | string[]): Promise<void>
    batchUpdateEntity(data: QueryDeepPartialEntity<T>, where: FindOptionsWhere<T>): Promise<void>
}