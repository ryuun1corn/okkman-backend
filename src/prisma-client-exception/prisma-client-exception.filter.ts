import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.code);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.split('\n').slice(-1)[0];

    switch (exception.code) {
      case 'P2003': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          meesage: message,
          statusCode: status,
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          meesage: message,
          statusCode: status,
        });
        break;
      }
      default: {
        break;
      }
    }

    super.catch(exception, host);
  }
}
