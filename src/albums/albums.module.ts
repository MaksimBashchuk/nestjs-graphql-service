import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AlbumsResolver } from './albums.resolver';
import { AlbumsService } from './albums.service';
import { ArtistsService } from '../artists/artists.service';
import { BandsService } from '../bands/bands.service';
import { GenresService } from '../genres/genres.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  imports: [HttpModule],
  providers: [
    AlbumsResolver,
    AlbumsService,
    ArtistsService,
    BandsService,
    GenresService,
    TracksService,
  ],
})
export class AlbumsModule {}
