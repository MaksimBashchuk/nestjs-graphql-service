import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TracksResolver } from './tracks.resolver';
import { TracksService } from './tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { BandsService } from '../bands/bands.service';
import { GenresService } from '../genres/genres.service';

@Module({
  imports: [HttpModule],
  providers: [
    TracksResolver,
    TracksService,
    BandsService,
    ArtistsService,
    GenresService,
  ],
})
export class TracksModule {}
