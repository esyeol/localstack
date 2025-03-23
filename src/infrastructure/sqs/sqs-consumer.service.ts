import { SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SqsConsumerService {
  private readonly sqsClient: SQSClient;
  constructor(private readonly configService: ConfigService) {}
}
