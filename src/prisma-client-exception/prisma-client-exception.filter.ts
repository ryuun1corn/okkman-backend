import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError) // Catch errors because of prisma logic
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    // Get the response to be sent back to the request
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // Get the last line of the message (the error message)
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
