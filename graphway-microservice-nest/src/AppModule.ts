import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './AppController';
import { SessionModule } from './core/sessions/SessionsModule';
import { RequestStorageMiddleware } from './core/sessions/libs/RequestStorageModuleMiddleware';

@Module({
  imports: [SessionModule, CacheModule.register({ isGlobal: true })],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestStorageMiddleware).forRoutes('*');
  }
}
