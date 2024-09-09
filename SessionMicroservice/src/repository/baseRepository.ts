import { DeepPartial, EntityManager, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { BaseEntity } from '../entities/BaseEntity';
import { IBaseRepositoryImpl } from "./impl/baseRepositoryImpl";
import { AppDataSource } from "../dataSource";
import NotFoundError from "../error/4__Error/NotFoundError.error";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Vertex } from "../entities/structures/Vertex";
import { IVertex } from "../dto/request/updateSession/interfaces/vertex";



export class BaseRepository<T extends ObjectLiteral> implements IBaseRepositoryImpl<T>{
    private baseEntityTarget: EntityTarget<T>
    constructor(entity: EntityTarget<T>) {
        this.baseEntityTarget = entity
    }
    async batchDeleteEntities(ids: number[] | string[], manager: EntityManager): Promise<void> {
        await manager.delete(this.baseEntityTarget, ids)
    }
    async batchCreateEntity(createData: object, manager: EntityManager): Promise<void> {
        manager.createQueryBuilder()
        .insert()
        .into(this.baseEntityTarget)
        .values(createData)
        .execute()
    }
    async batchUpdateEntity(updateData: IVertex[], ids: number[], manager: EntityManager): Promise<void> {
        manager.createQueryBuilder()
        .update(this.baseEntityTarget)
        .set(updateData)
        .whereInIds(ids)
        .execute()
    }
}