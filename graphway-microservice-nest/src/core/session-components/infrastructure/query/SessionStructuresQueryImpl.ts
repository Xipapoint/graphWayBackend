import { Injectable } from '@nestjs/common';
import { FindSessionStructuresResult } from '../../application/query/dto/FindsSessionStructuresResult';
import { readConnection } from '../../libs/DatabaseModule';
import { SessionStructureEntity } from '../entities/SessionStructureEntity';

@Injectable()
export class SessionStructuresQueryImpl {
  async find(): Promise<FindSessionStructuresResult> {
    return readConnection
      .getRepository(SessionStructureEntity)
      .find()
      .then(
        (entities) =>
          new FindSessionStructuresResult(
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
