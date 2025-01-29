import { Inject } from '@nestjs/common';
import {
  SessionStructure,
  SessionStructureProperties,
} from '../../domain/entities/SessionStructure';
import { SessionStructureFactory } from '../../domain/factories/SessionStructureFactory';
import { SessionStructureRepository } from '../../domain/repositories/SessionStructureRepository';
import { writeConnection } from '../../libs/DatabaseModule';
import { SessionStructureEntity } from '../entities/SessionStructureEntity';

export class SessionStructureRepositoryImpl
  implements SessionStructureRepository
{
  @Inject() private readonly sessionStructureFactory: SessionStructureFactory;

  async save(data: SessionStructure | SessionStructure[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager
      .getRepository(SessionStructureEntity)
      .save(entities);
  }

  async findById(id: string): Promise<SessionStructure | null> {
    const entity = await writeConnection.manager
      .getRepository(SessionStructureEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  async findAll(): Promise<SessionStructure[]> {
    const entities = await writeConnection.manager
      .getRepository(SessionStructureEntity)
      .find();
    return entities.map((entity) => this.entityToModel(entity));
  }

  async exists(title: string): Promise<boolean> {
    return await writeConnection.manager
      .getRepository(SessionStructureEntity)
      .exists({ select: ['title'], where: { title } });
  }

  private modelToEntity(model: SessionStructure): SessionStructureEntity {
    const properties = JSON.parse(
      JSON.stringify(model),
    ) as SessionStructureProperties;
    return {
      ...properties,
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
    };
  }

  private entityToModel(entity: SessionStructureEntity): SessionStructure {
    return this.sessionStructureFactory.reconstitute({
      ...entity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
