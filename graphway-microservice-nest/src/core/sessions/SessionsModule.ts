import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from './libs/DatabaseModule';
import { InjectionToken } from './application/InjectionToken';
import { GraphSessionRepositoryImpl } from './infrastructure/repository/GraphSessionRepositoryImpl';
import { GraphSessionController } from './infrastructure/controllers/GraphSessionController';
import { GraphSessionFactory } from './domain/factories/GraphSessionFactory';
import { CreateGraphSessionHandler } from './application/command/handlers/CreateSessionCommandHandler';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.GRAPH_SESSION_REPOSITORY,
    useClass: GraphSessionRepositoryImpl,
  },
];

const domain = [GraphSessionFactory];

const application = [CreateGraphSessionHandler];

@Module({
  imports: [CqrsModule, DatabaseModule],
  providers: [Logger, ...infrastructure, ...domain, ...application],
  controllers: [GraphSessionController],
})
export class SessionsModule {}
