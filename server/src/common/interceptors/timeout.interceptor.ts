import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler } from '@nestjs/common';
import { Observable, throwError, never } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(5000), catchError(error => {
      if (error.name === 'TimeoutError') {
        return [throwError(new HttpException('Timeout', HttpStatus.GATEWAY_TIMEOUT))];
      }
      throw error;
    }))
  }
}