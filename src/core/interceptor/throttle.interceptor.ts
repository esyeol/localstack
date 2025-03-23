import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { Throttle } from '../decorator/throttle.decorator';
import { HttpErrorConstants } from 'src/core/http/http-error-objects';

@Injectable()
export class ThrottleInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly reflector: Reflector,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest();
    const userId = request?.user?.sub as string | undefined;

    // Header에 유저 정보가 없을 경우 PASS
    if (!userId) {
      return next.handle();
    }

    const throttleOptions = this.reflector.get<{
      count: number;
      unit: 'minute';
    }>(Throttle, context.getHandler());

    if (!throttleOptions) {
      return next.handle();
    }

    const date = new Date();
    const minute = date.getMinutes();

    const key = `${request.method}_${request.path}_${userId}_${minute}`;

    try {
      const count = (await this.cacheManager.get<number>(key)) ?? 0;

      if (count >= throttleOptions.count) {
        throw new ForbiddenException(HttpErrorConstants.FORBIDDEN_EXCEED);
      }

      return next.handle().pipe(
        tap(async () => {
          await this.cacheManager.set(key, count + 1, 60); // 60초 TTL
        }),
      );
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new InternalServerErrorException(HttpErrorConstants.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
