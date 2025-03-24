import { ConfigService } from '@nestjs/config';
import { SqsOptions } from '@ssut/nestjs-sqs/dist/sqs.types';
import { ENV_CONFIG } from 'src/core/helper/env-keys.const';

export class SqsConfigUtil {
  static getBaseConfig(configService: ConfigService) {
    return {
      region: configService.getOrThrow<string>(ENV_CONFIG.AWS.REGION),
      credentials: {
        accessKeyId: configService.getOrThrow<string>(ENV_CONFIG.AWS.ACCESS_KEY_ID),
        secretAccessKey: configService.getOrThrow<string>(ENV_CONFIG.AWS.SECRET_ACCESS_KEY),
      },
      endpoint: configService.getOrThrow<string>(ENV_CONFIG.AWS.SQS_ENDPOINT), // LocalStack Endpoint
    };
  }

  static createQueueConfig(queueName: string, configService: ConfigService) {
    const baseConfig = SqsConfigUtil.getBaseConfig(configService);
    return {
      name: queueName,
      queueUrl: `${baseConfig.endpoint}/000000000000/${queueName}`,
    };
  }

  static createSqsOptions(queueNames: string[], configService: ConfigService): SqsOptions {
    const baseConfig = SqsConfigUtil.getBaseConfig(configService);
    const queueConfigs = queueNames.map((queueName) => SqsConfigUtil.createQueueConfig(queueName, configService));
    return {
      consumers: queueConfigs,
      producers: queueConfigs,
      ...baseConfig,
    };
  }
}
