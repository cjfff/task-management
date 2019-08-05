import * as lodash from 'lodash';

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { isDevMode } from '@app/app.environment';

export type TMessage = string;
export type TExceptionOption = TMessage | {
  message: TMessage;
  error?: any
};

/**
 * 全局异常拦截器
 * @export
 * @class HttpExceptionFilter
 * @implements ExceptionFilter
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const isString = (value): value is string => lodash.isString(value);
    const errorOption: TExceptionOption = exception.getResponse() as TExceptionOption;
    const errMessage = isString(errorOption) ? errorOption : errorOption.message;
    console.warn(exception)
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const data = {
      code: status,
      message: errMessage,
      debug: isDevMode ? exception.stack : null,
    }

    if (status === HttpStatus.NOT_FOUND) {
      data.message = `接口 ${request.method} -> ${request.url} 无效`;
    }
    response.status(status).json(data);
  }
}