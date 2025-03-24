import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { Message } from '@aws-sdk/client-sqs';

/**
 * @todo
 * change to lambda with localStack
 */
@Injectable()
export class SqsConsumerService {
  constructor(private readonly configService: ConfigService) {}

  @SqsMessageHandler('test', false)
  async handleMessage(message: Message) {
    console.log('Received message:', message.Body);
    // 비즈니스 로직 추가
  }
  @SqsConsumerEventHandler('test', 'error')
  handleError(error: Error) {
    console.error('Consumer error:', error);
  }

  @SqsConsumerEventHandler('test', 'processing_error')
  handleProcessingError(error: Error, message: Message) {
    console.error('Processing error for message:', message.Body, error);
  }
}
