import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UniqueConstraintError } from 'sequelize';

@Catch(UniqueConstraintError)
export class UniqueConstraintExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.CONFLICT;

    response.status(status).json({
      statusCode: status,
      message: 'Email is already in use.',
      path: request.url,
    });
  }
}
