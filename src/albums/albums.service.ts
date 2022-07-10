import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';

import { DeletedItem } from 'src/common/deletedItem.entity';
import { Album } from './album.entity';
// import { CreateAlbumArgs } from './dto/createAlbum.args';
// import { UpdateAlbumArgs } from './dto/updateAlbum.args';

import { BASE_ALBUMS_URL } from './constatns';

@Injectable()
export class AlbumsService {
  constructor(private readonly httpService: HttpService) {}

  getAlbum = async (id: string): Promise<Album> => {
    const observable: Observable<Album> = this.httpService
      .get<Album>(`${BASE_ALBUMS_URL}/${id}`)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  getAllAlbums = async (): Promise<Album[]> => {
    const observable: Observable<Album[]> = this.httpService
      .get<{ items: Album[] }>(BASE_ALBUMS_URL)
      .pipe(map(res => res.data.items));

    return await lastValueFrom(observable);
  };
}
