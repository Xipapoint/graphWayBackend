import { Inject } from '@nestjs/common';
import {
  SessionAlgorithm,
  SessionAlgorithmProperties,
} from '../../domain/entities/SessionAlgorithm';
import { SessionAlgorithmFactory } from '../../domain/factories/SessionAlgorithmFactory';
import { SessionAlgorithmRepository } from '../../domain/repositories/SessionAlgorithmRepository';
import { writeConnection } from '../../libs/DatabaseModule';
import { SessionAlgorithmEntity } from '../entities/SessionAlgorithmEntity';

export class SessionAlgorithmRepositoryImpl
  implements SessionAlgorithmRepository
{
  @Inject() private readonly sessionAlgorithmFactory: SessionAlgorithmFactory;

  async save(data: SessionAlgorithm | SessionAlgorithm[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager
      .getRepository(SessionAlgorithmEntity)
      .save(entities);
  }

  async findById(id: string): Promise<SessionAlgorithm | null> {
    const entity = await writeConnection.manager
      .getRepository(SessionAlgorithmEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  async findAll(): Promise<SessionAlgorithm[]> {
    const entities = await writeConnection.manager
      .getRepository(SessionAlgorithmEntity)
      .find();
    return entities.map((entity) => this.entityToModel(entity));
  }

  async exists(title: string): Promise<boolean> {
    return await writeConnection.manager
      .getRepository(SessionAlgorithmEntity)
      .exists({ select: ['title'], where: { title } });
  }

  async findAlgorithmsByStructureId(
    structureId: string,
  ): Promise<SessionAlgorithm[]> {
    const algorithmEntities = await writeConnection.manager
      .getRepository(SessionAlgorithmEntity)
      .find({
        where: { sessionStructureIds: structureId },
      });

    return algorithmEntities.map((entity) => this.entityToModel(entity));
  }

  private modelToEntity(model: SessionAlgorithm): SessionAlgorithmEntity {
    const properties = JSON.parse(
      JSON.stringify(model),
    ) as SessionAlgorithmProperties;
    return {
      ...properties,
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
    };
  }

  private entityToModel(entity: SessionAlgorithmEntity): SessionAlgorithm {
    return this.sessionAlgorithmFactory.reconstitute({
      ...entity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
