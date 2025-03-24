import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SqsService as NestSqsService } from '@ssut/nestjs-sqs';
import { ENV_CONFIG } from 'src/core/helper/env-keys.const';
import { HttpErrorConstants } from 'src/core/http/http-error-objects';

// import { SQSClient } from '@aws-sdk/client-sqs';

@Injectable()
export class SqsProducerService {
  // private readonly sqsClient: SQSClient;
  constructor(
    private readonly configService: ConfigService,
    private readonly sqsService: NestSqsService,
  ) {
    // this.sqsClient = new SQSClient({
    //   region: this.configService.getOrThrow<string>(ENV_CONFIG.AWS.REGION),
    //   credentials: {
    //     accessKeyId: this.configService.getOrThrow<string>(ENV_CONFIG.AWS.ACCESS_KEY_ID),
    //     secretAccessKey: this.configService.getOrThrow<string>(ENV_CONFIG.AWS.SECRET_ACCESS_KEY),
    //   },
    // });
  }

  /**
   * send message to sqs
   * @param dto
   * @returns void
   */
  async send(): Promise<void> {
    const message = JSON.stringify({
      id: 'esyeol',
      message: 'Hello World',
    });
    try {
      await this.sqsService.send(this.configService.getOrThrow<string>(ENV_CONFIG.AWS.SQS_NAME), {
        id: 'unique',
        body: message,
      });
    } catch (err) {
      console.log('error->', err);
      throw new InternalServerErrorException(HttpErrorConstants.INTERNAL_SERVER_ERROR);
    }
  }
}
