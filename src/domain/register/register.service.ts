import { Message } from '@aws-sdk/client-sqs';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SqsMessageHandler, SqsService } from '@ssut/nestjs-sqs';
import { HttpErrorConstants } from 'src/core/http/http-error-objects';
// import { SqsService } from '../../sqs/sqs.service';

@Injectable()
export class RegisterService {
  constructor(@Inject(SqsService) private readonly sqsService: SqsService) {}

  async send() {
    const message = JSON.stringify({
      id: 'esyeol',
      message: 'Hello World',
    });
    try {
      await this.sqsService.send('register-queue', {
        id: 'unique',
        body: message,
      });
    } catch (err) {
      console.log('error->', err);
      throw new InternalServerErrorException(HttpErrorConstants.INTERNAL_SERVER_ERROR);
    }
  }

  @SqsMessageHandler('register-queue', false)
  async handleRegistrationMessage(message: Message) {
    const userData = JSON.parse(message.Body);
    console.log('Received registration event:', userData);
  }
}
