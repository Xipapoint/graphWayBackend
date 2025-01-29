import { Inject } from '@nestjs/common';
import { writeConnection } from 'src/core/session-components/libs/DatabaseModule';
import {
  SessionMode,
  SessionModeProperties,
} from '../../domain/entities/SessionMode';
import { SessionModeFactory } from '../../domain/factories/SessionModeFactory';
import { SessionModeRepository } from '../../domain/repositories/SessionModeRepository';
import { SessionModeEntity } from '../entities/SessionModeEntity';

export class SessionModeRepositoryImpl implements SessionModeRepository {
  @Inject() private readonly sessionModeFactory: SessionModeFactory;

  async save(data: SessionMode | SessionMode[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager
      .getRepository(SessionModeEntity)
      .save(entities);
  }

  async findById(id: string): Promise<SessionMode | null> {
    const entity = await writeConnection.manager
      .getRepository(SessionModeEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  async findAll(): Promise<SessionMode[]> {
    const entities = await writeConnection.manager
      .getRepository(SessionModeEntity)
      .find();
    return entities.map((entity) => this.entityToModel(entity));
  }

  async exists(title: string): Promise<boolean> {
    return await writeConnection.manager
      .getRepository(SessionModeEntity)
      .exists({ select: ['title'], where: { title } });
  }

  private modelToEntity(model: SessionMode): SessionModeEntity {
    const properties = JSON.parse(
      JSON.stringify(model),
    ) as SessionModeProperties;
    return {
      ...properties,
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
    };
  }

  private entityToModel(entity: SessionModeEntity): SessionMode {
    return this.sessionModeFactory.reconstitute({
      ...entity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
