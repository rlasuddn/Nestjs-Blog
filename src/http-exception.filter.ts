import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | { error: string; statusCode: number; message: string | string[] };
    console.log(error);
    // console.log(typeof error);
    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        ...error,
      });
    }
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const ctx = host.switchToHttp();
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    response.status(httpStatus).json({
      success: false,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
