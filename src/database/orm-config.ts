import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ENV_CONFIG } from 'src/core/helper/env-keys.const';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.getOrThrow<string>(ENV_CONFIG.DB.HOST),
      port: parseInt(this.configService.getOrThrow<string>(ENV_CONFIG.DB.PORT)),
      username: this.configService.getOrThrow<string>(ENV_CONFIG.DB.USER),
      password: this.configService.getOrThrow<string>(ENV_CONFIG.DB.PASSWORD),
      database: this.configService.getOrThrow<string>(ENV_CONFIG.DB.DATABASE),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: process.env.ENV_NODE === 'production' ? false : true,
      logging: process.env.ENV_NODE === 'production' ? false : true,
      timezone: '+09:00',
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
