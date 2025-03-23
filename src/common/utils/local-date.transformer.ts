import { ValueTransformer } from 'typeorm';
import { LocalDateTime } from '@js-joda/core';
import { ConvertDateTime } from './convert-date-time';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(value: LocalDateTime): Date {
    return ConvertDateTime.toDate(value);
  }
  from(databaseValue: Date): LocalDateTime {
    return ConvertDateTime.toLocalDateTime(databaseValue);
  }
}
