import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

const modifyObject = data => {
  console.log(data);
  const id = data?._id;
  const secondName = data?.lastName;

  if (id) {
    id && delete data._id;
    data['id'] = id;
  }

  if (secondName) {
    delete data.lastName;
    data['secondName'] = secondName;
  }

  return data;
};

@Injectable()
export class TransformResponseDataInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        return Array.isArray(data)
          ? data.map(item => modifyObject(item))
          : modifyObject(data);
      }),
    );
  }
}
