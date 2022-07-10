import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';

import { Track } from './track.entity';

import { BASE_TRACKS_URL } from './constants';

@Injectable()
export class TracksService {
  constructor(private readonly httpService: HttpService) {}

  getAllTracks = async (): Promise<Track[]> => {
    const observable: Observable<Track[]> = this.httpService
      .get<{ items: Track[] }>(BASE_TRACKS_URL)
      .pipe(map(res => res.data.items));

    return await lastValueFrom(observable);
  };
}
