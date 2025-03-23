import { convert, LocalDateTime, nativeJs } from '@js-joda/core';
export const ConvertDateTime = {
  toDate(value: LocalDateTime) {
    return convert(value).toDate();
  },

  toLocalDateTime(databaseValue: Date) {
    return nativeJs(databaseValue).toLocalDateTime();
  },
};
