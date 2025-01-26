import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

import { RequestStorageModule } from './RequestStorageModule';

export class LoggingInterceptorModule implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptorModule.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<object>,
  ): Observable<object> | Promise<Observable<object>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data) => {
        this.logger.log(
          JSON.stringify({
            requestId: RequestStorageModule.getStorage().requestId,
            userAgent: request.header('user-agent'),
            request: {
              method: request.method,
              url: request.url,
              body: request.body,
            },
            response: {
              ...data,
              statusCode: response.statusCode,
            },
          }),
        );
        return data;
      }),
    );
  }
}
