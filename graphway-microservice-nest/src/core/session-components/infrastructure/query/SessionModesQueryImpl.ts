import { Injectable } from '@nestjs/common';
import { readConnection } from '../../libs/DatabaseModule';
import { SessionModeEntity } from '../entities/SessionModeEntity';
import { FindSessionModesResult } from '../../application/query/dto/FindSessionModesResult';

@Injectable()
export class SessionModesQueryImpl {
  async find(): Promise<FindSessionModesResult> {
    return readConnection
      .getRepository(SessionModeEntity)
      .find()
      .then(
        (entities) =>
          new FindSessionModesResult(
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
