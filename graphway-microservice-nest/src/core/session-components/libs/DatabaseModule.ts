import { Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { SessionConfig } from '../Config';
import { SessionModeEntity } from '../infrastructure/entities/SessionModeEntity';
import { SessionStructureEntity } from '../infrastructure/entities/SessionStructureEntity';
import { SessionDataStructureEntity } from '../infrastructure/entities/SessionDataStructureEntity';
import { SessionAlgorithmEntity } from '../infrastructure/entities/SessionAlgorithmEntity';

interface WriteConnection {
  readonly startTransaction: (
    level?:
      | 'READ UNCOMMITTED'
      | 'READ COMMITTED'
      | 'REPEATABLE READ'
      | 'SERIALIZABLE',
  ) => Promise<void>;
  readonly commitTransaction: () => Promise<void>;
  readonly rollbackTransaction: () => Promise<void>;
  readonly isTransactionActive: boolean;
  readonly manager: EntityManager;
}

interface ReadConnection {
  readonly getRepository: <T extends ObjectLiteral>(
    target: EntityTarget<T>,
  ) => Repository<T>;
  readonly query: (query: string) => Promise<void>;
  readonly createQueryBuilder: <Entity extends ObjectLiteral>(
    entityClass: EntityTarget<Entity>,
    alias: string,
    queryRunner?: QueryRunner,
  ) => SelectQueryBuilder<Entity>;
}

export let writeConnection = {} as WriteConnection;
export let readConnection = {} as ReadConnection;

class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly dataSource = new DataSource({
    type: 'postgres',
    entities: [
      SessionModeEntity,
      SessionStructureEntity,
      SessionDataStructureEntity,
      SessionAlgorithmEntity,
    ],
    logging: SessionConfig.DATABASE_LOGGING,
    host: SessionConfig.DATABASE_HOST,
    port: SessionConfig.DATABASE_PORT,
    database: SessionConfig.DATABASE_NAME,
    username: SessionConfig.DATABASE_USER,
    password: SessionConfig.DATABASE_PASSWORD,
    synchronize: SessionConfig.DATABASE_SYNC,
  });

  async onModuleInit(): Promise<void> {
    await this.dataSource.initialize();
    if (!this.dataSource.isInitialized)
      throw new Error('DataSource is not initialized');
    writeConnection = this.dataSource.createQueryRunner();
    readConnection = this.dataSource.manager;
  }

  async onModuleDestroy(): Promise<void> {
    await this.dataSource.destroy();
  }
}

@Global()
@Module({
  providers: [DatabaseService],
  exports: [],
})
export class DatabaseModule {}
