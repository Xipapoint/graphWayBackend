import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { RequestStorageModule } from './RequestStorageModule';

export class RequestStorageMiddleware implements NestMiddleware {
  use(
    request: Request,
    response: Response,
    next: (error?: object) => void,
  ): void {
    RequestStorageModule.reset();
    next();
  }
}
