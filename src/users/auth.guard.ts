import { CanActivate, Injectable } from '@nestjs/common';
import { AUTH } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return !!AUTH.TOKEN;
  }
}
