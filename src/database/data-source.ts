import * as dotenv from 'dotenv';

import { DataSource } from 'typeorm';

/**
 * cross-env에 따른 환경변수 파일 지정
 */
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './.env.development' });
} else {
  dotenv.config({ path: './.env.production' });
}

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
});
