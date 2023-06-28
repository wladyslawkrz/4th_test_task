import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = `An error occurred while executing the request on the server`;
    let body = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      body = exception.getResponse();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      body = { message: message, details: exception };
    }

    this.logger.error(`An error [status ${status}] occured: ${exception}`);

    response.status(status).json(body);
  }
}
