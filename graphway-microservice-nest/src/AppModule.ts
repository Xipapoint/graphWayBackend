import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({ isGlobal: true })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
