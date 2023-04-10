import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';

import { DeletedItem } from '../common/deletedItem.entity';
import { Band } from './band.entity';
import { CreateBandArgs } from './dto/createBand.args';
import { UpdateBandArgs } from './dto/updateBand.args';

import { BASE_BANDS_URL } from './constants';

@Injectable()
export class BandsService {
  constructor(private readonly httpService: HttpService) {}

  getBand = async (id: string): Promise<Band> => {
    try {
      const observable: Observable<Band> = this.httpService
        .get<Band>(`${BASE_BANDS_URL}/${id}`)
        .pipe(map(res => res.data));

      return await lastValueFrom(observable);
    } catch {
      return null;
    }
  };

  getAllBands = async (limit: number, offset: number): Promise<Band[]> => {
    const observable: Observable<Band[]> = this.httpService
      .get<{ items: Band[] }>(BASE_BANDS_URL, { params: { limit, offset } })
      .pipe(map(res => res.data.items));

    return await lastValueFrom(observable);
  };

  createBand = async (body: CreateBandArgs): Promise<Band> => {
    const observable: Observable<Band> = this.httpService
      .post<Band>(BASE_BANDS_URL, body)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  deleteBand = async (id: string): Promise<DeletedItem> => {
    const observable: Observable<DeletedItem> = this.httpService
      .delete<DeletedItem>(`${BASE_BANDS_URL}/${id}`)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  updateBand = async ({ id, ...body }: UpdateBandArgs): Promise<Band> => {
    const observable: Observable<Band> = this.httpService
      .put<Band>(`${BASE_BANDS_URL}/${id}`, body)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };
}
