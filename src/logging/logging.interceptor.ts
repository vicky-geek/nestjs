import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('LoggingInterceptor... before');
    // console.log(context.getClass());
    // console.log(context.getHandler());
    // console.log(context.getArgs());
    // console.log(context.switchToHttp().getRequest());
    // console.log(context.switchToHttp().getResponse());
    // console.log(context.switchToHttp().getNext());

    return next.handle().pipe(
      tap(() => {
        console.log('LoggingInterceptor... after');
      }),
    );
  }
}
