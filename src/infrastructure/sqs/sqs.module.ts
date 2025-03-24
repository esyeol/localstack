import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_CONFIG } from '../../core/helper/env-keys.const';

/**
 * not-use
 * @see https://github.com/ssut/nestjs-sqs
 */
import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
  imports: [
    SqsModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          consumers: [
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
  // providers: [SqsProducerService, SqsConsumerService],
  // exports: [SqsProducerService, SqsConsumerService],
})
export class SqsHandler {}
