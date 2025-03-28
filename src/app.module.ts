import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './database/orm-config';
import { DataSource, DataSourceOptions } from 'typeorm';

import { LoggerModule } from './core/logger/logger.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTimeInterceptor } from './core/interceptor/response-time.interceptor';
import { HealthModule } from './core/health/health.module';
import { DynamodbModule } from './infrastructure/dynamodb/dynamodb.module';
// import { SqsHandler } from './infrastructure/sqs/sqs.module';
import { RegisterModule } from './domain/register/register.module';
// import { SqsModule } from '@ssut/nestjs-sqs';
import { PushModule } from './domain/push/push.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: OrmConfig,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),

    LoggerModule,
    HealthModule,
    DynamodbModule,
    // SqsHandler,
    RegisterModule,
    PushModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTimeInterceptor,
    },
  ],
})
export class AppModule {}
