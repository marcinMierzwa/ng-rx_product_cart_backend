
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError) // <--- Łap tylko błędy tego typu
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, ''); // Czyszczenie wiadomości

    switch (exception.code) {
      // Błąd: Naruszenie unikalnego ograniczenia (Unique constraint failed)
      case 'P2002': {
        const status = HttpStatus.CONFLICT; // 409
        response.status(status).json({
          statusCode: status,
          message: `Data conflict. The field you are trying to add already exists.`,
        });
        break;
      }
      // Błąd: Rekord do usunięcia/aktualizacji nie istnieje
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND; // 404
        response.status(status).json({
          statusCode: status,
          message: `The resource you are trying to perform an operation on was not found.`,
        });
        break;
      }
      // Inne błędy Prisma, które chcesz obsłużyć
      // case 'P2003': { ... }
      default: {
        // Dla wszystkich innych nieobsługiwanych błędów Prismy
        const status = HttpStatus.INTERNAL_SERVER_ERROR; // 500
        response.status(status).json({
          statusCode: status,
          message: `An unexpected database error has occurred: ${message}`,
        });
        break;
      }
    }
  }
}
