import { HttpStatus } from '@nestjs/common';

/**
 * HTTP 응답 클래스
 * - 컨트롤러에서 리턴시 응답 데이터 형식에 맞게 반환된다.
 * - Serialization
 */
export class HttpResponse {
  static ok<T>(body?: T): { statusCode: number; message: string; result: T } {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      result: body,
    };
  }

  static created<T>(body?: T): {
    statusCode: number;
    message: string;
    result?: T;
  } {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created',
      result: body,
    };
  }
  static noContent(): { statusCode: number; message: string } {
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'No Content',
    };
  }

  static badRequest<T>(error?: T | Error): {
    statusCode: number;
    message: string;
    error?: T | Error;
  } {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Bad Request',
      error: error,
    };
  }

  static unauthorized<T>(error?: T | Error): {
    statusCode: number;
    message: string;
    error?: T | Error;
  } {
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
      error: error,
    };
  }

  static notFound<T>(error?: T | Error): {
    statusCode: number;
    message: string;
    error?: T | Error;
  } {
    return {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Not Found',
      error: error,
    };
  }

  static unprocessableEntity<T>(error?: T | Error): {
    statusCode: number;
    message: string;
    error?: T | Error;
  } {
    return {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'Unprocessable Entity',
      error: error,
    };
  }

  static internalServerError<T>(error?: T | Error): {
    statusCode: number;
    message: string;
    error?: T | Error;
  } {
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error,
    };
  }
}
