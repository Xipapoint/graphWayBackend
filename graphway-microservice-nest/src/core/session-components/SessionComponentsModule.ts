import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InjectionToken } from './application/InjectToken';
import { SessionModeFactory } from './domain/factories/SessionModeFactory';
import { SessionModeController } from './infrastructure/controllers/SessionModeController';
import { SessionAlgorithmRepositoryImpl } from './infrastructure/repositories/SessionAlgorithmRepositoryImpl';
import { SessionDataStructureRepositoryImpl } from './infrastructure/repositories/SessionDataStructureRepository';
import { SessionModeRepositoryImpl } from './infrastructure/repositories/SessionModeRepositoryImpl';
import { SessionStructureRepositoryImpl } from './infrastructure/repositories/SessionStructureRepositoryImpl';
import { DatabaseModule } from './libs/DatabaseModule';

import { SessionAlgorithmService } from './application/services/SessionAlgorithmService';
import { SessionDataStructureService } from './application/services/SessionDataStructureService';
import { SessionModeService } from './application/services/SessionModeService';
import { SessionStructureService } from './application/services/SessionStructureService';
import { SessionDataStructureFactory } from './domain/factories/SessionDataStructureFactory';
import { SessionStructureFactory } from './domain/factories/SessionStructureFactory';
import { SessionAlgorithmFactory } from './domain/factories/SessionAlgorithmFactory';
import { SessionModeMapper } from './application/mappers/SessionModeMapper';
import { SessionAlgorithmMapper } from './application/mappers/SessionAlgorithmMapper';
import { SessionDataStructureMapper } from './application/mappers/SessionDataStructure';
import { SessionStructureMapper } from './application/mappers/SessionStructureMapper';
import { SessionStructureController } from './infrastructure/controllers/SessionStructureController';
import { SessionDataStructureController } from './infrastructure/controllers/SessionDataStructureController';
import { SessionAlgorithmController } from './infrastructure/controllers/SessionAlgorithmController';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.SESSION_MODE_REPOSITORY,
    useClass: SessionModeRepositoryImpl,
  },

  {
    provide: InjectionToken.SESSION_DATA_STRUCTURE_REPOSITORY,
    useClass: SessionDataStructureRepositoryImpl,
  },

  {
    provide: InjectionToken.SESSION_STRUCTURE_REPOSITORY,
    useClass: SessionStructureRepositoryImpl,
  },

  {
    provide: InjectionToken.SESSION_ALGORITHM_REPOSITORY,
    useClass: SessionAlgorithmRepositoryImpl,
  },
];

const mappers = [
  {
    provide: InjectionToken.SESSION_MODE_MAPPER,
    useClass: SessionModeMapper,
  },
  {
    provide: InjectionToken.SESSION_ALGORITHM_MAPPER,
    useClass: SessionAlgorithmMapper,
  },

  {
    provide: InjectionToken.SESSION_DATA_STRUCTURE_MAPPER,
    useClass: SessionDataStructureMapper,
  },
  {
    provide: InjectionToken.SESSION_STRUCTURE_MAPPER,
    useClass: SessionStructureMapper,
  },
];

const application = [
  {
    provide: InjectionToken.SESSION_MODE_SERVICE,
    useClass: SessionModeService,
  },
  {
    provide: InjectionToken.SESSION_ALGORITHM_SERVICE,
    useClass: SessionAlgorithmService,
  },
  {
    provide: InjectionToken.SESSION_STRUCTURE_SERVICE,
    useClass: SessionStructureService,
  },
  {
    provide: InjectionToken.SESSION_DATA_STRUCTURE_SERVICE,
    useClass: SessionDataStructureService,
  },
  ...mappers,
];

const domain = [
  SessionModeFactory,
  SessionDataStructureFactory,
  SessionStructureFactory,
  SessionAlgorithmFactory,
];

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [
    SessionModeController,
    SessionStructureController,
    SessionDataStructureController,
    SessionAlgorithmController,
  ],
  providers: [...infrastructure, ...application, ...domain],
})
export class SessionComponentModule {}
