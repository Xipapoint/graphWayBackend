import { DeepPartial } from "typeorm";
import { BaseEntity } from "../../entities/BaseEntity";

export interface IBaseRepositoryImpl{
    batchDeleteEntities(entities: DeepPartial<BaseEntity>): Promise<void>
}