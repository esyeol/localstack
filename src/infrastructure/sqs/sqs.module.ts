import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';

@Module({
  controllers: [],
  providers: [SqsService],
})
export class SqsModule {}
