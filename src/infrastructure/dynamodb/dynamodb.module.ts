import { Module } from '@nestjs/common';
import { DynamodbService } from './dynamodb.service';

@Module({
  controllers: [],
  providers: [DynamodbService],
})
export class DynamodbModule {}
