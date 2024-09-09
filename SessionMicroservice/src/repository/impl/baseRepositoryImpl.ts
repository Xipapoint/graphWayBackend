import { EntityManager, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BaseEntity } from "../../entities/BaseEntity";

export interface IBaseRepositoryImpl<T extends ObjectLiteral>{
    batchDeleteEntities(ids: number[] | string[], manager: EntityManager): Promise<void>
    batchCreateEntity(createData: object, manager: EntityManager): Promise<void>
    batchUpdateEntity(updateData: object, ids: number[], manager: EntityManager): Promise<void>
}