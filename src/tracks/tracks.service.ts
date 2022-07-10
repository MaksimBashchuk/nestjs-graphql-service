import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';

import { Track } from './track.entity';

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
}
