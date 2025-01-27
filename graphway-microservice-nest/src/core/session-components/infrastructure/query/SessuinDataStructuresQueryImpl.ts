import { Injectable } from '@nestjs/common';
import { FindSessionDataStructuresResult } from '../../application/query/dto/FindSessionDataStructuresResult';
import { readConnection } from '../../libs/DatabaseModule';
import { SessionDataStructureEntity } from '../entities/SessionDataStructureEntity';

@Injectable()
export class SessionDataStructuresQueryImpl {
  async find(): Promise<FindSessionDataStructuresResult> {
    return readConnection
      .getRepository(SessionDataStructureEntity)
      .find()
      .then(
        (entities) =>
          new FindSessionDataStructuresResult(
            entities.map((entity) => ({
              id: entity.id,
              title: entity.title,
              description: entity.description,
              image: entity.image,
            })),
          ),
      );
  }
}
