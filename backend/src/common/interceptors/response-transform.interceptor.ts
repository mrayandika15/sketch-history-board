import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Response } from 'express';
import { ResponseBuilder } from 'src/common/filters/http.response.filter';
import { ApiResponse } from 'src/types/api';

function isApiResponse(x: any): x is ApiResponse<any> {
  return (
    x &&
    typeof x === 'object' &&
    'success' in x &&
    'status' in x &&
    'meta' in x &&
    'message' in x
  );
}

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const res = http.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        // Pass through if already standardized
        if (isApiResponse(data)) {
          return data;
        }

        // For primitive or plain objects, wrap with standardized structure
        const status = res?.statusCode ?? 200;
        return ResponseBuilder.withData<any>(data, status, true);
      }),
    );
  }
}
