import { Inject } from '@nestjs/common';

import { GraphSessionFactory } from '../../domain/factories/GraphSessionFactory';
import { GraphSessionRepository } from '../../domain/repositories/GraphSessionRepository';
import { writeConnection } from '../../libs/DatabaseModule';
import { GraphSessionEntity } from '../entities/GraphSessionEntity';
import {
  GraphSession,
  GraphSessionProperties,
} from '../../domain/entities/GraphSession';

export class GraphSessionRepositoryImpl implements GraphSessionRepository {
  @Inject() private readonly graphSessionFactory: GraphSessionFactory;

  async save(data: GraphSession | GraphSession[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager
      .getRepository(GraphSessionEntity)
      .save(entities);
  }

  async findById(id: string): Promise<GraphSession | null> {
    const entity = await writeConnection.manager
      .getRepository(GraphSessionEntity)
      .findOneBy({ id });
    return entity ? this.entityToModel(entity) : null;
  }

  async findAll(): Promise<GraphSession[]> {
    const entities = await writeConnection.manager
      .getRepository(GraphSessionEntity)
      .find();
    return entities.map((entity) => this.entityToModel(entity));
  }

  async exists(title: string): Promise<boolean> {
    return await writeConnection.manager
      .getRepository(GraphSessionEntity)
      .exists({ select: ['title'], where: { title } });
  }

  private modelToEntity(model: GraphSession): GraphSessionEntity {
    const properties = JSON.parse(
      JSON.stringify(model),
    ) as GraphSessionProperties;
    return {
      ...properties,
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
    };
  }

  private entityToModel(entity: GraphSessionEntity): GraphSession {
    return this.graphSessionFactory.reconstitute({
      ...entity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
