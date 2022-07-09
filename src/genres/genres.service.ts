import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map, lastValueFrom } from 'rxjs';

import { DeletedItem } from '../common/deletedItem.entity';
import { Genre } from './genre.entity';
import { CreateGenreArgs } from './dto/createGenre.args';
import { UpdateGenreArgs } from './dto/updateGenre.args';

import { BASE_GENRE_URL } from './constants';

@Injectable()
export class GenresService {
  constructor(private readonly httpService: HttpService) {}

  getGenre = async (id: string): Promise<Genre> => {
    const observable: Observable<Genre> = this.httpService
      .get<Genre>(`${BASE_GENRE_URL}/${id}`)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  getAllGenres = async (): Promise<Genre[]> => {
    const observable: Observable<Genre[]> = this.httpService
      .get<{ items: Genre[] }>(BASE_GENRE_URL)
      .pipe(map(res => res.data.items));

    return await lastValueFrom(observable);
  };

  createGenre = async (body: CreateGenreArgs): Promise<Genre> => {
    const observable: Observable<Genre> = this.httpService
      .post<Genre>(BASE_GENRE_URL, body)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  deleteGenre = async (id: string): Promise<DeletedItem> => {
    const observable: Observable<DeletedItem> = this.httpService
      .delete<DeletedItem>(`${BASE_GENRE_URL}/${id}`)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  updateGenre = async ({ id, ...body }: UpdateGenreArgs): Promise<Genre> => {
    const observable: Observable<Genre> = this.httpService
      .put<Genre>(`${BASE_GENRE_URL}/${id}`, body)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };
}
