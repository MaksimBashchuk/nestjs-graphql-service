import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { JWT, User } from './user.entity';
import { GET_TOKEN_URL, REGISTER_URL, BASE_USER_URL } from './constants';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  getUser = async (id: string): Promise<User> => {
    const observable: Observable<User> = this.httpService
      .get<User>(`${BASE_USER_URL}/${id}`, {})
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  registerUser = async (
    firstName: string,
    lastName: string,
    password: string,
    email: string,
  ): Promise<User> => {
    const observable: Observable<User> = this.httpService
      .post<User>(REGISTER_URL, {
        firstName,
        lastName,
        password,
        email,
      })
      .pipe(map(res => res.data));
    return await lastValueFrom(observable);
  };

  getAuthToken = async (email: string, password: string): Promise<JWT> => {
    const res = this.httpService
      .post<JWT>(GET_TOKEN_URL, { email, password })
      .pipe(map(res => res.data));
    return await lastValueFrom(res);
  };
}
