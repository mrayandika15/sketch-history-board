import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  ApiResponse,
  PaginationMeta,
  FilterMeta,
  ApiError,
  ResponseMeta,
} from 'src/types/api';

export const API_VERSION = 'v.1.1';

export class ResponseBuilder<T = unknown> {
  private response: ApiResponse<T>;

  constructor() {
    this.response = {
      success: true,
      status: 200,
      message: 'Success',
      data: null,
      meta: {
        timestamp: new Date().toISOString(),
        version: API_VERSION,
      },
      errors: [],
    };
  }

  setSuccess(success: boolean): this {
    this.response.success = success;
    return this;
  }

  setStatus(status: number): this {
    this.response.status = status;
    return this;
  }

  setMessage(message: string): this {
    this.response.message = message;
    return this;
  }

  setData(data: T): this {
    this.response.data = data;
    return this;
  }

  addPagination(pagination: PaginationMeta): this {
    this.response.meta.pagination = pagination;
    return this;
  }

  addFilters(filters: FilterMeta): this {
    this.response.meta.filters = filters;
    return this;
  }

  addError(error: ApiError): this {
    this.response.errors = [...(this.response.errors || []), error];
    return this;
  }

  addErrors(errors: ApiError[]): this {
    this.response.errors = [...(this.response.errors || []), ...errors];
    return this;
  }

  setMeta(meta: Partial<ResponseMeta>): this {
    this.response.meta = { ...this.response.meta, ...meta };
    return this;
  }

  build(): ApiResponse<T> {
    return this.response;
  }

  static metaOnly(status: number, success: boolean): ApiResponse<null> {
    const meta: ResponseMeta = {
      timestamp: new Date().toISOString(),
      version: API_VERSION,
    };
    return {
      status,
      success,
      meta,
      message: success ? 'Success' : 'Error',
      data: null,
    } as ApiResponse<null>;
  }

  static withData<U>(
    data: U,
    status = 200,
    success = true,
    message?: string,
  ): ApiResponse<U> {
    const builder = new ResponseBuilder<U>()
      .setStatus(status)
      .setSuccess(success)
      .setData(data);
    if (message !== undefined) builder.setMessage(message);
    return builder.build();
  }

  static fromSuccess<U>(data: U, message?: string): ApiResponse<U> {
    return ResponseBuilder.withData(data, 200, true, message);
  }

  static fromError(
    status: number,
    message: string,
    errors?: ApiError[],
  ): ApiResponse<null> {
    const builder = new ResponseBuilder<null>()
      .setStatus(status)
      .setSuccess(false)
      .setMessage(message)
      .setData(null);
    if (errors && errors.length) builder.addErrors(errors);
    return builder.build();
  }
}

@Catch()
export class HttpResponseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const isHttpEx = exception instanceof HttpException;
    const status = isHttpEx
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    const errors: ApiError[] = [];

    if (isHttpEx) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response) {
        const body: any = response;
        message = body.message || body.error || exception.message || message;
        const detail = body?.message ?? body;
        errors.push({
          code: HttpStatus[status] ?? String(status),
          message: message,
          details: detail,
        });
      } else {
        message = exception.message || message;
        errors.push({ code: HttpStatus[status] ?? String(status), message });
      }
    } else if (exception && typeof exception === 'object') {
      const err: any = exception as any;
      message = err?.message || message;
      errors.push({ code: 'INTERNAL_ERROR', message, details: err?.stack });
    } else {
      errors.push({ code: 'UNKNOWN_ERROR', message });
    }

    const payload = new ResponseBuilder<null>()
      .setSuccess(false)
      .setStatus(status)
      .setMessage(message)
      .setData(null)
      .addErrors(errors)
      .build();

    res.status(status).json(payload);
  }
}

export { ResponseBuilder as HttpRequestFilter };
