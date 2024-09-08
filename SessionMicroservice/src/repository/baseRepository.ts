import { DeepPartial, ObjectLiteral, Repository } from "typeorm";
import { BaseEntity } from '../entities/BaseEntity';
import { IBaseRepositoryImpl } from "./impl/baseRepositoryImpl";



export class BaseRepository<T extends ObjectLiteral> implements IBaseRepositoryImpl<T>{
    async batchDeleteEntities(ids: number[] | string[], repository: Repository<T>): Promise<void> {
        await repository.delete(ids)
    }

} 