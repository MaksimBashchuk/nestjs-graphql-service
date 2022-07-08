import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AUTH } from 'src/users/constants';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class setAuthHeaderInterceptor implements NestInterceptor {
  constructor(private readonly httpService: HttpService) {}
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    this.httpService.axiosRef.interceptors.request.use(config => {
      config.headers.Authorization = AUTH.TOKEN;

      return config;
    });

    return next.handle().pipe();
  }
}
