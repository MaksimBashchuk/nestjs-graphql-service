import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';

import { DeletedItem } from 'src/common/deletedItem.entity';
import { Album } from './album.entity';
import { CreateAlbumArgs } from './dto/createAlbum.args';
import { UpdateAlbumArgs } from './dto/updateAlbum.args';

import { BASE_ALBUMS_URL } from './constants';

@Injectable()
export class AlbumsService {
  constructor(private readonly httpService: HttpService) {}

  getAlbum = async (id: string): Promise<Album> => {
    try {
      const observable: Observable<Album> = this.httpService
        .get<Album>(`${BASE_ALBUMS_URL}/${id}`)
        .pipe(map(res => res.data));

      return await lastValueFrom(observable);
    } catch {
      return null;
    }
  };

  getAllAlbums = async (): Promise<Album[]> => {
    const observable: Observable<Album[]> = this.httpService
      .get<{ items: Album[] }>(BASE_ALBUMS_URL)
      .pipe(map(res => res.data.items));

    return await lastValueFrom(observable);
  };

  createAlbum = async (body: CreateAlbumArgs): Promise<Album> => {
    const observable: Observable<Album> = this.httpService
      .post<Album>(BASE_ALBUMS_URL, body)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  deleteAlbum = async (id: string): Promise<DeletedItem> => {
    const observable: Observable<DeletedItem> = this.httpService
      .delete<DeletedItem>(`${BASE_ALBUMS_URL}/${id}`)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  updateAlbum = async ({ id, ...body }: UpdateAlbumArgs): Promise<Album> => {
    const observable: Observable<Album> = this.httpService
      .put<Album>(`${BASE_ALBUMS_URL}/${id}`, body)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };
}
