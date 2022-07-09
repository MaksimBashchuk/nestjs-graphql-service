import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

import { AUTH } from '../users/constants';

@Injectable()
export class setAuthHeaderInterceptor implements NestInterceptor {
  constructor(private readonly httpService: HttpService) {}
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    this.httpService.axiosRef.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${AUTH.TOKEN}`;

      return config;
    });

    return next.handle().pipe();
  }
}
