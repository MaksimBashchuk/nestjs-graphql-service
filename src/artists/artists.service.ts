import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';

import { DeletedItem } from '../common/deletedItem.entity';
import { Artist } from './artist.entity';
import { CreateArtistArgs } from './dto/createArtist.args';
import { UpdateArtistArgs } from './dto/updateArtists.args';

import { BASE_ARTISTS_URL } from './constants';

@Injectable()
export class ArtistsService {
  constructor(private readonly httpService: HttpService) {}

  getArtist = async (id: string): Promise<Artist> => {
    try {
      const observable: Observable<Artist> = this.httpService
        .get<Artist>(`${BASE_ARTISTS_URL}/${id}`)
        .pipe(map(res => res.data));

      return await lastValueFrom(observable);
    } catch {
      return null;
    }
  };

  getAllArtists = async (): Promise<Artist[]> => {
    const observable: Observable<Artist[]> = this.httpService
      .get<{ items: Artist[] }>(BASE_ARTISTS_URL)
      .pipe(map(res => res.data.items));

    return await lastValueFrom(observable);
  };

  createArtist = async (body: CreateArtistArgs): Promise<Artist> => {
    const observable: Observable<Artist> = this.httpService
      .post<Artist>(BASE_ARTISTS_URL, body)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  deleteArtist = async (id: string): Promise<DeletedItem> => {
    const observable: Observable<DeletedItem> = this.httpService
      .delete<DeletedItem>(`${BASE_ARTISTS_URL}/${id}`)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  updateArtist = async ({ id, ...body }: UpdateArtistArgs): Promise<Artist> => {
    const observable: Observable<Artist> = this.httpService
      .put<Artist>(`${BASE_ARTISTS_URL}/${id}`, body)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };
}
