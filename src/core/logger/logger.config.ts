import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import { join } from 'path';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export const createWinstonOptions = (): WinstonModuleOptions => ({
  level: process.env.NODE_ENV === 'productioin' ? 'info' : 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
        winston.format.timestamp(),
        winston.format.printf((info) => `${info.timestamp} [${info.context}] ${info.level} ${info.message}`),
      ),
    }),
    new DailyRotateFile({
      dirname: join(process.cwd(), 'logs'),
      filename: 'api-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      zippedArchive: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} [${info.context || 'Application'}] ${info.level} ${info.message}`,
        ),
      ),
    }),
    new DailyRotateFile({
      dirname: join(process.cwd(), 'logs'),
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error', // 에러 레벨만 기록
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} [${info.context || 'Application'}] ${info.level} ${info.message}`,
        ),
      ),
    }),
  ],
  // exception Handler를 DailyRotateFile 기반으로 캐치하는 모듈
  exceptionHandlers: [
    new DailyRotateFile({
      dirname: join(process.cwd(), 'logs'),
      filename: 'exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      zippedArchive: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} [${info.context || 'Application'}] ${info.level} ${info.message}`,
        ),
      ),
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      dirname: join(process.cwd(), 'logs'),
      filename: 'rejections-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      zippedArchive: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} [${info.context || 'Application'}] ${info.level} ${info.message}`,
        ),
      ),
    }),
  ],
});
