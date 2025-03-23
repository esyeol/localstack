import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator, // DB 연결 상태 점검
  ) {}

  @Get()
  checkToALB() {
    return { status: 'ok' };
  }

  @Get('admin-db-check')
  @HealthCheck()
  async check() {
    return this.health.check([
      async () => this.db.pingCheck('database'), // DB 상태 확인
    ]);
  }
}
