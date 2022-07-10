import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { FavouritesResolver } from './favourites.resolver';
import { FavouritesService } from './favourites.service';
import { ArtistsService } from '../artists/artists.service';
import { BandsService } from '../bands/bands.service';
import { GenresService } from '../genres/genres.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  imports: [HttpModule],
  providers: [
    FavouritesResolver,
    FavouritesService,
    ArtistsService,
    BandsService,
    GenresService,
    TracksService,
  ],
})
export class FavouritesModule {}
