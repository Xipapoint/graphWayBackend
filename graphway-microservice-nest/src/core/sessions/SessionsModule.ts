import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InjectionToken } from './application/InjectToken';
import { CreateSessionModeHandler } from './application/command/handlers/CreateSessionModeHandler';
import { SessionModeFactory } from './domain/factories/SessionModeFactory';
import { SessionModeController } from './infrastructure/controllers/SessionModeController';
import { SessionModeRepositoryImpl } from './infrastructure/repositories/SessionModeRepositoryImpl';
import { DatabaseModule } from './libs/DatabaseModule';
import { FindSessionModesHandler } from './application/query/handlers/FindSessionModesQueryHandler';
import { SessionModesQueryImpl } from './infrastructure/query/SessionModesQueryImpl';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.SESSION_MODE_REPOSITORY,
    useClass: SessionModeRepositoryImpl,
  },
  {
    provide: InjectionToken.SESSION_MODE_QUERY,
    useClass: SessionModesQueryImpl,
  },
];

const application = [CreateSessionModeHandler, FindSessionModesHandler];

const domain = [SessionModeFactory];

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [SessionModeController],
  providers: [...infrastructure, ...application, ...domain],
})
export class SessionModule {}
