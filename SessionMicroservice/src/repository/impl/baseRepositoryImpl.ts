import { EntityManager, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BaseEntity } from "../../entities/BaseEntity";
import { IBaseCreateOrUpdateRequestDTO } from '../../dto/request/updateSession/BaseCreateOrUpdateRequestDTO';
import { Session } from "../../entities/Session";

export interface IBaseRepositoryImpl<T extends ObjectLiteral>{
    batchDeleteEntities(ids: number[] | string[], manager: EntityManager): Promise<void>
    batchCreateEntity(createData: object, manager: EntityManager, session: Session): Promise<void>
    batchUpdateEntity(updateData: IBaseCreateOrUpdateRequestDTO<T>, id: number | string, manager: EntityManager): Promise<void>
}