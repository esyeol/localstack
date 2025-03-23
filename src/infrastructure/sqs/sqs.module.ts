import { Module } from '@nestjs/common';
import { SqsProducerService } from './sqs-producer.service';
import { ConfigService } from '@nestjs/config';
import { ENV_CONFIG } from '../../core/helper/env-keys.const';

import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
  imports: [
    SqsModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          consumers: [],
          producers: [
            {
              name: configService.getOrThrow<string>(ENV_CONFIG.AWS.SQS_NAME),
              queueUrl: configService.getOrThrow<string>(ENV_CONFIG.AWS.SQS_QUEUE_URL),
              region: configService.getOrThrow<string>(ENV_CONFIG.AWS.REGION),
              credentials: {
                accessKeyId: configService.getOrThrow<string>(ENV_CONFIG.AWS.ACCESS_KEY_ID),
                secretAccessKey: configService.getOrThrow<string>(ENV_CONFIG.AWS.SECRET_ACCESS_KEY),
              },
              endpoint: configService.getOrThrow<string>(ENV_CONFIG.AWS.SQS_ENDPOINT), // LocalStack Endpoint
            },
          ],
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [SqsProducerService],
})
export class SqsHandler {}
