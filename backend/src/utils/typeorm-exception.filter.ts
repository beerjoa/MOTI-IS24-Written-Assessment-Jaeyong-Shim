import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError, TypeORMError } from 'typeorm';

type ExceptionResponse = {
  statusCode: number;
  message: string;
};

@Catch(TypeORMError, QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  private defaultExceptionResponse: ExceptionResponse =
    new InternalServerErrorException().getResponse() as ExceptionResponse;

  private exceptionResponse: ExceptionResponse = this.defaultExceptionResponse;

  catch(exception: TypeORMError | QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    exception instanceof QueryFailedError &&
      this.setQueryFailedErrorResponse(exception);

    response
      .status(this.exceptionResponse.statusCode)
      .json(this.exceptionResponse);
  }

  private setQueryFailedErrorResponse(exception: QueryFailedError): void {
    const error = exception.driverError;

    if (error.code === '22P02') {
      this.exceptionResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid UUID format',
      };
    } else if (error.code === '23503') {
      this.exceptionResponse = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Target not found',
      };
    } else {
      this.exceptionResponse.message = error.message;
    }
  }
}
