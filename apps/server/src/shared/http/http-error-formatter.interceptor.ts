import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpErrorFormatterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: Record<string, unknown>) => {
        const status = (err.status as number) ?? HttpStatus.INTERNAL_SERVER_ERROR;
        const message = (err.message as string) ?? 'Request failed';
        return throwError(() => ({ statusCode: status, message }));
      })
    );
  }
}
