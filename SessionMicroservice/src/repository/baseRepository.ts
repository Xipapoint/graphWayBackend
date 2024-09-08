import { DeepPartial, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { BaseEntity } from '../entities/BaseEntity';
import { IBaseRepositoryImpl } from "./impl/baseRepositoryImpl";
import { AppDataSource } from "../dataSource";
import NotFoundError from "../error/4__Error/NotFoundError.error";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";



export class BaseRepository<T extends ObjectLiteral> implements IBaseRepositoryImpl<T>{
    private repository: Repository<T>
    private baseEntityTarget: EntityTarget<T>
    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(entity)
        this.baseEntityTarget = entity
    }
    async batchDeleteEntities(ids: number[] | string[]): Promise<void> {
        await this.repository.delete(ids)
    }
    // async batchUpdateEntity(data: QueryDeepPartialEntity<T>, where: FindOptionsWhere<T>): Promise<void> {
    //     const entities = await this.repository.find({ where });
    //     if (!entities || entities.length === 0) throw new NotFoundError(`Entity with the specified condition not found: ${JSON.stringify(where)}`);
    //     this.repository.createQueryBuilder()
    //     .insert()
    //     .into(this.baseEntityTarget)
    //     .values(data)
    //     .execute()
    //     for await (const entity of entities) {
    //         this.repository.save(entity)
    //     }
    // }
}