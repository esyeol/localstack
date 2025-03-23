import { SQSClient } from '@aws-sdk/client-sqs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SqsService } from '@ssut/nestjs-sqs';
import { ENV_CONFIG } from 'src/core/helper/env-keys.const';
import { HttpErrorConstants } from 'src/core/http/http-error-objects';

@Injectable()
export class SqsProducerService {
  private readonly sqsClient: SQSClient;
  constructor(
    private readonly configService: ConfigService,
    private readonly sqsService: SqsService,
  ) {
    this.sqsClient = new SQSClient({
      region: this.configService.getOrThrow<string>(ENV_CONFIG.AWS.REGION),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>(ENV_CONFIG.AWS.ACCESS_KEY_ID),
        secretAccessKey: this.configService.getOrThrow<string>(ENV_CONFIG.AWS.SECRET_ACCESS_KEY),
      },
    });
  }

  /**
   * @param dto
   * @returns
   */
  async send(): Promise<void> {
    try {
    } catch (err) {
      console.log('error->', err);
      throw new InternalServerErrorException(HttpErrorConstants.INTERNAL_SERVER_ERROR);
    }
  }
}
