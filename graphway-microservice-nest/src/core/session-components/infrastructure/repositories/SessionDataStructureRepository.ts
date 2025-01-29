import {
  SessionDataStructure,
  SessionDataStructureProperties,
} from '../../domain/entities/SessionDataStructure';
import { SessionDataStructureRepository } from '../../domain/repositories/SessionDataStructureRepository';
import { writeConnection } from '../../libs/DatabaseModule';
import { SessionDataStructureEntity } from '../entities/SessionDataStructureEntity';
import { SessionDataStructureFactory } from '../../domain/factories/SessionDataStructureFactory';
import { Inject } from '@nestjs/common';

export class SessionDataStructureRepositoryImpl
  implements SessionDataStructureRepository
{
  @Inject()
  private readonly sessionDataStructureFactory: SessionDataStructureFactory;

  async save(
    data: SessionDataStructure | SessionDataStructure[],
  ): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager
      .getRepository(SessionDataStructureEntity)
      .save(entities);
  }

  async findById(id: string): Promise<SessionDataStructure | null> {
    const entity = await writeConnection.manager
      .getRepository(SessionDataStructureEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  async findAll(): Promise<SessionDataStructure[]> {
    const entities = await writeConnection.manager
      .getRepository(SessionDataStructureEntity)
      .find();
    return entities.map((entity) => this.entityToModel(entity));
  }

  async exists(title: string): Promise<boolean> {
    return await writeConnection.manager
      .getRepository(SessionDataStructureEntity)
      .exists({ select: ['title'], where: { title } });
  }

  private modelToEntity(
    model: SessionDataStructure,
  ): SessionDataStructureEntity {
    const properties = JSON.parse(
      JSON.stringify(model),
    ) as SessionDataStructureProperties;
    return {
      ...properties,
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
    };
  }

  private entityToModel(
    entity: SessionDataStructureEntity,
  ): SessionDataStructure {
    return this.sessionDataStructureFactory.reconstitute({
      ...entity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
