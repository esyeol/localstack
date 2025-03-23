import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable, tap } from 'rxjs';
import { HttpErrorConstants } from '../http/http-error-objects';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  intercept(ctx: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    const req = ctx.switchToHttp().getRequest();
    const reqTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const resTime = Date.now();
        const diff = resTime - reqTime;

        if (diff > 1000) {
          this.logger.warn(`TIME OUT [${req.method} ${req.path}] ${diff} ms`);
          throw new InternalServerErrorException(HttpErrorConstants.TIMEOUT_EXCEPTION);
        }
      }),
    );
  }
}
