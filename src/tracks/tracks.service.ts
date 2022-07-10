import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';

import { DeletedItem } from 'src/common/deletedItem.entity';
import { Track } from './track.entity';
import { CreateTrackArgs } from './dto/createTrack.args';
import { UpdateTrackArgs } from './dto/updateTrack.args';

import { BASE_TRACKS_URL } from './constants';

@Injectable()
export class TracksService {
  constructor(private readonly httpService: HttpService) {}

  getTrack = async (id: string): Promise<Track> => {
    const observable: Observable<Track> = this.httpService
      .get<Track>(`${BASE_TRACKS_URL}/${id}`)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  getAllTracks = async (): Promise<Track[]> => {
    const observable: Observable<Track[]> = this.httpService
      .get<{ items: Track[] }>(BASE_TRACKS_URL)
      .pipe(map(res => res.data.items));

    return await lastValueFrom(observable);
  };

  createTrack = async (body: CreateTrackArgs): Promise<Track> => {
    const observable: Observable<Track> = this.httpService
      .post<Track>(BASE_TRACKS_URL, body)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  deleteTrack = async (id: string): Promise<DeletedItem> => {
    const observable: Observable<DeletedItem> = this.httpService
      .delete<DeletedItem>(`${BASE_TRACKS_URL}/${id}`)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };

  updateTrack = async ({ id, ...body }: UpdateTrackArgs): Promise<Track> => {
    const observable: Observable<Track> = this.httpService
      .put<Track>(`${BASE_TRACKS_URL}/${id}`, body)
      .pipe(map(res => res.data));

    return await lastValueFrom(observable);
  };
}
