import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './AppController';
import { SessionComponentModule } from './core/session-components/SessionComponentsModule';
import { RequestStorageMiddleware } from './core/session-components/libs/RequestStorageModuleMiddleware';
import { SessionsModule } from './core/sessions/SessionsModule';

@Module({
  imports: [
    SessionComponentModule,
    SessionsModule,
    CacheModule.register({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestStorageMiddleware).forRoutes('*');
  }
}
