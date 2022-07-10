import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';

import { Favourites } from './favourite.entity';

import {
  ADD_TO_FAVOURITES,
  BASE_FAVOURITES_URL,
  FAVOURITES,
} from './constants';

@Injectable()
export class FavouritesService {
  constructor(private readonly httpService: HttpService) {}

  getAllFavourites = async (): Promise<Favourites> => {
    const observable: Observable<Favourites> = this.httpService
      .get<Favourites>(BASE_FAVOURITES_URL)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  addFavouritesByType = async (
    type: FAVOURITES,
    id: string,
  ): Promise<Favourites> => {
    const observable: Observable<Favourites> = this.httpService
      .put<Favourites>(ADD_TO_FAVOURITES, { type, id })
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  removeFavouritesByType = async (
    type: FAVOURITES,
    id: string,
  ): Promise<Favourites> => {
    const observable: Observable<Favourites> = this.httpService
      .put<Favourites>(ADD_TO_FAVOURITES, { type, id })
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };
}
